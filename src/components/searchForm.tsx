import React, { useState } from "react";
import styled from "styled-components";
import ico_search from "../images/ico_search.svg"

const SForm = styled.form`
    display: flex;
    align-items: center;
    border: 1px solid;
    border-radius: 1rem;
    padding: 0.3rem 1rem;
`;

const SInput = styled.input`
    background-color: transparent;
    border: transparent;
    color: #333;

    &:focus {
        outline: transparent;
    }
`;

const SImage = styled.img`
    cursor: pointer;
    width: 1.2rem;
    object-fit: cover;
`;

const SButton = styled.button``;

type ISearchForm = {
    onSendSearch: (search: string) => void;
}

const SearchForm = ({ onSendSearch }: ISearchForm) => {
    const [search, setSearch] = useState("");

    // 게시글 검색 폼
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSendSearch(search);
        setSearch("");
    };

    return (
        <>
            <SForm onSubmit={handleSearch}>
                <SInput type="text" placeholder="제목을 입력하세요" value={search} onChange={(e) => setSearch(e.target.value)} />
                <SButton type="submit"><SImage src={ico_search} alt="이미지 없음" /></SButton>
            </SForm>
        </>
    )
}

export default SearchForm;