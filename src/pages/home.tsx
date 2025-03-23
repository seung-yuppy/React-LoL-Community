import styled from "styled-components";
import CommunitiesHeader from "../components/communitiesHeader";
import Communities from "../components/communities";
import useAuth from "../stores/useAuth";
import { useEffect, useState } from "react";
import useCommunityList from "../hooks/useCommunityList";
import NoLogin from "./noLogin";
import useCommunityPopularList from "../hooks/useCommuityPopularList";

const CommunityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50rem;
    width: 60rem;
`;

const Home = () => {
    const { isLogin, setInfo } = useAuth(); // userInfo에 값을 넣기 위해서 useEffect와 만들었다
    const { data: communityList, isLoading: isCommunityListLoading, error: communityListError } = useCommunityList();
    const { data: communityPopularList } = useCommunityPopularList();
    const [filteredList, setFilteredList] = useState(communityList);

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

        if (communityList) {
            setFilteredList(communityList); // 최신순 데이터를 기본값으로 설정
        };
    }, [setInfo, communityList]);

    const handleFilter = (filterType: string) => {
        if (filterType === "recent") {
            // 최신순 데이터 처리
            setFilteredList(communityList); // 최신순 데이터로 설정
        } else if (filterType === "popularity") {
            // 인기순 데이터 처리
            setFilteredList(communityPopularList); // 인기순 데이터로 설정
        }
    };

    return (
        <>
            <CommunityWrapper>
                <CommunitiesHeader onFilter={handleFilter} />
                {isLogin ?
                    <Communities communityList={filteredList} isCommunityListLoading={isCommunityListLoading} communityListError={communityListError} />
                    :
                    <NoLogin />
                }
            </CommunityWrapper>
        </>
    );
};

export default Home;