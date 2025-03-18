import styled from "styled-components";
import Chat from "../components/chat";
import Communities from "../components/communities";
import SideMenu from "../components/sideMenu";
import useAuth from "../stores/useAuth";
import { useEffect } from "react";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
`;

const Home = () => {
    const { setInfo } = useAuth();  // userInfo에 값을 넣기 위해서 useEffect와 만들었다

    useEffect(() => {
        // 유저 상세 정보 불러오기(닉네임 생성 & myTeam 생성 이후)
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8080/info`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setInfo(data);
            } catch (error) {
                console.error("유저 상세 정보 불러오기 실패", error);
            }
        };
        fetchUserInfo();
    }, [])

    return (
        <>
            <Wrapper>
                <SideMenu />
                <Communities />
                <Chat />
            </Wrapper >
        </>
    );
}

export default Home;