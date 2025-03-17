import styled from "styled-components";
import LoginForm from "../components/loginForm";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 3rem;
`;

const Login = () => {
    return (
        <Wrapper>
            <LoginForm />
        </Wrapper>
    );
}

export default Login;
