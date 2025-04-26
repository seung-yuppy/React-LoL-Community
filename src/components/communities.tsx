import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ico_up from "../images/ico_up.svg"
import ico_down from "../images/ico_down.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModal from "../hooks/useModal";
import Modal from "./modal";
import IContent from "../types/content";
import fetchAddLikeCommunityList from "../services/communityList/communityListLikeService";
import formatDate from "../util/dateUtil";
import useAuth from "../stores/useAuth";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-block: 2rem;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
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
    align-items: center;
    font-size: 1.2rem;
    padding: 1rem;
    gap: 10rem;
    transition: color 0.3s;
    border-bottom: 1px solid gray;

    &:hover {
        background-color: #ebebeb;
    }
`;

const TableBodytd = styled.div`
    display: flex;
    flex-direction: column;
`;

const TableTitle = styled.h2`
    font-size:  1.3rem;
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
    width: 20rem;
    cursor: pointer;
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

const ImgBox = styled.div`
    
`;

const Thumbnail = styled.div`
    img {
        width:7rem;
        height: 5rem;
    }
`;

const Communities = ({ communityList }: { communityList: IContent[] | undefined }) => {
    const queryClient = useQueryClient();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { isOpen, openModal, closeModal } = useModal();

    // 좋아요 mutation
    const addLike = useMutation({
        mutationFn: fetchAddLikeCommunityList,
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

    const handleLikeClick = (id: number) => {
        addLike.mutate(id);
    };

    const handleClick = (id: number) => {
        if (!userInfo) {
            openModal("noLogin");
        } else {
            navigate(`/community/${id}`);
        }

    }

    return (
        <>
            <Wrapper>
                <MainContainer>
                    <TableBox>
                        {communityList?.map((community) => (
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
                                <BoxInfo onClick={() => handleClick(community.id)}>
                                    <TableBodytd>
                                        <TableTitle>{community.title} [{community.commentsCount}]</TableTitle>
                                    </TableBodytd>
                                    <TableBodytd>
                                        <TableDate>조회수:{community.viewsCount} | {formatDate(community.updatedAt)}  | {community.nickname}</TableDate>
                                    </TableBodytd>
                                </BoxInfo>
                                {community.content.includes("<figure") &&
                                    <ImgBox>
                                        <Thumbnail dangerouslySetInnerHTML={{
                                            __html: community.content.match(/<figure.*?<\/figure>/s)?.[0] || '',
                                        }} />
                                    </ImgBox>
                                }
                            </TableBody>
                        ))}
                    </TableBox>
                </MainContainer>
            </Wrapper>

            {/* 모달 관리 */}
            {isOpen("noLogin") && (
                <Modal onClose={() => { closeModal("noLogin"); navigate("/mypage/userinfo") }}>
                    <TableTitle>닉네임을 정해주세요.</TableTitle>
                </Modal>
            )}
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
};

export default Communities;