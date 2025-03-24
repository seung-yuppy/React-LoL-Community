import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import styled from "styled-components";
import Modal from "./modal";
import useAuth from "../stores/useAuth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #333;
  border-radius: 1rem;
  height: 50rem;
  width: 25rem;
  padding: 1rem;
  padding-bottom: 0;
`;

const FormWrapper = styled.form`
  display:flex;
  gap: 1rem;
  border-top: 1px solid #333;
  padding: 1rem;
`;

const UsernameInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #08ccac;
  color: #fff;
  border-radius: 1rem;
  font-size: 1rem;
  border: 1px solid #08ccac;
  cursor: pointer;
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
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.3rem;
  line-height: 1rem;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
`;

const TableTitle = styled.h2`
  font-size:1.5rem;
  font-weight: bold;
`;

const TeamLogo = styled.img`
  width: 3rem;
  height: 3rem;
`;

const Chat = () => {
  const { userInfo, isLogin } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<{ nickname: string, content: string }[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false); // 로그인 경고창 모달 상태 관리

  useEffect(() => {
    let stompClient: Client | null = null;

    const connectWebSocket = () => {
      if (isLogin && !client) {
        const socket = new SockJS(`http://localhost:8080/ws`, { Credential: "include" });
        stompClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 3000,
          debug: (msg) => console.log("STOMP:", msg),
          onConnect: () => {
            console.log("✅ WebSocket 연결됨!");

            // 서버에서 오는 메시지를 구독
            stompClient?.subscribe("/topic/chat", (message) => {
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
      }
    };

    connectWebSocket();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [isLogin]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      if (userInfo && client && client.connected && message.trim()) {
        client.publish({
          destination: "/app/chat",
          body: JSON.stringify({ nickname: userInfo.nickname, content: message }),
        });
        setMessage("");
      } else {
        console.error("🚨 STOMP 연결이 안 되어 있음!");
        setShowAlertModal(true);
        setMessage("");
      }
    }
  };

  return (
    <>
      <Wrapper>
        <ChatBox>
          <InfoBox>실시간 채팅</InfoBox>
          {messages.map((msg, index) => (
            <ChatItem key={index}>
              <TeamLogo />{msg.nickname} : {msg.content}
            </ChatItem>
          ))}
        </ChatBox>
        <FormWrapper onSubmit={sendMessage}>
          <UsernameInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요."
          />
          <Btn type="submit">전송</Btn>
        </FormWrapper>
      </Wrapper>

      {/* 모달 관리 */}
      {showAlertModal &&
        <Modal onClose={() => setShowAlertModal(false)}>
          <TableTitle>로그인 후 이용해주세요.</TableTitle>
        </Modal>
      }
    </>

  );
};

export default Chat;
