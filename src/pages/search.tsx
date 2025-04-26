import styled from "styled-components";
import NoLogin from "./noLogin";
import SideMenu from "../components/sideMenu";
import useAuth from "../stores/useAuth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCommunitySearchList from "../hooks/communityList/useCommunitySearchList";
import useCommunitySearchContentList from "../hooks/communityList/useCommunitySearchContentList";
import useCommunitySearchNicknameList from "../hooks/communityList/useCommunitySearchNicknameList";
import useCommunitySearchTitleContentList from "../hooks/communityList/useCommunitySearchTitleContentList";
import CommunitiesHeader from "../components/communitiesHeader";
import Communities from "../components/communities";
import IContent from "../types/content";

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

const Search = () => {
  const search = useParams();
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const searchQuery = search.searchQuery || "";
  const [page, setPage] = useState(Number(search.page) || 0);
  const { data: communitySearchList, isLoading: isCommunitySearchListLoading } = useCommunitySearchList(searchQuery, page);
  const { data: communitySearchContentList } = useCommunitySearchContentList(searchQuery, page);
  const { data: communitySearchNicknameList } = useCommunitySearchNicknameList(searchQuery, page);
  const { data: communitySearchTitleContentList } = useCommunitySearchTitleContentList(searchQuery, page);
  const [filterList, setFilterList] = useState<IContent[]>();

  useEffect(() => {
    if (search.category === "제목") {
      setFilterList(communitySearchList);
    } else if (search.category === "내용") {
      setFilterList(communitySearchContentList);
    } else if (search.category === "작성자") {
      setFilterList(communitySearchNicknameList);
    } else if (search.category === "제목+내용") {
      setFilterList(communitySearchTitleContentList);
    }
  }, [communitySearchContentList, communitySearchList, communitySearchNicknameList, communitySearchTitleContentList, search]);

  // 페이지 버튼 핸들러
  const handlePrevPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    navigate(`/search/${search.category}/${searchQuery}/${newPage}`);;
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    navigate(`/search/${search.category}/${searchQuery}/${newPage}`);
  };

  return (
    <>
      <SideMenu />
      <CommunityWrapper>
        <CommunitiesHeader />
        {isCommunitySearchListLoading && (
          <LoadingWrapper>
            로딩중입니다....
          </LoadingWrapper>
        )}
        {isLogin ? (
          <>
            <Communities communityList={filterList} />
            <Pagination>
              {page !== 0 && (
                <PageButton
                  isActive={false}
                  onClick={handlePrevPage}
                  disabled={page === 0}
                >
                  이전
                </PageButton>
              )}
              {filterList?.length === 20 &&
                <PageButton
                  isActive={false}
                  onClick={handleNextPage}
                >
                  다음
                </PageButton>
              }
            </Pagination>
          </>

        ) : (
          <NoLogin />
        )}
      </CommunityWrapper>
    </>
  );
}

export default Search;