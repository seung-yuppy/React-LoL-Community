import { Outlet } from "react-router-dom";
import Header from "./components/header";
import styled from "styled-components";
import Chat from "./components/chat";
import SideMenu from "./components/sideMenu";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
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