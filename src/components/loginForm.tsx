import styled from "styled-components";
import useAuth from "../stores/useAuth";
import ico_google from "../assets/images/ico_google.svg"
import ico_kakao from "../assets/images/ico_kakao.svg"
import ico_naver from "../assets/images/ico_naver.svg"

const BtnContainer = styled.div`
    display: flex;
    gap: 3rem;
`;

const Btn = styled.button`
    cursor: pointer;
`;

const Img = styled.img`
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 50%;
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
            <BtnContainer>
                <Btn onClick={googleOnclick}>
                    <Img
                        src={ico_google}
                        alt="이미지 없음"
                    />
                </Btn>
                <Btn onClick={naverOnclick}>
                    <Img
                        src={ico_naver}
                        alt="이미지 없음"
                    />
                </Btn>
                <Btn onClick={kakaoOnclick}>
                    <Img
                        src={ico_kakao}
                        alt="이미지 없음"
                    />
                </Btn>
            </BtnContainer>

        </>
    )
}

export default LoginForm;