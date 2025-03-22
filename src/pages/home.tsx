import styled from "styled-components";
import CommunitiesHeader from "../components/communitiesHeader";
import Communities from "../components/communities";
import useAuth from "../stores/useAuth";
import { useEffect } from "react";

const CommunityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50rem;
    width: 60rem;
`;

const Home = () => {
    const { setInfo } = useAuth(); // userInfo에 값을 넣기 위해서 useEffect와 만들었다

    useEffect(() => {
        // 유저 상세 정보 불러오기(닉네임 생성 & myTeam 생성 이후)
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8080/info`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setInfo({ nickname: data.nickname });
            } catch (error) {
                console.error("유저 상세 정보 불러오기 실패", error);
            }
        };
        fetchUserInfo();
    }, [setInfo]);

    return (
        <>
            <CommunityWrapper>
                <CommunitiesHeader />
                <Communities />
            </CommunityWrapper>
        </>
    );
};

export default Home;