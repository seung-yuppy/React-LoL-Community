import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50rem;
    width: 55rem;
`;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 42rem;
    padding: 1rem 2rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
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