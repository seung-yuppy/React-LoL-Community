import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../stores/useAuth";
import IUser from "../types/user";
import Modal from "../components/modal";
import IUserInfo from "../types/userInfo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 1.5rem 3rem;
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

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState<IUser>(); // 유저 기본 정보
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(); // 유저 상세 정보
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false); // 탈퇴 알림 모달 상태 관리

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
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("유저 상세 정보 불러오기 실패", error);
      }
    };
    fetchUser();
    fetchUserInfo();
  }, []);

  // 닉네임 정하기(초기유저 전용)
  const gotoUserInfo = () => {
    navigate("/mypage/nickname");
  };

  // 탈퇴 버튼 누르면 모달창 생성
  const handleDelModal = () => {
    setShowRemoveModal(true);
  }

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
    navigate("/login");
  };

  // 닉네임 변경(닉네임&myteam 생성 유저 전용)
  const gotoNickNameEdit = () => {
    navigate("/mypage/edit/nickname");
  };

  // 팀 이미지 변경(닉네임&myteam 생성 유저 전용)
  const gotoImageEdit = () => {
    navigate("/mypage/edit/image")
  };

  return (
    <Wrapper>
      {showRemoveModal &&
        <Modal onClick={() => setShowRemoveModal(false)}>
          <Title>회원 탈퇴를 하시겠습니까? 계정 복구는 불가합니다.</Title>
          <ModalDelButton onClick={handleDelete}>탈퇴하기</ModalDelButton>
        </Modal>
      }
      <Title>{user?.name}님, 안녕하세요!</Title>
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
            </>
          }
        </InfoBox>
      </Container>
      <ButtonContainer>
        {!userInfo && <SelectButton onClick={gotoUserInfo}>닉네임 정하기</SelectButton>}
        {userInfo && <SelectButton onClick={gotoNickNameEdit}>닉네임 수정하기</SelectButton>}
        {userInfo && <SelectButton onClick={gotoImageEdit}>이미지 수정하기</SelectButton>}
        {(user && userInfo) && <LogoutButton onClick={handleDelModal}>탈퇴하기</LogoutButton>}
      </ButtonContainer>

    </Wrapper >
  );
}

export default MyPage;
