import { Link } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../stores/useAuth";
import ico_up from "../images/ico_up.svg"
import ico_down from "../images/ico_down.svg";
import IContent from "../types/content";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useModal from "../hooks/useModal";
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
    overflow-y: scroll;
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

// type CommunitiesProps = {
//     communityList: IContent[];
//     addLike: (id: number) => void;
// }

const Communities = () => {
    const queryClient = useQueryClient();
    const { isLogin } = useAuth();  // 로그인 상태 관리
    const { isOpen, openModal, closeModal } = useModal();   // 모달 관리

    // 커뮤니티 리스트 불러오기
    const fetchData = async () => {
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

    const { data: communityList, isLoading: listLoading, isError: listError } = useQuery<IContent[]>({
        queryKey: ['communityList'],
        queryFn: fetchData,
        // onSuccess: (data: IContent[]) => {
        //     setCommunityList(data);
        // }
    });

    // 좋아요 버튼 누르기
    // const addLike = async (id: number) => {
    //     try {
    //         const res = await fetch(`http://localhost:8080/community/${id}/like`, {
    //             method: "POST",
    //             credentials: "include",
    //         });
    //         const data = await res.text();

    //         if (data === "이미 좋아요를 누르셨습니다.") {
    //             openModal("dupLike");
    //         } else if (data === "이 글을 좋아합니다.") {
    //             openModal("like");
    //         } else {
    //             openModal("loginAlert");
    //         }
    //     } catch (error) {
    //         console.error("좋아요 실패", error);
    //     }
    // };

    // 좋아요 버튼 누르면 react-query의 mutation으로 업데이트하기
    const addLike = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`http://localhost:8080/community/${id}/like`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.text();
            return data;
        },
        onSuccess: (data) => {
            if (data === "이미 좋아요를 누르셨습니다.") {
                openModal("dupLike");
            } else if (data === "이 글을 좋아합니다.") {
                openModal("like");
                queryClient.invalidateQueries({ queryKey: ["communityList"] });
            } else {
                openModal("loginAlert");
            }
        },
        onError: (error) => {
            console.error("좋아요 실패", error);
        },
    });

    // useMutation을 사용하기 위한 함수
    const handleLikeClick = (id: number) => {
        addLike.mutate(id);
    };

    return (
        <>
            <Wrapper>
                <MainContainer>
                    {!isLogin && listLoading || listError ? (
                        <TableTitle>로그인 후 이용해주세요.</TableTitle>
                    ) : communityList?.length === 0 && listLoading || listError ? (
                        <TableTitle>게시글이 없습니다.</TableTitle>
                    ) : (
                        <TableBox>
                            {communityList?.slice(0, 20).map((community) => (
                                <TableBody key={community.id}>
                                    <ButtonContainer>
                                        <LikeButton onClick={() => handleLikeClick(community.id)}>
                                            <SearchImage src={ico_up} alt="이미지 없음" />
                                        </LikeButton>
                                        {community.likesCount}
                                        <LikeButton>
                                            <SearchImage src={ico_down} alt="이미지 없음" />
                                        </LikeButton>
                                    </ButtonContainer>
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

            {/* 모달 관리 */}
            {isOpen("like") && (
                <Modal onClose={() => closeModal("like")}>
                    <TableTitle>이 글을 좋아합니다.❤️</TableTitle>
                </Modal>
            )}
            {isOpen("dupLike") && (
                <Modal onClose={() => closeModal("dupLike")}>
                    <TableTitle>이 글을 이미 좋아했습니다.</TableTitle>
                </Modal>
            )}
        </>
    );
}

export default Communities;
