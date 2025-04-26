import styled from "styled-components";
import ico_write from "../images/ico_write.svg"
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./searchForm";
import useAuth from "../stores/useAuth";
import useModal from "../hooks/useModal";
import Modal from "./modal";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
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
    const navigate = useNavigate();

    const handleSearchSubmit = (searchQuery: string, category: string) => {
        if (!isLogin) {
            openModal("loginAlert");
            return;
        }
        navigate(`/search/${category}/${searchQuery}/0`);
    };

    return (
        <>
            <HeaderContainer>
                <WriteBtnBox>
                    {isLogin && userInfo && <Link to={"/community/write"}><WriteImage src={ico_write} alt="이미지 없음" /></Link>}
                </WriteBtnBox>
                <TableHeader>
                    <FilterBtnContainer>
                        <Link to={`/0`}><FilterBtn>최신</FilterBtn></Link>
                        <Link to={`/10popular`}><FilterBtn>10추</FilterBtn></Link>
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