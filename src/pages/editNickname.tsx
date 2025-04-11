import styled from "styled-components";
import SideMenu from "../components/sideMenu";
import { useState } from "react";
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

const UsernameInput = styled.input`
  height: 2.5rem;
  width: 15rem;
  padding: 1rem;
  border-radius: 1rem;
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

const DupBtn = styled(Btn)`
  width: 7rem;
  height: 2rem;
  padding: 1.3rem;
  font-size: 1rem;
`;

const Message = styled.h2`
  color: crimson;
`;

const EditNickname = () => {
  const [nickname, setNickname] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const checkDuplicate = async () => {
    const response = await fetch(`http://localhost:8080/check/${nickname}`, { credentials: "include", });
    const data = await response.json();
    setMsg(data.message);
    return data.available;
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/info`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname }),
    });
    navigate("/mypage");
  };
  return (
    <>
      <SideMenu />
      <Wrapper>
        <Title>닉네임 수정</Title>
        <FormWrapper onSubmit={handleEdit}>
          <CheckInput>
            <UsernameInput
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <DupBtn type="button" onClick={checkDuplicate}>중복체크</DupBtn>
          </CheckInput>
          <Message>{msg}</Message>
          <Btn type="submit">수정하기</Btn>
        </FormWrapper>
      </Wrapper>
    </>
  );
};

export default EditNickname;