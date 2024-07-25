import React, { useCallback } from "react";
import { ReactComponent as DLlogo } from "../assets/designovel_icon_black.svg";

const SignupForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      const username = e.target.registerUsername.value;
      const password = e.target.registerPassword.value;

      try {
        const response = await fetch("http://43.202.57.225:28282/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          onRegisterSuccess();
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
            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:border-[#3A57A7] font-['pretendard-medium']"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            htmlFor="registerPassword"
            id="registerPassword"
            name="registerPassword"
            required
            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:border-[#3A57A7] font-['pretendard-medium']"
            placeholder="Password"
          />
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
