import styled from "styled-components"
import useAuth from "../stores/useAuth";
import Modal from "./modal";
import LoginForm from "./loginForm";
import { useNavigate } from "react-router-dom";
import useModal from "../hooks/useModal";

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
    display: flex;
    flex-direction: column;
`;

const InfoTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem 0;
`;

const InfoMenu = styled.button`
    font-size: 1rem;
    padding: 1rem 0.3rem;
`;

const SideMenu = ({ onFilter }: { onFilter: (filterType: string) => void; }) => {
    const navigate = useNavigate();
    const { isLogin, logout } = useAuth();
    const { isOpen, openModal, closeModal } = useModal();

    // 로그인
    const onLogin = () => {
        openModal("loginForm");
    };

    // 로그아웃
    const onLogout = async () => {
        await fetch(`http://localhost:8080/logout`, {
            method: "POST",
            credentials: "include",
        });
        navigate("/");
        logout();
    };

    const handleFilterClick = (filterType: string) => {
        onFilter(filterType);
    };

    return (
        <>
            <Wrapper>
                {isLogin ? <LogoutButton onClick={onLogout}>로그아웃</LogoutButton> : <LoginButton onClick={onLogin}>로그인</LoginButton>}
                <InfoBox>
                    <InfoTitle>정보</InfoTitle>
                    <InfoMenu onClick={() => handleFilterClick("팁과 노하우")}>팁과 노하우</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("패치노트")}>패치노트</InfoMenu>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>커뮤니티</InfoTitle>
                    <InfoMenu onClick={() => handleFilterClick("자유")}>자유</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("유머")}>유머</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("질문")}>질문</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("자랑글")}>자랑글</InfoMenu>
                </InfoBox>
            </Wrapper>

            {/* 모달 영역 */}
            {isOpen("loginForm") &&
                <Modal onClose={() => closeModal("loginForm")}>
                    <LoginForm />
                </Modal>
            }
        </>
    )
}

export default SideMenu;