import styled from "styled-components";
import CommunitiesHeader from "../components/communitiesHeader";
import Communities from "../components/communities";
import useAuth from "../stores/useAuth";
import { useEffect, useState } from "react";
import useCommunityList from "../hooks/communityList/useCommunityList";
import NoLogin from "./noLogin";
import { useNavigate, useParams } from "react-router-dom";

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
    const pageParam = useParams();
    const navigate = useNavigate();
    const { isLogin, setInfo } = useAuth(); // userInfo에 값을 넣기 위해서 useEffect와 만들었다
    const [page, setPage] = useState(Number(pageParam.page) || 0);
    const { data: communityList, isLoading: isCommunityListLoading } = useCommunityList(page);

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

    // 페이지 버튼 핸들러
    const handlePrevPage = () => {
        const newPage = page - 1;
        setPage(newPage);
        navigate(`/${newPage}`);
    };
    const handleNextPage = () => {
        const newPage = page + 1;
        setPage(newPage);
        navigate(`/${newPage}`);
    };

    return (
        <>
            <CommunityWrapper>
                <CommunitiesHeader />
                {isCommunityListLoading && (
                    <LoadingWrapper>
                        로딩중입니다....
                    </LoadingWrapper>
                )}
                {isLogin ? (
                    <>
                        <Communities communityList={communityList} />
                        <Pagination>
                            {page !== 0 &&
                                <PageButton
                                    isActive={false}
                                    onClick={handlePrevPage}
                                    disabled={page === 0}
                                >
                                    이전
                                </PageButton>}
                            {communityList?.length === 20 &&
                                <PageButton
                                    isActive={false}
                                    onClick={handleNextPage}
                                >
                                    다음
                                </PageButton>}
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