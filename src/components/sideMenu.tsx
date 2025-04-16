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
    /* border: 1px solid #333; */
    /* border-radius: 1rem; */
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
    text-align: center;
`;

const SideMenu = ({ onFilter }: { onFilter: (filterType: string) => void; }) => {
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
        navigate("/");
        logout();
    };

    const handleFilterClick = (filterType: string) => {
        onFilter(filterType);
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
                    <InfoMenu onClick={() => handleFilterClick("팁과 노하우")}>팁과 노하우</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("패치노트")}>패치노트</InfoMenu>
                </InfoBox>
                <RecentBox>
                    <InfoTitle>커뮤니티</InfoTitle>
                    <InfoMenu onClick={() => handleFilterClick("자유")}>자유</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("유머")}>유머</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("질문")}>질문</InfoMenu>
                    <InfoMenu onClick={() => handleFilterClick("자랑글")}>자랑글</InfoMenu>
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