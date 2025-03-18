import styled from "styled-components";
import { ITeamImage } from "../types/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50rem;
  width: 60rem;
  border: 1px solid #333;
  border-radius: 1rem;
`;

const Title = styled.span`
  font-size: 2rem;
  padding: 3rem;
`;

const FormWrapper = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 1rem;
`;

const ImgSelectWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 1rem;
  width: 25rem;
  height: 15rem;
`;

const CheckInput = styled.div`
  display:flex;
  align-items: center;
  gap: 2rem;
`;

const UsernameInput = styled.input`
  height: 2.5rem;
  width: 15rem;
  padding: 1rem;
  border-radius: 2rem;
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17rem;
  background-color: #08ccac;
  color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 1.3rem;
  border: 1px solid #08ccac;
  cursor: pointer;
`;

const LogImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
`;

const SelectImg = styled.select`
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
  padding: 0.5rem;
  border-radius: 2rem;
`;

const SelectOption = styled.option``;

const SelectWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

function SelectUserInfo() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [teamImg, setTeamImg] = useState<ITeamImage[]>([]);
  const [myTeam, setMyTeam] = useState<ITeamImage | null>(null);
  const [myteamId, setMyteamId] = useState<string>("");
  const [showDupModal, setShowDupModal] = useState<boolean>(false); // 중복 경고 모달 상태 관리
  const [showComModal, setShowComModal] = useState<boolean>(false); // 닉네임 완료 모달 상태 관리

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/image/list`, {
        method: "GET",
        credentials: "include",
      }).then((data) => data);
      const json = await response.json();
      setTeamImg(json);
    })();

    (async () => {
      const response = await fetch(`http://localhost:8080/image/${myteamId}`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      setMyTeam(json);
    })();
  }, [myteamId]);

  const writeNickname = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const imageUrl = myTeam?.imageUrl;
      const response = await fetch(`http://localhost:8080/check/${nickname}`, {
        method: "GET",
        credentials: "include",
      });
      const status = response.status;
      if (status === 409) {
        setShowDupModal(true);
      } else if (status === 200) {
        await fetch(`http://localhost:8080/info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname, imageUrl }),
          credentials: "include",
        });
        setShowComModal(true);
        // userInfo가 서버에 들어간걸 클라이언트에 인식하기 위해 새로고침 필요
      }
    } catch (error) {
      console.error("닉네임 또는 팀 설정 실패", error);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>닉네임 & 응원팀 정하기</Title>
        <FormWrapper onSubmit={writeNickname}>
          <SelectWrapper>
            <InputWrapper>
              <CheckInput>
                <UsernameInput
                  placeholder="멋진 닉네임을 작성해주세요!"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </CheckInput>
            </InputWrapper>
            <ImgSelectWrapper>
              <CheckInput>
                {myTeam && (
                  <LogImg src={myTeam.imageUrl} />
                )}
                <SelectImg onChange={(e) => setMyteamId(e.target.value)}>
                  <SelectOption value="">팀을 선택해주세요</SelectOption>
                  {[...teamImg].map((img) => (
                    <SelectOption key={img.id} value={img.id}>
                      {img.team}
                    </SelectOption>
                  ))}
                </SelectImg>
              </CheckInput>
            </ImgSelectWrapper>
          </SelectWrapper>
          <Btn type="submit">등록하기</Btn>
        </FormWrapper>
      </Wrapper >

      {/* 모달 관리 */}
      {
        showDupModal &&
        <Modal onClick={() => setShowDupModal(false)}>
          <Title>중복된 닉네임 입니다. 다시 닉네임을 입력해주세요.</Title>
        </Modal>
      }
      {
        showComModal &&
        <Modal onClick={() => { setShowComModal(false); navigate("/mypage"); window.location.reload(); }}>
          <Title>{nickname}님 가입을 축하드립니다!</Title>
        </Modal>
      }
    </>
  );
}

export default SelectUserInfo;
