import React from 'react';
import TipImage from '../assets/image.png';
import MainBg from '../assets/main_bg.jpg'; // 배경 이미지 가져오기

function Main() {
    return (
        <div
            className="relative h-screen w-full flex flex-col justify-center items-start p-8 overflow-hidden"
            style={{ paddingTop: '100px' }}
        >
            <style>
                {`
        @media (max-width: 1024px) {
          .text-6xl {
            font-size: 3rem;
          }
          .text-2xl {
            font-size: 1.5rem;
          }
          .pl-80 {
            padding-left: 40px;
          }
        }

        @media (max-width: 768px) {
          .text-6xl {
            font-size: 2rem;
          }
          .text-2xl {
            font-size: 1rem;
          }
          .pl-80 {
            padding-left: 20px;
          }
          img {
            width: 90%;
            margin-left: 10px;
          }
        }

        /* 배경에만 투명도 40% 적용 */
        .background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${MainBg});
          background-size: cover;
          background-position: center;
          opacity: 0.4; /* 배경 이미지에만 투명도 적용 */
          z-index: -1; /* 배경 이미지가 텍스트 뒤에 있도록 설정 */
        }
        `}
            </style>

            <div className="background absolute top-0 left-0 w-full h-full"></div>

            <h1 className="text-6xl font-['pretendard-black'] text-left pl-80 z-10">
                세상의 모든 원단 디자인, 디자이노블에서
            </h1>
            <p
                className="text-2xl text-left font-['pretendard-medium'] pl-80 pt-10 z-10"
                style={{ lineHeight: '1.4em' }}
            >
                원하는 패턴이 없으신가요? <br /> AI를 사용해 직접 만들어보세요!
            </p>

            <div className="flex justify-center items-center w-full" style={{ marginTop: '40px' }}>
                <img
                    src={TipImage}
                    alt="Tip Image"
                    className="w-3/4 h-auto"
                    style={{ borderRadius: '26px', marginLeft: '20px' }}
                />
            </div>
        </div>
    );
}

export default Main;
