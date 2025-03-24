import styled from "styled-components";
import useAuth from "../stores/useAuth";
import ico_google from "../images/ico_google.svg"
import ico_kakao from "../images/ico_kakao.svg"
import ico_naver from "../images/ico_naver.svg"

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
    const { login, setInfo } = useAuth();

    // 유저 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/info`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            console.log(data);
            setInfo(data.nickname);
        } catch (error) {
            console.error("유저 정보 가져오기 실패:", error);
        }
    };

    // 구글 로그인 사이트 이동
    const googleOnclick = async () => {
        try {
            const currentUrl = window.location.href;
            // 로그인 후 현재 페이지로 돌아오도록 state 파라미터 추가
            window.location.href = `http://localhost:8080/oauth2/authorization/google?state=${encodeURIComponent(currentUrl)}`;
            login();
            await fetchUserInfo(); // 로그인 후 유저 정보 가져오기
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    };

    // 네이버 로그인 사이트 이동
    const naverOnclick = async () => {
        try {
            const currentUrl = window.location.href;
            window.location.href = `http://localhost:8080/oauth2/authorization/naver?state=${encodeURIComponent(currentUrl)}`;
            login();
            await fetchUserInfo();
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    };

    // 카카오 로그인 사이트 이동
    const kakaoOnclick = async () => {
        try {
            const currentUrl = window.location.href;
            window.location.href = `http://localhost:8080/oauth2/authorization/kakao?state=${encodeURIComponent(currentUrl)}`;
            login();
            await fetchUserInfo();
        } catch (error) {
            console.error("로그인 실패:", error);
        }
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