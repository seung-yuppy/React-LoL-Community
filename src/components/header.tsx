import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import img from "../assets/images/lol.png"
import useAuth from "../stores/useAuth";
import Modal from "./modal";
import LoginForm from "./loginForm";

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
  font-size: 3rem;
  padding: 7rem;
  text-align: center;
  color: #fff;
  background: url(${img}) no-repeat;
  background-size: cover;
  background-position: center;
`;

const Header = () => {
  const { isLogin, login, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false); // 로그인 모달 상태 관리

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/me`, {
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
    await fetch(`http://localhost:8080/logout`, {
      method: "POST",
      credentials: "include",
    });
    logout();
    navigate("/");
  };

  return (
    <>
      <Gnb>
        <Itemlist>
          <Item><Link to="/">HOME</Link></Item>
          {!isLogin ?
            <Item onClick={() => setShowLoginModal(true)}>
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
      <HomeTitle>Welcome LoL Commnuity</HomeTitle>

      {/* 모달 관리 */}
      {showLoginModal &&
        <Modal onClick={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      }
    </>
  );
}

export default Header;
