import React from "react";
import logo from "../assets/logo.png";
import background from "../assets/login_bg.png";
import deco from "../assets/login_deco.png";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
          <h2 className="text-2xl font-['pretendard-extrabold'] text-center mb-8 text-black">
            로그인
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-4"
          >
            <button
              type="submit"
              className="mt-4 bg-[#ffffff] hover:bg-gray-100 text-black font-['pretendard-medium'] py-2 px-12 rounded-full transition duration-200 border border-[#3A57A7]"
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
