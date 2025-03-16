import styled from "styled-components";
// import Chat from "../components/chat";
import Communities from "../components/communities";
import SideMenu from "../components/sideMenu";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
`;

const Home = () => {
    return (
        <>
            <Wrapper>
                <SideMenu />
                <Communities />
                {/* <Chat /> */}
            </Wrapper >
        </>
    );
}

export default Home;