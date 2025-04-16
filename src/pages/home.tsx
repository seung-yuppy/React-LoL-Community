import styled from "styled-components";
import CommunitiesHeader from "../components/communitiesHeader";
import Communities from "../components/communities";
import useAuth from "../stores/useAuth";
import { useEffect, useState } from "react";
import useCommunityList from "../hooks/communityList/useCommunityList";
import NoLogin from "./noLogin";
import useCommunityPopularList from "../hooks/communityList/useCommuityPopularList";
import useCommunitySearchList from "../hooks/communityList/useCommunitySearchList";
import SideMenu from "../components/sideMenu";
import useCategoryCommunityList from "../hooks/communityList/useCommunityCategoryList";
import useCommunitySearchContentList from "../hooks/communityList/useCommunitySearchContentList";
import useCommunitySearchNicknameList from "../hooks/communityList/useCommunitySearchNicknameList";
import useCommunitySearchTitleContentList from "../hooks/communityList/useCommunitySearchTitleContentList";

const CommunityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 55rem;
    padding-bottom: 1rem;
`;

const LoadingWrapper = styled.div`
    display: flex;
    font-size: 1.5rem;
    font-weight: bold;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

const PageButton = styled.button<{ isActive: boolean }>`
    padding: 0.5rem 1rem;
    background: ${({ isActive }) => (isActive ? "#08ccac" : "#fff")};
    color: ${({ isActive }) => (isActive ? "#fff" : "#08ccac")};
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    cursor: pointer;
    font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
    &:hover {
        background: #eee;
    }
`;

const Home = () => {
    const { isLogin, setInfo } = useAuth(); // userInfo에 값을 넣기 위해서 useEffect와 만들었다
    const [page, setPage] = useState(0);
    const { data: communityList, isLoading: isCommunityListLoading } = useCommunityList(page);
    const { data: communityPopularList, isLoading: isCommunityPopularListLoading } = useCommunityPopularList();
    const [searchQuery, setSearchQuery] = useState("");
    const { data: communitySearchList, isLoading: isCommunitySearchListLoading } = useCommunitySearchList(searchQuery);
    const { data: communitySearchContentList } = useCommunitySearchContentList(searchQuery);
    const { data: communitySearchNicknameList } = useCommunitySearchNicknameList(searchQuery);
    const { data: communitySearchTitleContentList } = useCommunitySearchTitleContentList(searchQuery);
    const [filteredList, setFilteredList] = useState(communityList);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchCategory, setSearchCategory] = useState("제목");

    // 선택된 카테고리에 따라 데이터를 가져오기
    const { data: communityCategoryList, isLoading: isCategoryLoading } = useCategoryCommunityList(selectedCategory || "");

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

    // 검색 및 필터링 로직
    useEffect(() => {
        if (searchQuery) {
            if (searchCategory === "제목") {
                setFilteredList(communitySearchList);
                setSelectedCategory(null);
            } else if (searchCategory === "내용") {
                setFilteredList(communitySearchContentList);
                setSelectedCategory(null);
            } else if (searchCategory === "작성자") {
                setFilteredList(communitySearchNicknameList);
                setSelectedCategory(null);
            } else if (searchCategory === "제목+내용") {
                setFilteredList(communitySearchTitleContentList);
                setSelectedCategory(null);
            }
        } else if (!searchQuery && selectedCategory && communityCategoryList) {
            setFilteredList(communityCategoryList);
        } else if (!searchQuery && !selectedCategory && communityList) {
            setFilteredList(communityList);
        }
    }, [
        searchQuery,
        searchCategory,
        selectedCategory,
        communitySearchList,
        communitySearchTitleContentList,
        communitySearchContentList,
        communitySearchNicknameList,
        communityCategoryList,
        communityList,
    ]);

    const handleFilter = (filterType: string) => {
        if (filterType === "recent") {
            setFilteredList(communityList);
            setSelectedCategory(null); // 카테고리 초기화
        } else if (filterType === "popularity") {
            setFilteredList(communityPopularList);
            setSelectedCategory(null); // 카테고리 초기화
        } else {
            setSelectedCategory(filterType); // 선택된 카테고리 업데이트
        }
    };

    // 검색 핸들러
    const handleSearch = (query: string, category: string) => {
        setSearchQuery(query);
        setSearchCategory(category);
        setSelectedCategory(null); // 검색 시 카테고리 초기화
    };

    // 페이지 버튼 핸들러
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            <SideMenu onFilter={handleFilter} />
            <CommunityWrapper>
                <CommunitiesHeader onFilter={handleFilter} onSearch={handleSearch} />
                {(isCommunityListLoading || isCommunityPopularListLoading || isCommunitySearchListLoading || isCategoryLoading) && (
                    <LoadingWrapper>
                        로딩중입니다....
                    </LoadingWrapper>
                )}
                {isLogin ? (
                    <>
                        <Communities communityList={filteredList} />
                        <Pagination>
                            {[0, 1].map((num) => (
                                <PageButton
                                    key={num}
                                    isActive={page === num}
                                    onClick={() => handlePageChange(num)}
                                >
                                    {num + 1}
                                </PageButton>
                            ))}
                        </Pagination>
                    </>

                ) : (
                    <NoLogin />
                )}
            </CommunityWrapper>
        </>
    );
};

export default Home;