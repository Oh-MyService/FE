import React from 'react';
import TipImage from '../assets/tip_img.png';

function Main() {
    return (
        <div
            className="bg-[#F2F2F2] h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start p-8 relative overflow-hidden"
            style={{ paddingTop: '100px' }}
        >
            <style>
                {`
        @media (max-width: 768px) {
          .text-6xl {
            font-size: 2.5rem;
          }
          .text-2xl {
            font-size: 1rem;
          }
        }
        `}
            </style>
            <h1 className="text-6xl font-['pretendard-black'] text-left pl-80 z-10">
                세상의 모든 원단 디자인, 디자이노블에서
            </h1>
            <p className="text-2xl text-left font-['pretendard-medium'] pl-80 pt-10 z-10" style={{ lineHeight: '2em' }}>
                원하는 패턴이 없으신가요? <br /> AI를 사용해 직접 만들어보세요!
            </p>

            {/* 이미지 삽입 */}
            <div className="flex justify-center items-center w-full" style={{ marginTop: '60px' }}>
                <img src={TipImage} alt="Tip Image" className="w-3/4 h-auto" style={{ borderRadius: '26px' }} />
            </div>
        </div>
    );
}

export default Main;
