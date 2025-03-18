import styled from "styled-components";
import ico_write from "../assets/images/ico_write.svg"
import { Link } from "react-router-dom";
import SearchForm from "./searchForm";
import useAuth from "../stores/useAuth";

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

type ICommunitiesHeader = {
    handleRecent: () => void;
    handlePopularity: () => void;
    handleSearchForm: (search: string) => void;
}

const CommunitiesHeader = ({ handleRecent, handlePopularity, handleSearchForm }: ICommunitiesHeader) => {
    const { isLogin, userInfo } = useAuth();

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
        </>
    );
}

export default CommunitiesHeader;