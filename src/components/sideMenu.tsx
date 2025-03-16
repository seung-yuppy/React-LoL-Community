import styled from "styled-components"
import useAuth from "../stores/useAuth";
import { useState } from "react";
import Modal from "./modal";

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

const Container = styled.div``;

const Btn = styled.button`
    display: flex;
    align-items: center;
    gap: 5rem;
    border: 1px solid #cacaca;
    border-radius: 1rem;
    padding: 1rem 1rem;
    cursor: pointer;
    min-width: 20rem; 
`;

const NaverBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 5rem;
    border: 1px solid #8ac007;
    border-radius: 1rem;
    padding: 1rem 1rem;
    background-color: #8ac007;
    cursor: pointer;
    min-width: 20rem; 
`;

const KakaoBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 5rem;
    border: 1px solid yellow;
    border-radius: 1rem;
    padding: 1rem 1rem;
    background-color: yellow;
    cursor: pointer;
    min-width: 20rem;
`;

const ImgBox = styled.div`
    width: 2rem;
    height: 2rem;
`;

const BtnTitle = styled.span`
    font-weight: 500;
    opacity: 0.6;
    color: #232836;
    font-size: 1.3rem;
`;

const NaverBtnTitle = styled.span`
    color: #fff;
    font-weight: 500;
    opacity: 0.8;
    font-size: 1.3rem;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const SideMenu = () => {
    const { isLogin, login, logout } = useAuth();
    const [showModal, setShowModal] = useState<boolean>(false); // 모달 상태 관리

    // 로그인
    const onLogin = () => {
        setShowModal(true);
        return;
    };

    // 로그아웃
    const onLogout = async () => {
        await fetch(`http://localhost:8080/logout`, {
            method: "POST",
            credentials: "include",
        });
        logout();
    };

    // 구글 로그인 사이트 이동
    const googleOnclick = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
        login();
    };

    // 네이버 로그인 사이트 이동
    const naverOnclick = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/naver";
        login();
    };

    // 카카오 로그인 사이트 이동
    const kakaoOnclick = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/kakao";
        login();
    };

    return (
        <>
            <Wrapper>
                {isLogin ? <LogoutButton onClick={onLogout}>로그아웃</LogoutButton> : <LoginButton onClick={onLogin}>로그인</LoginButton>}
                {showModal &&
                    <Modal onClick={() => setShowModal(false)}>
                        <Container>
                            <Btn onClick={googleOnclick}>
                                <ImgBox>
                                    <Img
                                        src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                                        alt=""
                                    />
                                </ImgBox>
                                <BtnTitle>Login with Google</BtnTitle>
                            </Btn>
                        </Container>
                        <Container>
                            <NaverBtn onClick={naverOnclick}>
                                <ImgBox>
                                    <Img
                                        src="https://cdn-icons-png.flaticon.com/512/9605/9605284.png"
                                        alt=""
                                    />
                                </ImgBox>
                                <NaverBtnTitle>Login with Naver</NaverBtnTitle>
                            </NaverBtn>
                        </Container>
                        <Container>
                            <KakaoBtn onClick={kakaoOnclick}>
                                <ImgBox>
                                    <Img
                                        src="https://cdn-icons-png.flaticon.com/512/3669/3669973.png"
                                        alt=""
                                    />
                                </ImgBox>
                                <BtnTitle>Login with Kakao</BtnTitle>
                            </KakaoBtn>
                        </Container>
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