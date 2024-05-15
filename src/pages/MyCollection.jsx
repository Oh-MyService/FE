import React from "react";
import { useNavigate } from "react-router-dom";

const images = [
  [
    "path/to/first/image1.jpg",
    "path/to/first/image2.jpg",
    "path/to/first/image3.jpg",
    "path/to/first/image4.jpg",
  ],
  [
    "path/to/second/image1.jpg",
    "path/to/second/image2.jpg",
    "path/to/second/image3.jpg",
    "path/to/second/image4.jpg",
  ],
  [
    "path/to/third/image1.jpg",
    "path/to/third/image2.jpg",
    "path/to/third/image3.jpg",
    "path/to/third/image4.jpg",
  ],
  [
    "path/to/fourth/image1.jpg",
    "path/to/fourth/image2.jpg",
    "path/to/fourth/image3.jpg",
    "path/to/fourth/image4.jpg",
  ],
];

const MyCollection = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto px-0 pt-24 max-w-7xl">
      {" "}
      {/* 최대 폭 변경 및 좌우 패딩 제거 */}
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/MyPage")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-['pretendard-extrabold']">
            My Collection
          </h1>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18m-18 6h18"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {images.map((imageGroup, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/Collection")}
          >
            <div className="grid grid-cols-2 gap-1 aspect-square">
              {imageGroup.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Collection ${index} Image ${idx}`}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              ))}
            </div>
            <p className="text-left w-full">Collection name</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollection;
