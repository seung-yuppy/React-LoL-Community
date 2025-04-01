import styled from "styled-components";
import CommunitiesHeader from "../components/communitiesHeader";
import Communities from "../components/communities";
import useAuth from "../stores/useAuth";
import { useEffect, useState } from "react";
import useCommunityList from "../hooks/communityList/useCommunityList";
import NoLogin from "./noLogin";
import useCommunityPopularList from "../hooks/communityList/useCommuityPopularList";
import useCommunitySearchList from "../hooks/communityList/useCommunitySearchList";

const CommunityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50rem;
    width: 55rem;
`;

const LoadingWrapper = styled.div`
    display: flex;
    font-size: 1.5rem;
    font-weight: bold;
`;

const Home = () => {
    const { isLogin, setInfo } = useAuth(); // userInfo에 값을 넣기 위해서 useEffect와 만들었다
    const { data: communityList, isLoading: isCommunityListLoading } = useCommunityList();
    const { data: communityPopularList, isLoading: isCommunityPopularListLoading } = useCommunityPopularList();
    const [searchQuery, setSearchQuery] = useState("");
    const { data: communitySearchList, isLoading: isCommunitySearchListLoading } = useCommunitySearchList(searchQuery);
    const [filteredList, setFilteredList] = useState(communityList);

    useEffect(() => {
        if (isLogin) {
            const fetchUserInfo = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/info`, {
                        method: "GET",
                        credentials: "include",
                    });
                    const data = await response.json();
                    setInfo({ nickname: data.nickname });
                } catch (error) {
                    console.error("유저 정보 가져오기 실패:", error);
                }
            };
            fetchUserInfo();
        }
    }, [isLogin, setInfo]);

    useEffect(() => {
        if (searchQuery && communitySearchList) {
            setFilteredList(communitySearchList);
        } else if (communityList) {
            setFilteredList(communityList);
        }
    }, [communityList, communitySearchList, searchQuery]);

    const handleFilter = (filterType: string) => {
        if (filterType === "recent") {
            setFilteredList(communityList);
        } else if (filterType === "popularity") {
            setFilteredList(communityPopularList);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <>
            <CommunityWrapper>
                <CommunitiesHeader onFilter={handleFilter} onSearch={handleSearch} />
                {isCommunityListLoading || isCommunityPopularListLoading || isCommunitySearchListLoading &&
                    <LoadingWrapper>
                        로딩중입니다....
                    </LoadingWrapper>
                }
                {isLogin ? (
                    <Communities communityList={filteredList} />
                ) : (
                    <NoLogin />
                )}
            </CommunityWrapper>
        </>
    );
};

export default Home;