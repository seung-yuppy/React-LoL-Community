import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../stores/useAuth";
import IUser from "../types/user";
import Modal from "../components/modal";
import IUserInfo from "../types/userInfo";
import IContent from "../types/content";
import IComment from "../types/comment";
import ico_arrow_turn_down from "../images/ico_arrow_turn_down.svg";
import SideMenu from "../components/sideMenu";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50rem;
    width: 60rem;
    border: 1px solid #333;
    border-radius: 1rem;
    overflow: scroll;
`;

const Title = styled.h2`
    font-size: 2.3rem;
    margin-top: 3rem;
`;

const Container = styled.div`
    display: flex;
    gap: 3rem;
`;

const EmailBox = styled.fieldset`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border: 1px solid gray;
    padding: 1rem 3rem;
    border-radius: 1rem;
`;

const EmailLegend = styled.legend``;

const InfoBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.5rem;
    gap: 1.5rem;
    padding: 2rem;
`;

const Info = styled.h1`
    font-size: 1.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 2rem;
    padding: 1rem;
`;

const SelectButton = styled.button`
    padding: 1rem;
    width: 15rem;
    border-radius: 1rem;
    color: #fff;
    font-size: 1.2rem;
    background-color: #08ccac;
    border: 1px solid #08ccac;
    cursor: pointer;
`;

const LogoutButton = styled(SelectButton)`
    background-color: crimson;
    border: 1px solid crimson;
`;

const ImgItem = styled.img`
    width: 20rem;
    height: 10rem;
    object-fit: contain;
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

const MyBox = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid gray;
    padding: 1rem 3rem;
    height: 20rem;
    border-radius: 1rem;
    overflow-y: scroll;
`

const MyItem = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MyItemList = styled.li`
    font-size: 1.3rem;
    list-style-type: circle;
    line-height: 1.5rem;
`;

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ItemTitle = styled.h2`
    font-size: 1.3rem;
`;

const ItemContent = styled.p`
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    gap: 0.5rem;
`;

const CommentImage = styled.img`
    cursor:pointer;
    width: 2rem;
    object-fit: cover;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState<IUser>(); // 유저 기본 정보
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(); // 유저 상세 정보
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false); // 탈퇴 알림 모달 상태 관리
  const [myCommunity, setMyCommunity] = useState<IContent[]>([]); // 내가 쓴 글 목록
  const [myComment, setMyComment] = useState<IComment[]>([]); // 내가 쓴 댓글 목록

  useEffect(() => {
    // 유저 기본 정보 불러오기
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/mypage`, {
          method: "GET",
          credentials: "include",
        });
        if (!response) {
          throw new Error("API 연결 오류");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("로그인 후 기본 유저 정보 불러오기 실패", error);
      }
    };
    // 유저 상세 정보 불러오기(닉네임 생성 & myTeam 생성 이후)
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/info`, {
          method: "GET",
          credentials: "include",
        });
        const infoData = await response.json();
        console.log(infoData);
        setUserInfo(infoData);
      } catch (error) {
        console.error("유저 상세 정보 불러오기 실패", error);
      }
    };
    // 내가 쓴 글 불러오기
    const fetchMyCommunity = async () => {
      try {
        const response = await fetch(`http://localhost:8080/community/my`, {
          method: "GET",
          credentials: "include",
        })
        const data = await response.json();
        setMyCommunity(data);
      } catch (error) {
        console.error("내가 쓴 글 불러오기 실패", error);
      }
    };
    // 내가 쓴 댓글 목록
    const fetchMyComment = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comment/my`, {
          method: "GET",
          credentials: "include",
        })
        const data = await response.json();
        setMyComment(data);
      } catch (error) {
        console.error("내가 쓴 댓글 불러오기 실패", error);
      }
    }
    fetchUser();
    fetchUserInfo();
    fetchMyCommunity();
    fetchMyComment();
  }, []);

  // 탈퇴 버튼 누르면 모달창 생성
  const handleDelModal = () => {
    setShowRemoveModal(true);
  };

  // 탈퇴 처리(닉네임&myteam 생성 유저 전용)
  const handleDelete = async () => {
    await fetch(`http://localhost:8080/info`, {
      method: "DELETE",
      credentials: "include",
    });
    await fetch(`http://localhost:8080/logout`, {
      method: "POST",
      credentials: "include",
    });
    logout();
    navigate("/");
  };

  return (
    <>
      <SideMenu />
      <Wrapper>
        <Title>{user?.name}님, 안녕하세요!</Title>
        {/* 유저 정보 영역 */}
        <Container>
          <InfoBox>
            {userInfo &&
              <>
                <EmailBox>
                  <EmailLegend>이메일</EmailLegend>
                  <Info>{user?.email}</Info>
                </EmailBox>
                <EmailBox>
                  <EmailLegend>닉네임</EmailLegend>
                  <Info>{userInfo?.nickname}</Info>
                </EmailBox>
                <EmailBox>
                  <EmailLegend>포인트 & 경험치</EmailLegend>
                  <Info>{userInfo?.point} Point</Info>
                  <Info>LV. {userInfo?.level} [{userInfo?.exp} EXP]</Info>
                </EmailBox>
                <EmailBox>
                  <EmailLegend>My Team</EmailLegend>
                  <ImgItem src={userInfo?.imageUrl} />
                </EmailBox>
                <MyBox>
                  <EmailLegend>내가 쓴 글</EmailLegend>
                  <MyItem>
                    {myCommunity.map((community) => (
                      <MyItemList key={community.id}>
                        <Link to={`/community/${community.id}`}>{community.title}</Link>
                      </MyItemList>
                    ))}
                  </MyItem>
                </MyBox>
                <MyBox>
                  <EmailLegend>내가 쓴 댓글</EmailLegend>
                  <MyItem>
                    {myComment.map((comment) => (
                      <MyItemList key={comment.id}>
                        <Link to={`/community/${comment.communityId}`}>
                          <ItemBox>
                            <ItemTitle>{comment.communityTitle}</ItemTitle>
                            <ItemContent><CommentImage src={ico_arrow_turn_down} />{comment.content}</ItemContent>
                          </ItemBox>
                        </Link>
                      </MyItemList>
                    ))}
                  </MyItem>
                </MyBox>
              </>
            }
          </InfoBox>
        </Container>

        {/* 버튼 영역 */}
        <ButtonContainer>
          {!userInfo && <Link to={'/mypage/userinfo'}><SelectButton>닉네임 정하기</SelectButton></Link>}
          {userInfo &&
            <>
              <Link to={'/mypage/editnickname'}><SelectButton>닉네임 수정하기</SelectButton></Link>
              <Link to={'/mypage/editteamimage'}><SelectButton>이미지 수정하기</SelectButton></Link>
            </>
          }
          {userInfo && <LogoutButton onClick={handleDelModal}>탈퇴하기</LogoutButton>}
        </ButtonContainer>
      </Wrapper >

      {/* 모달 관리 */}
      {showRemoveModal &&
        <Modal onClose={() => setShowRemoveModal(false)}>
          <Title>회원 탈퇴를 하시겠습니까? 계정 복구는 불가합니다.</Title>
          <ModalDelButton onClick={handleDelete}>탈퇴하기</ModalDelButton>
        </Modal>
      }
    </>
  );
}

export default MyPage;
