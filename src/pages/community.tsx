import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import IContent from "../types/content";
import Communities from "../components/communities";
import Modal from "../components/modal";
import IComment from "../types/comment";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 63rem;
    height: 50rem;
    overflow-y: scroll;
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
    border-bottom:1px solid lightgray;
    padding: 1rem;
`;

const TableTitle = styled.h2`
    font-size:1.5rem;
    font-weight: bold;
`;

const ReplyButton = styled.button`
    font-size: 1rem;
`;

const Community = () => {
    const { communityId } = useParams();    // 상세페이지 들어오기 위한 params
    const [showAlertModal, setShowAlertModal] = useState<boolean>(false); // 로그인 경고창 모달 상태 관리
    const [showLikeModal, setShowLikeModal] = useState<boolean>(false); // 좋아요 경고창 모달 상태 관리
    const [showDupLikeModal, setShowDupLikeModal] = useState<boolean>(false); // 이미 좋아요 누른 경고창 모달 상태 관리
    const [communityPost, setCommunityPost] = useState<IContent>(); // 커뮤니티 글 한개
    const [communityList, setCommunityList] = useState<IContent[]>([]); // 커뮤니티 리스트 상태 관리
    const [content, setContent] = useState<string>(""); // 댓글 작성
    const [commentList, setCommentList] = useState<IComment[]>([]); // 커뮤니티 글 한개의 댓글 목록
    const [showCommentModal, setShowCommentModal] = useState<boolean>(false);   // 댓글 작성 완료 모달 관리
    const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({}); // 대댓글 작성 폼 상태 관리
    const [reply, setReply] = useState<string>(""); // 대댓글 작성
    const [parentId, setParentId] = useState<number>(); // 대댓글 작성을 위한 댓글의 id

    useEffect(() => {
        // 커뮤니티 글 한 개 데이터 불러오기
        const fetchCommunity = async () => {
            const response = await fetch(
                `http://localhost:8080/community/${communityId}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            setCommunityPost(data);
        };
        // 커뮤니티 리스트 불러오기
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
        // 댓글 목록 불러오기
        const fetchComment = async () => {
            try {
                const response = await fetch(`http://localhost:8080/${communityId}/comment`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                console.log(data);
                setCommentList(data);
            } catch (error) {
                console.error("댓글 불러오기 오류", error)
            }
        }
        fetchCommunity();
        fetchData();
        fetchComment();
    }, [communityId, showCommentModal, showLikeModal]);

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
            } else if (data === "이 글을 좋아합니다.") {
                setShowLikeModal(true);
            } else {
                setShowAlertModal(true);
            }
        } catch (error) {
            console.error("좋아요 실패", error);
        }
    };

    // 댓글 작성
    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8080/${communityId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
                credentials: "include",
            });
            setShowCommentModal(true);
            setContent("");
        } catch (error) {
            console.error("댓글 입력 실패", error);
        }
    };

    // 대댓글 폼 열기
    const toggleReplyForm = (commentId: number) => {
        setShowReplyForm((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // 해당 댓글 ID의 상태만 토글
        }));
        setParentId(commentId);
    };

    // 대댓글 작성
    const postReply = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const content = reply;
            await fetch(`http://localhost:8080/${communityId}/${parentId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
                credentials: "include",
            })
            setShowCommentModal(true);
            setReply("");
        } catch (error) {
            console.error("대댓글 입력 실패", error);
        }
    };

    return (
        <>
            <Wrapper>
                {communityPost && (
                    <MainContainer key={communityPost.id}>
                        <Title>{communityPost.title}</Title>
                        <ContentHeader>
                            <HeaderContent1>{communityPost.nickname} | {communityPost.updatedAt}</HeaderContent1>
                            <HeaderContent2>조회수 {communityPost.viewsCount} | 댓글 {communityPost.commentsCount} | 추천 {communityPost.likesCount}</HeaderContent2>
                        </ContentHeader>
                        <Dynamiccontent
                            dangerouslySetInnerHTML={{
                                __html: communityPost.content,
                            }}
                        />
                        <FormWrapper onSubmit={postComment}>
                            <UsernameInput
                                type="text"
                                placeholder="댓글을 입력하세요."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Btn type="submit">전송</Btn>
                        </FormWrapper>
                        {commentList.map((comment) => (
                            <CommentBox>
                                <HeaderContent1>{comment.nickname} | {comment.createdAt}</HeaderContent1>
                                <HeaderContent1>{comment.content} | <ReplyButton onClick={() => toggleReplyForm(comment.id)}>답글 쓰기</ReplyButton></HeaderContent1>
                                {comment.children && comment.children.map((reply) => (
                                    <>
                                        <CommentBox>
                                            <HeaderContent2>{reply.nickname} | {reply.createdAt}</HeaderContent2>
                                            <HeaderContent1>{reply.content}</HeaderContent1>
                                        </CommentBox>
                                    </>
                                ))}
                                {showReplyForm[comment.id] &&
                                    <FormWrapper onSubmit={postReply}>
                                        <UsernameInput
                                            type="text"
                                            placeholder="대댓글을 입력하세요."
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                        />
                                        <Btn type="submit">전송</Btn>
                                    </FormWrapper>}
                            </CommentBox>
                        ))}
                    </MainContainer>
                )}
                <Communities communityList={communityList} addLike={addLike} />
            </Wrapper >

            {/* 모달 관리 */}
            {showCommentModal &&
                <Modal onClick={() => setShowCommentModal(false)}>
                    <TableTitle>댓글 작성이 완료 되었습니다.</TableTitle>
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
            {showAlertModal &&
                <Modal onClick={() => setShowAlertModal(false)}>
                    <TableTitle>로그인 후 이용해주세요</TableTitle>
                </Modal>
            }
        </>

    );
}

export default Community;
