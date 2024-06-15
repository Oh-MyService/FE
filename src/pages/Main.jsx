import React from "react";
import { useNavigate } from "react-router-dom";
import BG_pattern from "../assets/home_empty_ver.png";

const images1 = [
  "slider1.jpg",
  "slider2.png",
  "slider3.png",
  "slider10.jpg",
  "slider1.jpg",
  "slider2.png",
  "slider3.png",
  "slider10.jpg",
];

const images2 = [
  "slider5.webp",
  "slider6.webp",
  "slider11.webp",
  "slider8.jpg",
  "slider5.webp",
  "slider6.webp",
  "slider11.webp",
  "slider8.jpg",
];

const slideStyles = {
  width: "220px",
  height: "220px",
  margin: "10px 0",
  padding: "10px",
  objectFit: "cover",
  borderRadius: "20px",
};

const containerStyles = {
  position: "absolute",
  top: "50%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  height: "900px",
  overflow: "hidden",
};

const sliderStyles = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
};

const slider1Styles = {
  ...sliderStyles,
  right: "260px",
  animation: "slidedown 15s linear infinite",
};

const slider2Styles = {
  ...sliderStyles,
  right: "-10px",
  animation: "slideup 15s linear infinite",
};

const keyframes = `
@keyframes slidedown {
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0%); }
}

@keyframes slideup {
  0% { transform: translateY(0%); }
  100% { transform: translateY(-50%); }
}
`;

function Main() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#F2F2F2] h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start p-8 relative overflow-hidden"
      style={{ backgroundImage: `url(${BG_pattern})` }}
    >
      <style>{keyframes}</style>
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
      <div style={containerStyles}>
        <div style={slider1Styles}>
          {images1.map((src, index) => (
            <img
              key={index}
              src={require(`../assets/${src}`)}
              alt={`Slide ${index + 1}`}
              style={slideStyles}
            />
          ))}
        </div>
        <div style={slider2Styles}>
          {images2.map((src, index) => (
            <img
              key={index}
              src={require(`../assets/${src}`)}
              alt={`Slide ${index + 5}`}
              style={slideStyles}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
