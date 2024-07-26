import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/login_bg.png";
import { ReactComponent as DLlogo } from "../assets/designovel_icon_black.svg";
import SignupForm from "./SignupForm"; // SignupForm 컴포넌트 임포트

const LoginForm = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // 로컬 스토리지에서 토큰을 가져와 상태로 설정
  const [isRegister, setIsRegister] = useState(false); // 회원가입 폼 전환을 위한 상태
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    const username = e.target.loginUsername.value;
    const password = e.target.loginPassword.value;

    try {
      const response = await fetch("http://43.202.57.225:28282/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }), // 사용자 이름과 비밀번호를 백엔드로 전송
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token); // 토큰을 로컬 스토리지에 저장
        setToken(data.access_token); // 토큰 상태 업데이트
        setResult("Login successful: " + JSON.stringify(data, null, 2)); // 로그인 성공 메시지 설정
        navigate("/"); // 로그인 성공 시 메인 페이지로 이동
      } else {
        setResult("Login failed: " + JSON.stringify(data, null, 2)); // 로그인 실패 메시지 설정
      }
    } catch (error) {
      setResult("Login error: " + error.message); // 네트워크 오류 처리
    }
    setLoading(false); // 로딩 종료
  }, []);

  // const handleLogout = useCallback(() => {
  //   // 로그아웃 처리 함수
  //   localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
  //   setToken(""); // 토큰 상태 초기화
  //   setResult("Logged out"); // 로그아웃 메시지 설정
  // }, []);

  const handleRegisterSuccess = useCallback(() => {
    // 회원가입 성공 처리 함수
    setIsRegister(false); // 로그인 폼으로 전환
    setResult("회원가입 완료. 이제 로그인하세요."); // 회원가입 완료 메시지 설정
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-[780px] h-[550px] flex items-center justify-center rounded-xl shadow-xl overflow-hidden">
        <div
          className={`w-[50%] h-full flex flex-col items-center justify-center transition-all duration-200 ${
            isRegister ? "bg-white" : "bg-[#3A57A7]"
          }`}
        >
          {isRegister ? (
            <SignupForm
              onRegisterSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setIsRegister(false)}
            />
          ) : (
            <>
              <h2 className="text-2xl font-['pretendard-bold'] text-white">
                환영합니다!
              </h2>
              <p className="text-xl font-['pretendard-medium'] text-white pt-5 pb-5">
                로그인해서 패턴을 자유롭게 생성하세요!
              </p>
              <button
                onClick={() => setIsRegister(true)}
                className="mt-4 border-2 text-white font-['pretendard-medium'] py-2 px-12 rounded-lg"
              >
                회원가입
              </button>
            </>
          )}
        </div>
        <div
          className={`w-[50%] h-full flex flex-col items-center justify-center transition-all duration-200 ${
            isRegister ? "bg-[#3A57A7] relative" : "bg-white"
          }`}
        >
          {!isRegister && <DLlogo width="100" height="100" />}
          {!token ? (
            <>
              {!isRegister ? (
                <>
                  <h2 className="text-2xl font-['pretendard-bold'] text-center mb-8 text-black">
                    로그인
                  </h2>
                  <form
                    onSubmit={handleLogin}
                    className="flex flex-col items-center justify-center gap-4"
                  >
                    <div>
                      <input
                        type="text"
                        htmlFor="loginUsername"
                        id="loginUsername"
                        name="loginUsername"
                        required
                        className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
                        placeholder="Username"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        htmlFor="loginPassword"
                        id="loginPassword"
                        name="loginPassword"
                        required
                        className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
                        placeholder="Password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-4 bg-[#3A57A7] hover:bg-[#2c4383] text-white py-2 px-12 rounded-full font-['pretendard-medium']"
                    >
                      로그인
                    </button>
                  </form>
                </>
              ) : (
                <div></div>
              )}
              {isRegister && (
                <>
                  <h2 className="text-2xl font-['pretendard-bold'] text-white">
                    아직 계정이 없으신가요?
                  </h2>
                  <p className="text-xl font-['pretendard-medium'] text-white pt-5 pb-5">
                    가입 후 나만의 <br></br> 패턴 아카이브를 만들어보세요!
                  </p>
                  <button
                    onClick={() => setIsRegister(false)}
                    className="mt-4 border-2 text-white py-2 px-12 rounded-lg font-['pretendard-medium']"
                  >
                    로그인
                  </button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
