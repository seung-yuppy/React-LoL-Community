import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import styled from "styled-components";
import Modal from "./modal";
import useAuth from "../stores/useAuth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
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
  font-size: 1.2rem;
  padding: 1rem 0.3rem;
  line-height: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  gap: 1rem;
  align-self: flex-end;
  background: #2979ff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 16px 16px 0 16px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  gap: 1rem;
`;

const TableTitle = styled.h2`
  font-size:1.5rem;
  font-weight: bold;
`;

const ChatTime = styled.span`
  font-size: 1rem;
  color: gray;
`;

const ChatOtherItem = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 1rem 0.3rem;
  line-height: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  gap: 1rem;
  align-self: flex-start;
  background: #f0f0f0;
  color: #333;
  padding: 10px 15px;
  border-radius: 16px 16px 16px 0;
`;

const ChatItemBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 0.3rem;
`;

const ChatOtherItemBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.3rem;
`;

const Chat = () => {
  const { userInfo, isLogin } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<{
    date: string;
    imageUrl: string | undefined; nickname: string, content: string
  }[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false); // 로그인 경고창 모달 상태 관리
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let stompClient: Client | null = null;

    const connectWebSocket = () => {
      if (isLogin && !client) {
        const socket = new SockJS(`https://render-host-rw27.onrender.com/ws`, { Credential: "include" });
        stompClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 3000,
          onConnect: () => {
            // 서버에서 오는 메시지를 구독
            stompClient?.subscribe("/topic/chat", (message) => {
              const receivedMessage = JSON.parse(message.body);
              const currentDate = new Date().toLocaleString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
              setMessages((prevMessages) => [
                ...prevMessages,
                { ...receivedMessage, date: currentDate },
              ]);
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

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTo({
        top: messageEndRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
    // if (messageEndRef.current) {
    //   messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    // }
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <ChatBox ref={messageEndRef}>
          <InfoBox>실시간 채팅</InfoBox>
          {messages.map((msg, index) => (
            userInfo.nickname === msg.nickname ? (
              <>
                <ChatItemBox>
                  <ChatItem key={index}>
                    {msg.nickname} : {msg.content}
                  </ChatItem>
                  <ChatTime>{msg.date}</ChatTime>
                </ChatItemBox>
                {/* <div ref={messageEndRef} /> */}
              </>
            ) : (
              <>
                <ChatOtherItemBox>
                  <ChatOtherItem key={index}>
                    {msg.nickname} : {msg.content}
                  </ChatOtherItem>
                  <ChatTime>{msg.date}</ChatTime>
                </ChatOtherItemBox>
                {/* <div ref={messageEndRef} /> */}
              </>
            )
          ))}
          {/* <div ref={messageEndRef} /> */}
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
