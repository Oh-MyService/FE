import React from 'react';
import TipImage from '../assets/tip.png';

function Main() {
    return (
        <div
            className="bg-[#F2F2F2] h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start p-8 relative overflow-hidden"
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
        `}
            </style>
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
