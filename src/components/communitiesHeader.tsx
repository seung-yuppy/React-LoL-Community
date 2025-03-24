import styled from "styled-components";
import ico_write from "../images/ico_write.svg"
import { Link } from "react-router-dom";
import SearchForm from "./searchForm";
import useAuth from "../stores/useAuth";
import useModal from "../hooks/useModal";
import Modal from "./modal";

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

const CommunitiesHeader = ({
    onFilter,
    onSearch,
}: {
    onFilter: (filterType: string) => void;
    onSearch: (searchQuery: string) => void;
}) => {
    const { isLogin, userInfo } = useAuth();
    const { isOpen, openModal, closeModal } = useModal();

    const handleFilterClick = (filterType: string) => {
        if (!isLogin) {
            openModal("loginAlert");
            return;
        }
        onFilter(filterType);
    };

    const handleSearchSubmit = (searchQuery: string) => {
        if (!isLogin) {
            openModal("loginAlert");
            return;
        }
        onSearch(searchQuery);
    };

    return (
        <>
            <HeaderContainer>
                <WriteBtnBox>
                    {isLogin && userInfo && <Link to={"/community/write"}><WriteImage src={ico_write} alt="이미지 없음" /></Link>}
                </WriteBtnBox>
                <TableHeader>
                    <FilterBtnContainer>
                        <FilterBtn onClick={() => handleFilterClick("recent")}>최신</FilterBtn>
                        <FilterBtn onClick={() => handleFilterClick("popularity")}>10추</FilterBtn>
                    </FilterBtnContainer>
                    <SearchForm onSendSearch={handleSearchSubmit} />
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