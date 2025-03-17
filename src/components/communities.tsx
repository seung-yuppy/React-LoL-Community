import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useAuth from "../stores/useAuth";
import ico_up from "../assets/images/ico_up.svg"
import IContent from "../types/content";
import CommunitiesHeader from "./communitiesHeader";
import Modal from "./modal";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50rem;
    width: 60rem;
`;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 42rem;
    border: 1px solid #333;
    padding: 1rem 2rem;
    border-radius: 1rem;

`;

const TableBox = styled.ul`
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
`;

const TableBody = styled.li`
    display: flex;
    justify-content: flex-start;
    font-size: 1.2rem;
    padding: 1rem;
    width: 45rem;
    gap: 5rem;
    transition: color 0.3s;
    border-bottom: 1px solid gray;
`;

const TableBodytd = styled.div`
    display: flex;
    flex-direction: column;
`;

const TableTitle = styled.h2`
    font-size:1.5rem;
    font-weight: bold;
`;

const TableDate = styled.h2`
    font-weight: lighter;
    font-size: 1rem;
`;

const BoxInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
`;

const LikeButton = styled.button`
    cursor: pointer;
    color: #333;
    font-size: 1.3rem;
`;

const SearchImage = styled.img`
    width: 1.2rem;
    object-fit: cover;
`;

const Communities = () => {
    const { isLogin } = useAuth();  // 로그인 상태 관리
    const [communityList, setCommunityList] = useState<IContent[]>([]); // 커뮤니티 리스트 상태 관리
    const [showAlertModal, setShowAlertModal] = useState<boolean>(false); // 로그인 경고창 모달 상태 관리
    const [showLikeModal, setShowLikeModal] = useState<boolean>(false); // 좋아요 경고창 모달 상태 관리
    const [showDupLikeModal, setShowDupLikeModal] = useState<boolean>(false); // 이미 좋아요 누른 경고창 모달 상태 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/community`, { method: "GET", credentials: "include" });
                if (!response.ok) {
                    throw new Error("API 연결 오류");
                }
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("커뮤니티 리스트 불러오기 오류", error);
            }
        };
        fetchData();
    }, [showAlertModal]);

    // 좋아요 버튼 누르기
    const addLike = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/community/${id}/like`, {
                method: "POST",
                credentials: "include",
            })
            const data = await res.text();
            if (data === "이미 좋아요를 누르셨습니다.") {
                setShowDupLikeModal(true);
            } else {
                setShowLikeModal(true);
            }
        } catch (error) {
            console.error("좋아요 실패", error);

        }
    };

    // 최신순으로 정렬
    const handleRecent = async () => {
        if (!isLogin) {
            setShowAlertModal(true);
        } else {
            try {
                const response = await fetch(`http://localhost:8080/community`, { method: "GET", credentials: "include" });
                if (!response.ok) {
                    throw new Error("API 연결 오류");
                }
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("커뮤니티 리스트 불러오기 오류", error);
            }
        }
    };

    // 10개 이상 좋아요 정렬
    const handlePopularity = async () => {
        if (!isLogin) {
            setShowAlertModal(true);
        } else {
            try {
                const response = await fetch(`http://localhost:8080/community/popularity`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("10추 정렬 오류", error);
            }
        }
    };

    // 검색 폼 처리
    const handleSearchForm = async (search: string) => {
        if (!isLogin) {
            setShowAlertModal(true);
        } else {
            try {
                const response = await fetch(`http://localhost:8080/community/search/${search}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("검색 오류", error);
            }
        }
    };

    return (
        <>
            <Wrapper>
                {showAlertModal &&
                    <Modal onClick={() => setShowAlertModal(false)}>
                        <TableTitle>로그인 후 이용해주세요</TableTitle>
                    </Modal>
                }
                {showLikeModal &&
                    <Modal onClick={() => setShowLikeModal(false)}>
                        <TableTitle>이 글을 좋아합니다.❤️</TableTitle>
                    </Modal>
                }
                {showDupLikeModal &&
                    <Modal onClick={() => setShowDupLikeModal(false)}>
                        <TableTitle>이 글을 이미 좋아했습니다.</TableTitle>
                    </Modal>
                }
                <CommunitiesHeader handleRecent={handleRecent} handlePopularity={handlePopularity} handleSearchForm={handleSearchForm} />
                <MainContainer>
                    {!isLogin ? (
                        <TableTitle>로그인 후 이용해주세요.</TableTitle>
                    ) : communityList.length === 0 ? (
                        <TableTitle>게시글이 없습니다.</TableTitle>
                    ) : (
                        <TableBox>
                            {communityList.slice(0, 10).map((community) => (
                                <TableBody key={community.id}>
                                    <TableBodytd>
                                        <SearchImage src={ico_up} alt="이미지 없음" />
                                        <LikeButton onClick={() => addLike(community.id)}>
                                            {community.likesCount}
                                        </LikeButton>
                                    </TableBodytd>
                                    <Link to={`/community/${community.id}`}>
                                        <BoxInfo>
                                            <TableBodytd>
                                                <TableTitle>{community.title} [{community.commentsCount}]</TableTitle>
                                            </TableBodytd>
                                            <TableBodytd>
                                                <TableDate>조회수:{community.viewsCount} | {community.nickname}</TableDate>
                                            </TableBodytd>
                                        </BoxInfo>
                                    </Link>
                                </TableBody>
                            ))}
                        </TableBox>
                    )}
                </MainContainer>
            </Wrapper >
        </>
    );
}

export default Communities;
