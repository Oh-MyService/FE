import React, { useCallback } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate(token ? "/my-page" : "/login");
  };

  const goToMain = () => {
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
  }, [setToken, goToLogin]);

  return (
    <header className="bg-neutral-800 py-3 fixed top-0 w-full z-10 h-16 font-[pretendard-medium]">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center mt-2">
          <img
            src={logo}
            alt="Logo"
            className="h-5 cursor-pointer"
            onClick={goToMain}
          />
        </div>
        <div className="flex-1 flex justify-end items-center mt-2 space-x-4">
          <button
            onClick={goToMyPage}
            aria-label="My Page"
            className="text-white cursor-pointer hover:underline"
            style={{ transform: "translateY(2px)" }}
          >
            마이페이지
          </button>
          <div className="text-white pt-1 hidden sm:block">|</div>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-white hover:underline"
              style={{ transform: "translateY(2px)" }}
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={goToLogin}
              className="text-white hover:underline"
              style={{ transform: "translateY(2px)" }}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
