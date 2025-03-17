import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
`;

const InfoTitle = styled.h2`
    font-size: 3rem;
    font-weight: bold;
    padding: 1rem 0;
`;

const ErrorComponent = () => {
  return (
    <Wrapper>
      <InfoTitle>Error Component 404</InfoTitle>
    </Wrapper>
  );
}

export default ErrorComponent;
