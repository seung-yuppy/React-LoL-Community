import styled from "styled-components";

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

const TableTitle = styled.h2`
    font-size:1.5rem;
    font-weight: bold;
`;

const NoLogin = () => {
  return (
    <>
      <Wrapper>
        <MainContainer>
          <TableTitle>로그인 후 이용해주세요.</TableTitle>
        </MainContainer>
      </Wrapper>
    </>
  );
};

export default NoLogin;