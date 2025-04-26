import styled from "styled-components";
import NoLogin from "./noLogin";
import useAuth from "../stores/useAuth";
import { useState } from "react";
import SideMenu from "../components/sideMenu";
import CommunitiesHeader from "../components/communitiesHeader";
import Communities from "../components/communities";
import useCategoryCommunityList from "../hooks/communityList/useCommunityCategoryList";
import { useParams } from "react-router-dom";

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

const Category = () => {
  const categoryParam = useParams();
  const category = categoryParam.category || "";
  const { isLogin } = useAuth();
  const [page, setPage] = useState(0);
  const { data: communityCategoryList, isLoading: isCategoryLoading } = useCategoryCommunityList(category);
  const maxPage = 100;

  // 페이지 버튼 핸들러
  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < maxPage) setPage(page + 1);
  };

  return (
    <>
      <SideMenu />
      <CommunityWrapper>
        <CommunitiesHeader />
        {isCategoryLoading && (
          <LoadingWrapper>
            로딩중입니다....
          </LoadingWrapper>
        )}
        {isLogin ? (
          <>
            <Communities communityList={communityCategoryList} />
            <Pagination>
              {page !== 0 && <PageButton
                isActive={false}
                onClick={handlePrevPage}
                disabled={page === 0}
              >
                이전
              </PageButton>}

              <PageButton
                isActive={false}
                onClick={handleNextPage}
                disabled={page === maxPage}
              >
                다음
              </PageButton>
            </Pagination>
          </>

        ) : (
          <NoLogin />
        )}
      </CommunityWrapper>
    </>
  );
}

export default Category;