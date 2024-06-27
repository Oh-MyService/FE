import React from "react";
import { useNavigate } from "react-router-dom";
import BG_pattern from "../assets/home_empty_ver.png";

const images1 = ["slider1.jpg", "slider2.png", "slider3.png", "slider10.jpg"];

const images2 = [
  "slider5.webp",
  "slider6.webp",
  "slider11.webp",
  "slider8.jpg",
];

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

const styles = {
  sliderContainer: {
    position: "absolute",
    top: "50%",
    left: "51%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "100vh",
    overflow: "hidden",
  },
  slider: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    height: "200%",
  },
  slider1: {
    right: "17%",
    animation: "slidedown 8s linear infinite",
  },
  slider2: {
    right: "0%",
    animation: "slideup 8s linear infinite",
  },
  image: {
    width: "12vw",
    height: "12vw",
    margin: "1vw 0",
    objectFit: "cover",
    borderRadius: "1vw",
  },
};

function Main() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#F2F2F2] h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start p-8 relative overflow-hidden"
      style={{ backgroundImage: `url(${BG_pattern})` }}
    >
      <style>{keyframes}</style>
      <style>
        {`
        @media (max-width: 768px) {
          .btn {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
          .text-6xl {
            font-size: 2.5rem;
          }
          .text-2xl {
            font-size: 1rem;
          }
        }
        `}
      </style>
      <h1 className="text-6xl font-['pretendard-black'] text-left pl-20 z-10">
        세상의 모든 원단 디자인, 디자이노블에서
      </h1>
      <p className="text-2xl text-left font-['pretendard-medium'] pl-20 pt-10 z-10">
        AI와 함께 원하는 디자인 손쉽게 완성!
      </p>
      <p className="text-2xl text-left font-['pretendard-medium'] pl-20 z-10">
        지금 바로 만들어보세요
      </p>
      <div className="flex space-x-4 mt-4 pl-20 pt-10 z-10">
        <button
          className="btn text-2xl bg-[#3A57A7] hover:bg-[#213261] text-white font-['pretendard-semibold'] py-5 px-16 rounded-xl mr-4"
          onClick={() => navigate("/create-image")}
        >
          지금 만들어보기
        </button>
        <button
          className="btn text-2xl bg-[#8194EC] hover:bg-[#5b6ca6] text-white font-['pretendard-semibold'] py-5 px-24 rounded-xl"
          onClick={() => navigate("/login")}
        >
          내 디자인
        </button>
      </div>
      <div style={styles.sliderContainer}>
        <div style={{ ...styles.slider, ...styles.slider1 }}>
          {images1.concat(images1).map((src, index) => (
            <img
              key={index}
              src={require(`../assets/${src}`)}
              alt={`Slide ${index + 1}`}
              style={styles.image}
            />
          ))}
        </div>
        <div style={{ ...styles.slider, ...styles.slider2 }}>
          {images2.concat(images2).map((src, index) => (
            <img
              key={index}
              src={require(`../assets/${src}`)}
              alt={`Slide ${index + 5}`}
              style={styles.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
