import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BG_pattern from "../assets/home_empty_ver.png";

function Main() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#F2F2F2] h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start p-8"
      style={{ backgroundImage: `url(${BG_pattern})` }}
    >
      <h1 className="text-6xl font-['pretendard-black'] text-left pl-20">
        세상의 모든 원단 디자인, 디자이노블에서
      </h1>
      <p className="text-2xl text-left font-['pretendard-medium'] pl-20 pt-10">
        AI와 함께 원하는 디자인 손쉽게 완성!
      </p>
      <p className="text-2xl text-left font-['pretendard-medium'] pl-20">
        지금 바로 만들어보세요
      </p>
      <div className="flex space-x-4 mt-4 pl-20 pt-10">
        <button
          className="text-2xl bg-[#5E71A6] hover:bg-blue-900 text-white font-['pretendard-semibold'] py-5 px-16 rounded-xl mr-4"
          onClick={() => navigate("/CreateImage")}
        >
          지금 만들어보기
        </button>
        <button
          className="text-2xl bg-[#809DEC] hover:bg-[#5E71A6] text-white font-['pretendard-semibold'] py-5 px-24 rounded-xl"
          onClick={() => navigate("/Login")}
        >
          내 디자인
        </button>
      </div>
    </div>
  );
}

export default Main;
