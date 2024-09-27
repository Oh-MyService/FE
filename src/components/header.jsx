import React, { useCallback, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (location.pathname === "/create-image") {
      setActiveTab("pattern");
    } else if (
      location.pathname === "/my-page" ||
      location.pathname === "/recent-generation" ||
      location.pathname === "/my-collection" ||
      location.pathname.startsWith("/collection/")
    ) {
      setActiveTab("mypage");
    } else {
      setActiveTab("");
    }
  }, [location.pathname]);

  const goToMyPage = () => {
    navigate("/my-page");
  };

  const goToMain = () => {
    setActiveTab("");
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToCreateImage = () => {
    navigate("/create-image");
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("results");
    setToken("");
    goToLogin();
  }, [setToken, goToLogin]);

  return (
    <header className="bg-neutral-800 py-4 fixed top-0 w-full z-10 h-16 font-[pretendard-medium] text-lg drop-shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-10">
          <img
            src={logo}
            alt="Logo"
            className="h-5 cursor-pointer"
            onClick={goToMain}
          />
          <button
            onClick={goToCreateImage}
            className="text-white cursor-pointer relative"
          >
            패턴 생성
            {activeTab === "pattern" && (
              <div className="absolute bottom-[-20px] left-0 w-full h-[5px] bg-white"></div>
            )}
          </button>
          <button
            onClick={goToMyPage}
            className="text-white cursor-pointer relative"
          >
            마이페이지
            {activeTab === "mypage" && (
              <div className="absolute bottom-[-20px] left-0 w-full h-[5px] bg-white"></div>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={token ? handleLogout : goToLogin}
            className="text-white hover:underline"
            style={{ transform: "translateY(2px)" }}
          >
            {token ? "로그아웃" : "로그인"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
