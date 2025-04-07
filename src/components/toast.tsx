import { useEffect, useState } from "react";
import styled from "styled-components";

const ToastOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
    z-index: 1000;
`;

const ToastBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 1.3rem 1rem;
  border-radius: 1rem;
  margin: 1rem;
`;

const ToastItem = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  color: crimson;
  font-weight: bold;
  font-size: 1.4rem;
`;

interface ToastProps {
  message: string;
  duration?: number;
};

const Toast = ({ message, duration = 5000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // 지정된 시간이 지나면 Toast를 숨김
    }, duration);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 정리
  }, [duration]);

  if (!isVisible) return null; // Toast가 보이지 않도록 처리

  const closeToast = () => {
    setIsVisible(false);
  }

  return (
    <ToastOverlay>
      <ToastBox>
        <CloseBtn onClick={closeToast}>X</CloseBtn>
        <ToastItem>{message}</ToastItem>
      </ToastBox>
    </ToastOverlay>
  );
};

export default Toast;