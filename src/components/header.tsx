import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import img from "../images/lol.png"
import useAuth from "../stores/useAuth";
import Modal from "./modal";
import LoginForm from "./loginForm";
import useModal from "../hooks/useModal";

const Gnb = styled.nav`
  padding:1rem 2rem;
  background-color: #08ccac;
`;

const Itemlist = styled.ul`
  display: flex;
  align-items: center;
  gap: 5rem;
  margin-left: 10rem;
`;

const Item = styled.li`
  font-size: 1rem;
  color: #fff;
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    color: #8a6d3b;
  }
`;

const HomeTitle = styled.div`
  padding: 10rem 7rem;
  background: url(${img}) no-repeat;
  background-size: cover;
`;

const InfoTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, login, logout } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch(`https://render-host-rw27.onrender.com/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        await response.json();  // 로그인과 로그아웃 처리를 위해 반드시 필요함(유저정보)
        login();
      } catch (error) {
        console.error("로그아웃", error);
        logout();
      }
    };
    fetchAuth();
  }, [isLogin, login, logout]);

  // 로그아웃
  const onLogout = async () => {
    try {
      await fetch(`https://render-host-rw27.onrender.com/logout`, {
        method: "POST",
        credentials: "include",
      });
      logout();
      openModal("logout");
    } catch (error) {
      console.error("로그아웃 오류", error);
    }
  };

  return (
    <>
      <Gnb>
        <Itemlist>
          <Item><Link to="/0">HOME</Link></Item>
          {!isLogin ?
            <Item onClick={() => openModal("loginForm")}>
              LOG IN
            </Item> :
            <>
              <Item>
                <Link to="/mypage">MY PAGE</Link>
              </Item>
              <Item onClick={onLogout}>LOG OUT</Item>
            </>
          }
        </Itemlist>
      </Gnb >
      <HomeTitle />

      {/* 모달 관리 */}
      {isOpen("loginForm") &&
        <Modal onClose={() => closeModal("loginForm")}>
          <LoginForm />
        </Modal>
      }
      {isOpen("logout") &&
        <Modal onClose={() => { closeModal("logout"); navigate("/0") }}>
          <InfoTitle>로그아웃이 완료되었습니다.</InfoTitle>
        </Modal>
      }
    </>
  );
}

export default Header;
