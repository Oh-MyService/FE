import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    // 로그인 로직을 추가하세요.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] h-[500px]">
        <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-400 mb-3"
              placeholder="이메일 주소"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              이메일
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-400 mb-3"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              비밀번호
            </label>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-1">
              <input type="checkbox" id="remember-me" className="w-4 h-4" />
              <label htmlFor="remember-me" className="text-sm text-gray-500">
                이메일 저장
              </label>
            </div>
            <a href="#!" className="text-sm text-blue-600 hover:underline">
              비밀번호 찾기
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
            >
              구글로 로그인
            </button>
            <button
              type="button"
              className="bg-[#1ec800] hover:bg-[#1db700] text-white font-bold py-2 px-4 rounded-full transition duration-200"
            >
              네이버로 로그인
            </button>
            <button
              type="button"
              className="bg-[#FEE500] hover:bg-[#ECD400] text-black font-bold py-2 px-4 rounded-full transition duration-200"
            >
              카카오로 로그인
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <Link
            to="/SignupForm"
            className="text-sm text-gray-500 hover:underline"
          >
            회원이 아니신가요? 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
