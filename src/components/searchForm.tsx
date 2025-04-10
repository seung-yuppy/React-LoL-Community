import React, { useState } from "react";
import styled from "styled-components";
import ico_search from "../images/ico_search.svg"

const SForm = styled.form`
    display: flex;
    align-items: center;
    border: 1px solid;
    border-radius: 1rem;
    padding: 0.3rem 1rem;
    gap: 1rem;
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

const SSelect = styled.select`
    
`;

const SButton = styled.button``;

const SearchForm = ({ onSendSearch }: { onSendSearch: (search: string, category: string) => void; }) => {
    const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState("제목");

    // 게시글 검색 폼
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSendSearch(search, selectedOption);
        setSearch("");
    };

    return (
        <>
            <SForm onSubmit={handleSearch}>
                <SSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value={"제목"}>제목</option>
                    <option value={"내용"}>내용</option>
                    <option value={"작성자"}>작성자</option>
                    <option value={"제목+내용"}>제목+내용</option>
                </SSelect>
                <SInput type="text" placeholder="검색" value={search} onChange={(e) => setSearch(e.target.value)} />
                <SButton type="submit"><SImage src={ico_search} alt="이미지 없음" /></SButton>
            </SForm>
        </>
    )
}

export default SearchForm;