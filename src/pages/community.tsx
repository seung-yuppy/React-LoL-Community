import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "../components/modal";
import IComment from "../types/comment";
import useAuth from "../stores/useAuth";
import ico_bad from "../images/ico_bad.svg";
import ico_good from "../images/ico_good.svg";
import useModal from "../hooks/useModal";
import useCommunity from "../hooks/community/useCommunity";
import useCommentList from "../hooks/comment/useCommentList";
import { useQueryClient } from "@tanstack/react-query";
import useCommentRecentList from "../hooks/comment/useCommentRecentList";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Toast from "../components/toast";
import SideMenu from "../components/sideMenu";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 63rem;
    height: 50rem;
    overflow-y: scroll;
    position: relative;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 60rem;
    border: 1px solid #333;
    padding: 1rem 2rem;
    border-radius: 1rem;
`;

const Title = styled.h2`
    font-size: 2.3rem;
    text-align: left;
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

const HeaderContent1 = styled.h2`
    font-size: 1.2rem;
`;

const HeaderContent2 = styled(HeaderContent1)`
    font-size: 1rem;
    color:gray;
`;

const Dynamiccontent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    gap: 1rem;

    img {
        width: 20rem;
        height: 20rem;
    }

    p {
        font-size: 1.2rem;
    }
`;

const FormWrapper = styled.form`
    display:flex;
    gap: 1rem;
`;

const UsernameInput = styled.input`
    padding: 0.5rem 2rem;
    border-radius: 1rem;
    border: 1px solid #333;
    background-color: #fff;
    color: #333;
    font-size: 1rem;
`;

const Btn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #08ccac;
    color: #fff;
    border-radius: 1rem;
    font-size: 1rem;
    border: 1px solid #08ccac;
    cursor: pointer;
`;

const CommentBox = styled.div`
    display:flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid lightgray;
    padding: 1rem;
`;

const TableTitle = styled.h2`
    font-size:1.5rem;
    font-weight: bold;
`;

const ReplyButton = styled.button`
    font-size: 1rem;
`;

const CommentHeader1 = styled.div`
    display:flex;
    align-items: center;
`;

const TeamLogo = styled.img`
    width: 3rem;
    height: 3rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const ModalDelButton = styled.button`
    color: #fff;
    background-color: crimson;
    border: crimson;
    padding: 0.7rem 2rem;
    font-size: 1.2rem;
    border-radius:0.5rem;
    cursor: pointer;
`;

const InfoHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const EditButton = styled(ReplyButton)`
    border: 1px solid gray;
    padding: 0.3rem;
    border-radius: 0.5rem;
`;

const DeleteButton = styled(ReplyButton)`
    border: 1px solid crimson;
    padding: 0.3rem;
    border-radius: 0.5rem;
    color: crimson;
`;

const GoodComment = styled.img`
    width: 2rem;
    height: 2rem;
`;

const GoodBox = styled.div`
    display:flex;
    align-items: center;
    gap: 0.5rem;
`;

const GoodBtn = styled.button`
`;

const CommentFilterBox = styled.div`
    display: flex;
    gap: 1rem;
`;

const CommentFilterButton = styled.button`
    font-size: 1.2rem;
`;
interface Notification {
    message: string;
    timestamp: string;
};

const Community = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const { communityId } = useParams();    // 상세페이지 들어오기 위한 params
    const { isOpen, openModal, closeModal } = useModal();  // 모달 관리
    const [content, setContent] = useState<string>(""); // 댓글 작성
    const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({}); // 대댓글 작성 폼 상태 관리
    const [reply, setReply] = useState<string>(""); // 대댓글 작성
    const [parentId, setParentId] = useState<number>(); // 대댓글 작성을 위한 댓글의 id
    const [showEditForm, setShowEditForm] = useState<{ [key: number]: boolean }>({});  // 댓글 수정 폼 상태 관리
    const [editContent, setEditContent] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("popular");
    const { data: communityPost } = useCommunity(communityId ?? ""); // communityId가 undefined일 때 빈 문자열로 처리
    const { data: commentList } = useCommentList(communityId ?? "");
    const { data: commentRecentList } = useCommentRecentList(communityId ?? "");
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // WebSocket 엔드포인트 설정 (Spring Boot WebSocket 경로)
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000, // 자동 재연결
        });
        // 연결 성공 시 구독
        stompClient.onConnect = () => {
            console.log("WebSocket Connected!");
            stompClient.subscribe(`/topic/notifications/${userInfo.nickname}`, (message) => {
                const notification: Notification = JSON.parse(message.body);
                setNotifications((prev) => [notification, ...prev]);
            });
        };
        stompClient.activate();
        return () => {
            stompClient.deactivate();
        };
    }, [userInfo]);

    // 게시글 삭제
    const deleteCommunity = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await fetch(
                `http://localhost:8080/community/${communityId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            navigate("/");
        } catch (error) {
            console.error("게시글 삭제 오류", error);
            openModal("deleteCommunity");
        }
    };

    // 댓글 작성
    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!userInfo) {
                openModal("alertLogin")
                setContent("");
            } else if (userInfo) {
                await fetch(`http://localhost:8080/${communityId}/comment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content }),
                    credentials: "include",
                });
                // setShowCommentModal(true);
                openModal("comment");
                setContent("");
                queryClient.invalidateQueries({ queryKey: ["comment"] });
            }
        } catch (error) {
            console.error("댓글 입력 실패", error);
        }
    };

    // 대댓글 폼 열기
    const toggleReplyForm = (comment: IComment) => {
        setShowReplyForm((prev) => ({
            ...prev,
            [comment.id]: !prev[comment.id],
        }));
        setParentId(comment.id);
    };

    // 대댓글 작성
    const postReply = async (e: React.FormEvent<HTMLFormElement>, comment: IComment) => {
        e.preventDefault();
        try {
            if (!userInfo) {
                openModal("alertLogin")
                setReply("");
            } else if (userInfo) {
                await fetch(`http://localhost:8080/${communityId}/${parentId}/comment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content: reply }),
                    credentials: "include",
                })
                openModal("comment");
                setShowReplyForm((prev) => ({
                    ...prev,
                    [comment.id]: false,
                }));
                setReply("");
                queryClient.invalidateQueries({ queryKey: ["comment"] });
            }
        } catch (error) {
            console.error("대댓글 입력 실패", error);
        }
    };

    // 댓글 수정 폼 열기
    const toggleEditForm = (comment: IComment) => {
        setShowEditForm((prev) => ({
            ...prev,
            [comment.id]: !prev[comment.id],
        }));
        setEditContent(comment.content);
        setParentId(comment.id)
    };

    // 댓글 수정
    const editComment = async (e: React.FormEvent<HTMLFormElement>, comment: IComment) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8080/${parentId}/comment`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: editContent }),
                credentials: "include",
            });
            openModal("editComment");
            setShowEditForm((prev) => ({
                ...prev,
                [comment.id]: false,
            }));
            queryClient.invalidateQueries({ queryKey: ["comment"] });
        } catch (error) {
            console.error("댓글 수정 실패", error);
        }
    };

    // 댓글 삭제 모달창 
    const toggleDelete = (comment: IComment) => {
        openModal("deleteComment");
        setParentId(comment.id)
    };

    // 댓글 삭제
    const deleteComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8080/${parentId}/comment`, {
                method: "DELETE",
                credentials: "include",
            });
            closeModal("deleteComment");
            queryClient.invalidateQueries({ queryKey: ["comment"] });
        } catch (error) {
            console.error("댓글 삭제 실패", error);
        }
    };

    // 댓글 좋아요
    const goodComment = async (comment: IComment) => {
        try {
            const response = await fetch(`http://localhost:8080/${comment.id}/like?likeType=like`, {
                method: "POST",
                credentials: "include"
            })
            const data = await response.text();
            if (data === "이미 공감한 댓글입니다.") {
                openModal("dupLikeComment");
            } else {
                openModal("likeComment");
                queryClient.invalidateQueries({ queryKey: ["comment"] });
            }
        } catch (error) {
            console.error("댓글 좋아요 실패", error);
        }
    };

    // 댓글 싫어요
    const hateComment = async (comment: IComment) => {
        try {
            const response = await fetch(`http://localhost:8080/${comment.id}/like?likeType=dislike`, {
                method: "POST",
                credentials: "include"
            })
            const data = await response.text();
            if (data === "이미 공감한 댓글입니다.") {
                openModal("dupLikeComment");
            } else {
                openModal("hateComment");
                queryClient.invalidateQueries({ queryKey: ["comment"] });
            }
        } catch (error) {
            console.error("댓글 싫어요 실패", error);
        }
    };

    // 댓글 필터링 함수
    const getFilteredComments = () => {
        if (filterType === "recent") {
            return commentRecentList;
        } else {
            return commentList;
        }
    };

    return (
        <>
            <SideMenu />
            <Wrapper>
                {communityPost && (
                    <MainContainer key={communityPost.id}>
                        <Title>{communityPost.title}</Title>
                        <InfoHeader>
                            <ContentHeader>
                                <HeaderContent1>{communityPost.nickname} | {communityPost.updatedAt}</HeaderContent1>
                                <HeaderContent2>조회수 {communityPost.viewsCount} | 댓글 {communityPost.commentsCount} | 추천 {communityPost.likesCount}</HeaderContent2>
                            </ContentHeader>
                            {communityPost.nickname === userInfo.nickname &&
                                <ButtonContainer>
                                    <Link to={`/community/${communityPost.id}/edit`}><EditButton>수정</EditButton></Link>
                                    <DeleteButton onClick={() => openModal("deleteCommunity")}>삭제</DeleteButton>
                                </ButtonContainer>}
                        </InfoHeader>
                        <Dynamiccontent
                            dangerouslySetInnerHTML={{
                                __html: communityPost.content,
                            }}
                        />
                        {/* 댓글 작성 영역 */}
                        <FormWrapper onSubmit={postComment}>
                            <UsernameInput
                                type="text"
                                placeholder="댓글을 입력하세요."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Btn type="submit">전송</Btn>
                        </FormWrapper>

                        {getFilteredComments()?.length !== 0 &&
                            <CommentFilterBox>
                                <CommentFilterButton onClick={() => setFilterType("recent")}>최신순</CommentFilterButton>
                                <CommentFilterButton onClick={() => setFilterType("popular")}>인기순</CommentFilterButton>
                            </CommentFilterBox>
                        }
                        {/* 댓글 영역 */}
                        {getFilteredComments()?.map((comment, index) => (
                            <CommentBox key={index}>
                                <CommentHeader1>
                                    <TeamLogo src={comment.imageUrl} alt="이미지 없음" />
                                    <HeaderContent1>{comment.nickname} | {comment.createdAt}</HeaderContent1>
                                </CommentHeader1>
                                {!showEditForm[comment.id] &&
                                    <>
                                        <HeaderContent1>{comment.content}</HeaderContent1>
                                        {/* 댓글 좋아요 & 싫어요 영역 */}
                                        <GoodBox>
                                            <GoodBtn>
                                                <GoodComment src={ico_good} alt="이미지 없음" onClick={() => goodComment(comment)} />
                                            </GoodBtn>
                                            <HeaderContent1>{comment.likesCount}</HeaderContent1>
                                            <GoodBtn>
                                                <GoodComment src={ico_bad} alt="이미지 없음" onClick={() => hateComment(comment)} />
                                            </GoodBtn>
                                        </GoodBox>
                                    </>
                                }
                                {/* 댓글 수정 폼 */}
                                {showEditForm[comment.id] &&
                                    <FormWrapper onSubmit={(e) => editComment(e, comment)}>
                                        <UsernameInput
                                            type="text"
                                            placeholder="댓글을 입력하세요."
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        />
                                        <Btn type="submit">수정</Btn>
                                    </FormWrapper>
                                }
                                <ButtonContainer>
                                    {/* 자기가 쓴 댓글만 수정 삭제 */}
                                    {userInfo.nickname === comment.nickname &&
                                        <>
                                            <ReplyButton onClick={() => toggleEditForm(comment)}>댓글 수정</ReplyButton>
                                            <ReplyButton onClick={() => toggleDelete(comment)}>댓글 삭제</ReplyButton>
                                        </>
                                    }
                                    <ReplyButton onClick={() => toggleReplyForm(comment)}>답글 쓰기</ReplyButton>
                                    {/* 대댓글 작성 폼 */}
                                    {showReplyForm[comment.id] &&
                                        <FormWrapper onSubmit={(e) => postReply(e, comment)}>
                                            <UsernameInput
                                                type="text"
                                                placeholder="대댓글을 입력하세요."
                                                value={reply}
                                                onChange={(e) => setReply(e.target.value)}
                                            />
                                            <Btn type="submit">전송</Btn>
                                        </FormWrapper>
                                    }
                                </ButtonContainer>
                                {/* 대댓글 영역 */}
                                {comment.children && comment.children.map((reply) => (
                                    <CommentBox>
                                        <CommentHeader1>
                                            <TeamLogo src={reply.imageUrl} alt="이미지 없음" />
                                            <HeaderContent2>{reply.nickname} | {reply.createdAt}</HeaderContent2>
                                        </CommentHeader1>
                                        <HeaderContent1>{reply.content}</HeaderContent1>
                                        {/* 대댓글 좋아요 & 싫어요 영역 */}
                                        <GoodBox>
                                            <GoodBtn>
                                                <GoodComment src={ico_good} alt="이미지 없음" onClick={() => goodComment(reply)} />
                                            </GoodBtn>
                                            <HeaderContent1>{reply.likesCount}</HeaderContent1>
                                            <GoodBtn>
                                                <GoodComment src={ico_bad} alt="이미지 없음" onClick={() => hateComment(reply)} />
                                            </GoodBtn>
                                        </GoodBox>
                                    </CommentBox>
                                ))}
                                {/* 댓글 삭제 알림 모달 */}
                                {isOpen("deleteComment") &&
                                    <Modal onClose={() => closeModal("deleteComment")}>
                                        <TableTitle>댓글을 삭제하시겠습니까?</TableTitle>
                                        <ModalDelButton onClick={(e) => deleteComment(e)}>Delete</ModalDelButton>
                                    </Modal>
                                }
                            </CommentBox>
                        ))}
                    </MainContainer>
                )}
                {/* 커뮤니티 목록 영역 */}
                {/* <Communities communityList={communityList} addLike={addLike} /> */}
            </Wrapper >


            {/* 토스트 영역 */}
            {notifications.map((noti) => (
                <>
                    <Toast message={noti.message} />
                </>
            ))}

            {/* 모달 관리 */}
            {isOpen("dupLikeComment") &&
                <Modal onClose={() => closeModal("dupLikeComment")}>
                    <TableTitle>이미 공감한 댓글입니다.</TableTitle>
                </Modal>
            }
            {isOpen("likeComment") &&
                <Modal onClose={() => closeModal("likeComment")}>
                    <TableTitle>이 댓글을 좋아합니다.❤️</TableTitle>
                </Modal>
            }
            {isOpen("hateComment") &&
                <Modal onClose={() => closeModal("hateComment")}>
                    <TableTitle>이 댓글을 싫어합니다.</TableTitle>
                </Modal>
            }
            {isOpen("deleteCommunity") &&
                <Modal onClose={() => closeModal("deleteCommunity")}>
                    <TableTitle>게시글을 삭제하시겠습니까?</TableTitle>
                    <ModalDelButton onClick={(e) => deleteCommunity(e)}>Delete</ModalDelButton>
                </Modal>
            }
            {isOpen("comment") &&
                <Modal onClose={() => closeModal("comment")}>
                    <TableTitle>댓글 작성이 완료 되었습니다.</TableTitle>
                </Modal>
            }
            {isOpen("editComment") &&
                <Modal onClose={() => closeModal("editComment")}>
                    <TableTitle>댓글 수정이 완료 되었습니다.</TableTitle>
                </Modal>
            }
            {isOpen("like") &&
                <Modal onClose={() => closeModal("like")}>
                    <TableTitle>이 글을 좋아합니다.❤️</TableTitle>
                </Modal>
            }
            {isOpen("dupLike") &&
                <Modal onClose={() => closeModal("dupLike")}>
                    <TableTitle>이 글을 이미 좋아했습니다.</TableTitle>
                </Modal>
            }
            {isOpen("alertLogin") &&
                <Modal onClose={() => closeModal("alertLogin")}>
                    <TableTitle>로그인 후 이용해주세요</TableTitle>
                </Modal>
            }
        </>
    );
}

export default Community;
