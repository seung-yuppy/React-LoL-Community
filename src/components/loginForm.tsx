import styled from "styled-components";
import useAuth from "../stores/useAuth";
import ico_google from "../assets/images/ico_google.svg"
import ico_kakao from "../assets/images/ico_kakao.svg"
import ico_naver from "../assets/images/ico_naver.svg"

const Btn = styled.button`
    display: flex;
    align-items: center;
    gap: 3rem;
    border: 1px solid #cacaca;
    border-radius: 1rem;
    padding: 1rem;
    cursor: pointer;
    width: 20rem; 
`;

const NaverBtn = styled(Btn)`
    border: 1px solid #03c75a;
    background-color: #03c75a;
`;

const KakaoBtn = styled(Btn)`
    border: 1px solid #fee500;
    background-color: #fee500;
`;

const ImgBox = styled.div`
    width: 2.5rem;
    height: 2.5rem;
`;

const BtnTitle = styled.h1`
    font-weight: 500;
    opacity: 0.6;
    color: #232836;
    font-size: 1.3rem;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const LoginForm = () => {
    const { login } = useAuth();

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
            <Btn onClick={googleOnclick}>
                <ImgBox>
                    <Img
                        src={ico_google}
                        alt="이미지 없음"
                    />
                </ImgBox>
                <BtnTitle>LogIn With Google</BtnTitle>
            </Btn>
            <NaverBtn onClick={naverOnclick}>
                <ImgBox>
                    <Img
                        src={ico_naver}
                        alt="이미지 없음"
                    />
                </ImgBox>
                <BtnTitle>LogIn With Naver</BtnTitle>
            </NaverBtn>
            <KakaoBtn onClick={kakaoOnclick}>
                <ImgBox>
                    <Img
                        src={ico_kakao}
                        alt="이미지 없음"
                    />
                </ImgBox>
                <BtnTitle>LogIn With KaKao</BtnTitle>
            </KakaoBtn>
        </>
    )
}

export default LoginForm;