import React, { useCallback, useState } from "react";
import { ReactComponent as DLlogo } from "../assets/designovel_icon_black.svg";

const SignupForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      setPasswordErrorMessage("");
      setUsernameErrorMessage("");
      setEmailErrorMessage("");

      const username = e.target.registerUsername.value;
      const email = e.target.registerEmail.value;
      const password = e.target.registerPassword.value;
      const confirmPassword = e.target.confirmPassword.value;

      // 입력한 비밀번호가 동일한 지 확인
      if (password !== confirmPassword) {
        setPasswordErrorMessage("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 이메일 유효성
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailErrorMessage("유효한 이메일 주소를 입력하세요.");
        return;
      }

      // 회원가입 유저 정보 보내기
      try {
        const response = await fetch("http://118.67.128.129:28282/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ username, password, email }),
        });

        const data = await response.json();
        if (response.ok) {
          onRegisterSuccess();
        } // 중복 아이디 처리
        else if (data.detail === "Username already registered") {
          setUsernameErrorMessage("중복된 아이디입니다.");
        } // 중복 이메일 처리
        else if (data.detail === "Email already registered") {
          setEmailErrorMessage("중복된 이메일입니다.");
        } else {
          console.error("Registration failed: ", data);
        }
      } catch (error) {
        console.error("Registration error: ", error);
      }
    },
    [onRegisterSuccess]
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <DLlogo width="100" height="100" className="mb-8" />
      <h2 className="text-2xl font-['pretendard-bold'] text-center mb-8 text-black">
        회원가입
      </h2>
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div>
          <input
            type="text"
            htmlFor="registerUsername"
            id="registerUsername"
            name="registerUsername"
            required
            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
            placeholder="Id"
          />
          {usernameErrorMessage && (
            <p className="text-red-500 font-['pretendard-medium'] text-sm mt-1">
              {usernameErrorMessage}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            htmlFor="registerEmail"
            id="registerEmail"
            name="registerEmail"
            required
            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
            placeholder="Email"
          />
          {emailErrorMessage && (
            <p className="text-red-500 font-['pretendard-medium'] text-sm mt-1">
              {emailErrorMessage}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            htmlFor="registerPassword"
            id="registerPassword"
            name="registerPassword"
            required
            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="password"
            htmlFor="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            required
            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
            placeholder="Confirm Password"
          />
          {passwordErrorMessage && (
            <p className="text-red-500 font-['pretendard-medium'] text-sm mt-1">
              {passwordErrorMessage}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#3A57A7] hover:bg-[#2c4383] text-white py-2 px-12 rounded-full font-['pretendard-medium']"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
