import styled from "styled-components";
import { useEffect, useState } from "react";
import { ITeamImage } from "../types/api";
import { useNavigate } from "react-router-dom";

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

const Title = styled.span`
  font-size: 2.3rem;
  margin-top: 3rem;
`;

const FormWrapper = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
`;


const CheckInput = styled.div`
display:flex;
align-items: center;
gap: 2rem;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  background-color: #08ccac;
  color: #fff;
  margin: 1.5rem;
  border-radius: 0.7rem;
  padding: 2rem;
  font-size: 1.2rem;
  border: 1px solid #08ccac;
  cursor: pointer;
`;

const ImgSelectWrapper = styled.div`
  margin-top: 3rem;
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  height: 15rem;
  border-radius: 2rem;
`;

const SelectImg = styled.select`
  padding: 0.5rem;
  border-radius: 2rem;
`;

const LogImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: contain;
`;

const EditTeamimage = () => {
  const [teamImg, setTeamImg] = useState<ITeamImage[]>([]);
  const [myTeam, setMyTeam] = useState<ITeamImage>();
  const [myteamId, setMyteamId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://render-host-rw27.onrender.com/image/list`, {
        method: "GET",
        credentials: "include",
      }).then((data) => data);
      const json = await response.json();
      setTeamImg(json);
    })();
    (async () => {
      const response = await fetch(`https://render-host-rw27.onrender.com/image/${myteamId}`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      setMyTeam(json);
    })();
  }, [myteamId])

  const selectId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMyteamId(e.target.value);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageUrl = myTeam?.imageUrl;
    await fetch(`https://render-host-rw27.onrender.com/info/team`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
    navigate("/mypage");
  };

  return (
    <>
      <Wrapper>
        <Title>좋아하는 팀 수정</Title>
        <FormWrapper onSubmit={handleEdit}>
          <ImgSelectWrapper>
            <CheckInput>
              <SelectImg onChange={selectId}>
                <option value="">좋아하는 팀 선택</option>
                {[...teamImg].map((img) => (
                  <option key={img.id} value={img.id}>
                    {img.team}
                  </option>
                ))}
              </SelectImg>
              {myTeam && (
                <LogImg src={myTeam.imageUrl} />
              )}
            </CheckInput>
          </ImgSelectWrapper>
          <Btn type="submit">수정하기</Btn>
        </FormWrapper>
      </Wrapper>
    </>
  );
};

export default EditTeamimage;