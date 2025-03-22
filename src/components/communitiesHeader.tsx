import styled from "styled-components";
import ico_write from "../images/ico_write.svg"
import { Link } from "react-router-dom";
import SearchForm from "./searchForm";
import useAuth from "../stores/useAuth";
import useModal from "../hooks/useModal";
import Modal from "./modal";
import { useQuery } from "@tanstack/react-query";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #333;
    padding: 0 2rem;
    border-radius: 1rem;
`;

const WriteBtnBox = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
`;

const WriteImage = styled.img`
    cursor:pointer;
    width: 2rem;
    object-fit: cover;
`;

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
`;

const FilterBtnContainer = styled.div`
    display: flex;
    gap: 2rem;
`;

const FilterBtn = styled.button`
    font-size: 1.2rem;
    color: #333;
    cursor: pointer;

    &:hover {
        color: steelblue;
    }
`;

const TableTitle = styled.h2`
    font-size:1.5rem;
    font-weight: bold;
`;

const CommunitiesHeader = () => {
    const { isLogin, userInfo } = useAuth();
    const { isOpen, openModal, closeModal } = useModal();

    // 최신순으로 정렬
    const handleRecent = async () => {
        if (!isLogin) return openModal("loginAlert");;
        try {
            const response = await fetch(`http://localhost:8080/community`, {
                method: "GET", credentials: "include"
            });
            if (!response.ok) throw new Error("API 연결 오류");
            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error("커뮤니티 리스트 불러오기 오류", error);
        }
    };

    // 인기순으로 정렬
    const handlePopularity = async () => {
        if (!isLogin) return openModal("loginAlert");;

        try {
            const response = await fetch(`http://localhost:8080/community/popularity`, {
                method: "GET", credentials: "include"
            });
            if (!response.ok) throw new Error("API 연결 오류");
            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error("10추 정렬 오류", error);
        }
    };

    // 검색 폼 처리
    const handleSearchForm = async (search: string) => {
        if (!isLogin) return openModal("loginAlert");;

        try {
            const response = await fetch(`http://localhost:8080/community/search/${search}`, {
                method: "GET", credentials: "include"
            });
            if (!response.ok) throw new Error("API 연결 오류");
            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error("검색 오류", error);
        }
    };

    // const { data: recentCommunityList } = useQuery({
    //     queryKey: ["recentCommunityList"],
    //     queryFn: handleRecent,
    // });

    // const { data: popularCommunityList } = useQuery({
    //     queryKey: ['popularCommunityList'],
    //     queryFn: handlePopularity,
    // });

    // const { data: searchCommunityList } = useQuery({
    //     queryKey: ["searchCommunityList"],
    //     queryFn: ({ queryKey }) => handleSearchForm(queryKey[1]),
    // });



    return (
        <>
            <HeaderContainer>
                <WriteBtnBox>
                    {isLogin && userInfo && <Link to={"/community/write"}><WriteImage src={ico_write} alt="이미지 없음" /></Link>}
                </WriteBtnBox>
                <TableHeader>
                    <FilterBtnContainer>
                        <FilterBtn onClick={handleRecent}>최신</FilterBtn>
                        <FilterBtn onClick={handlePopularity}>10추</FilterBtn>
                        <FilterBtn>인기</FilterBtn>
                        <FilterBtn>TOP</FilterBtn>
                    </FilterBtnContainer>
                    <SearchForm onSendSearch={handleSearchForm} />
                </TableHeader>
            </HeaderContainer>

            {/* 모달 관리 */}
            {isOpen("loginAlert") && (
                <Modal onClose={() => closeModal("loginAlert")}>
                    <TableTitle>로그인 후 이용해주세요</TableTitle>
                </Modal>
            )}
        </>
    );
}

export default CommunitiesHeader;