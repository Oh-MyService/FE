import React, { useEffect } from "react";
import background from "../assets/login_bg.png";
import deco from "../assets/login_deco.png";
import { ReactComponent as DLlogo } from "../assets/designovel_icon_black.svg";

const LoginForm = () => {
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("구글 로그인 버튼 클릭");

    window.location.href = "http://43.202.57.225:25252/login";
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://43.202.57.225:25252/user_info");
        if (response.ok) {
          const data = await response.json();
          console.log("User Info:", data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-[780px] h-[550px] flex items-center justify-center rounded-lg shadow-lg">
        <div className="w-[50%] h-full">
          <img src={deco} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="bg-white w-[50%] h-full flex flex-col items-center justify-center">
          <DLlogo width="100" height="100" />
          <h2 className="text-2xl font-['pretendard-extrabold'] text-center mb-8 text-black">
            로그인
          </h2>
          <form className="flex flex-col items-center justify-center gap-4">
            <button
              type="submit"
              className="mt-4 bg-[#ffffff] hover:bg-gray-100 text-black font-['pretendard-medium'] py-2 px-12 rounded-full transition duration-200 border border-[#3A57A7]"
              onClick={handleLoginSubmit}
            >
              구글로 로그인
            </button>
          </form>
          <div className="text-center mt-12">
            <a
              href="https://support.google.com/accounts/answer/27441?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black font-['pretendard-medium'] hover:underline"
            >
              회원이 아니신가요? 구글 회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
