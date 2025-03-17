import styled from "styled-components"
import useAuth from "../stores/useAuth";
import { useState } from "react";
import Modal from "./modal";
import LoginForm from "./loginForm";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #333;
    border-radius: 1rem;
    height: 50rem;
    width: 20rem;
    padding: 2rem;
`;

const LoginButton = styled.button`
    color: #fff;
    background-color: #08ccac;
    border: #08ccac;
    padding: 0.7rem 2rem;
    font-size: 1.2rem;
    border-radius:0.5rem;
    cursor: pointer;
`;

const LogoutButton = styled(LoginButton)`
    background-color: crimson;
    border: crimson;
`;

const InfoBox = styled.div`
    padding: 1rem 0;
    border-bottom:1px solid gray;
`;

const InfoTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem 0;
`;

const InfoMenu = styled.p`
    font-size: 1rem;
    padding: 1rem 0.3rem;
`;

const SideMenu = () => {
    const { isLogin, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false); // 로그인 모달 상태 관리

    // 로그인
    const onLogin = () => {
        setShowLoginModal(true);
    };

    // 로그아웃
    const onLogout = async () => {
        await fetch(`http://localhost:8080/logout`, {
            method: "POST",
            credentials: "include",
        });
        logout();
    };

    return (
        <>
            <Wrapper>
                {isLogin ? <LogoutButton onClick={onLogout}>로그아웃</LogoutButton> : <LoginButton onClick={onLogin}>로그인</LoginButton>}
                {showLoginModal &&
                    <Modal onClick={() => setShowLoginModal(false)}>
                        <LoginForm />
                    </Modal>
                }
                <InfoBox>
                    <InfoTitle>정보</InfoTitle>
                    <InfoMenu>팁과 노하우</InfoMenu>
                    <InfoMenu>패치노트</InfoMenu>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>커뮤니티</InfoTitle>
                    <InfoMenu>자유</InfoMenu>
                    <InfoMenu>유머</InfoMenu>
                    <InfoMenu>질문</InfoMenu>
                    <InfoMenu>자랑글</InfoMenu>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>E-Sports</InfoTitle>
                    <InfoMenu>LCK</InfoMenu>
                    <InfoMenu>LPL</InfoMenu>
                    <InfoMenu>LEC</InfoMenu>
                </InfoBox>
            </Wrapper>
        </>
    )
}

export default SideMenu;