import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #333;
  border-radius: 1rem;
  height: 50rem;
  width: 30rem;
  padding: 0.3rem;
`;

const FormWrapper = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #333;
`;

const CheckInput = styled.div`
  display:flex;
  align-items: center;
`;

const UsernameInput = styled.input`
  padding: 1rem;
  border-radius: 2rem;
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  background-color: #08ccac;
  color: #fff;
  margin: 1.5rem;
  border-radius: 0.7rem;
  padding: 2rem;
  font-size: 1.2rem;
  border: 1px solid #08ccac;
  cursor: pointer;

  width: 7rem;
  height: 2rem;
  padding: 1.3rem;
  font-size: 1rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom:1px solid gray;
  font-weight: bold;
`;

const ChatItem = styled.p`
  font-size: 1.2rem;
  padding: 1rem;
  line-height: 1rem;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
`;

const Chat = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<{ nickname: string; content: string }[]>([]);
  const [message, setMessage] = useState("");
  const { data: userInfoData } = useFetch("http://localhost:8080/info");
  const userInfo = userInfoData;

  console.log(client);

  useEffect(() => {
    // SockJS를 사용한 WebSocket 연결
    const socket = new SockJS(`http://localhost:8080/ws`, { Credential: "include" });
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
      debug: (msg) => console.log("STOMP:", msg),
      onConnect: () => {
        console.log("✅ WebSocket 연결됨!");

        // 서버에서 오는 메시지를 구독
        stompClient.subscribe("/topic/chat", (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log("❌ WebSocket 연결 종료됨");
      },
      onStompError: (error) => {
        console.error("🚨 STOMP 에러:", error);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfoData && client && client.connected && message.trim()) {
      client.publish({
        destination: "/app/chat",
        body: JSON.stringify({ nickname: userInfo?.nickname, content: message }),
      });
      setMessage("");
    } else {
      console.error("🚨 STOMP 연결이 안 되어 있음!");
      alert("로그인 후 이용해주세요!");
    }
  };

  return (
    <Wrapper>
      <ChatBox>
        <InfoBox>실시간 채팅</InfoBox>
        {messages.map((msg) => (
          <ChatItem key={msg.nickname}>
            {msg.nickname} : {msg.content}
          </ChatItem>
        ))}
      </ChatBox>
      <FormWrapper onSubmit={sendMessage}>
        <CheckInput>
          <UsernameInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
          />
          <Btn type="submit">전송</Btn>
        </CheckInput>
      </FormWrapper>
    </Wrapper>
  );
};

export default Chat;
