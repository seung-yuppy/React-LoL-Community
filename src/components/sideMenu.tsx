import styled from "styled-components"
import useAuth from "../stores/useAuth";
import Modal from "./modal";
import LoginForm from "./loginForm";
import { Link, useNavigate } from "react-router-dom";
import useModal from "../hooks/useModal";
import useRecent from "../stores/useRecent";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
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

const InfoBox = styled.div`
    padding: 1rem 0;
    border-bottom:1px solid gray;
    display: flex;
    flex-direction: column;
`;

const RecentBox = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
`;

const InfoTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
`;

const InfoMenu = styled.button`
    font-size: 1rem;
    padding: 1rem 0.3rem;
`;

const RecentItem = styled.p`
    font-size: 1rem;
    padding: 1rem 0.3rem;
    text-align: left;
`;

const SideMenu = () => {
    const navigate = useNavigate();
    const { isLogin, logout } = useAuth();
    const { isOpen, openModal, closeModal } = useModal();
    const { recentArr } = useRecent();

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
        navigate("/0");
        logout();
    };

    return (
        <>
            <Wrapper>
                {isLogin ? <LoginButton onClick={onLogout}>로그아웃</LoginButton> : <LoginButton onClick={onLogin}>로그인</LoginButton>}
                <InfoBox>
                    <InfoTitle>최근 본 글</InfoTitle>
                    {isLogin && recentArr.map((item) => (
                        <Link to={`/community/${item.id}`}>
                            <RecentItem key={item.id}>{item.title}</RecentItem>
                        </Link>
                    ))}
                </InfoBox>
                <InfoBox>
                    <InfoTitle>정보</InfoTitle>
                    <Link to={`/category/팁과 노하우`}><InfoMenu>팁과 노하우</InfoMenu></Link>
                    <Link to={`/category/패치노트`}><InfoMenu>패치노트</InfoMenu></Link>
                </InfoBox>
                <RecentBox>
                    <InfoTitle>커뮤니티</InfoTitle>
                    <Link to={`/category/자유`}><InfoMenu>자유</InfoMenu></Link>
                    <Link to={`/category/유머`}><InfoMenu>유머</InfoMenu></Link>
                    <Link to={`/category/질문`}><InfoMenu>질문</InfoMenu></Link>
                    <Link to={`/category/자랑글`}><InfoMenu>자랑글</InfoMenu></Link>
                </RecentBox>
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