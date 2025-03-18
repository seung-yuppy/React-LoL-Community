import { Outlet } from "react-router-dom";
import Header from "./components/header";
import styled from "styled-components";
import SideMenu from "./components/sideMenu";
import Chat from "./components/chat";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
`;

const App = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <SideMenu />
        <Outlet />
        <Chat />
      </Wrapper>
    </>
  );
};

export default App;