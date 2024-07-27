import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const goToRecentGeneration = () => navigate("/recent-generation");
  const goToCollection = () => navigate("/my-collection");

  const [recentImages, setRecentImages] = useState([]);
  const [collections, setCollections] = useState([
    {
      name: "Collection 1",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 2",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 3",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 4",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 5",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
  ]);

  useEffect(() => {
    const fetchRecentImages = async () => {
      try {
        let response = await fetch(
          `http://43.202.57.225:28282/api/results/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRecentImages(data.slice(0, 5)); // 데이터가 배열 형태로 반환된다고 가정하고 가장 최근 5개만 사용
        } else {
          console.error("Failed to fetch recent images");
        }
      } catch (error) {
        console.error("Error fetching recent images:", error);
      }
    };

    fetchRecentImages();
  }, [token, userId]);

  const handleCollectionClick = (collectionName) => {
    console.log("Clicked on collection:", collectionName);
  };

  return (
    <div className="flex justify-start items-start bg-[#F2F2F2] min-h-screen">
      <div className="flex flex-col text-left mx-auto my-auto p-4 sm:p-8 mt-20">
        <div className="flex items-center">
          <button
            className="bg-transparent p-2 flex items-center"
            onClick={goToRecentGeneration}
          >
            <h2 className="text-3xl font-['pretendard-extrabold'] mb-3">
              최근 생성 패턴
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.3"
              stroke="currentColor"
              className="w-8 h-8 mb-3 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
          {recentImages.length === 0 ? (
            <div className="flex items-center justify-center w-60 h-60 bg-gray-300">
              <p className="text-center">생성된 패턴이 없습니다</p>
            </div>
          ) : (
            recentImages.map((image, index) => (
              <div key={index} className="overflow-hidden w-60 h-60">
                <img
                  src={"data:image/jpeg;base64," + image.image_data}
                  alt={`Recent Image ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          )}
        </div>
        <div className="flex items-center">
          <button
            className="bg-transparent p-2 flex items-center"
            onClick={goToCollection}
          >
            <h2 className="text-3xl font-['pretendard-extrabold'] mb-3 mt-4">
              아카이브
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.3"
              stroke="currentColor"
              className="w-8 h-8 mt-1 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {collections &&
            collections.map((collection, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer relative"
                onClick={() => handleCollectionClick(collection.name)}
              >
                <div className="grid grid-cols-2 gap-1 w-60 h-60">
                  {collection.images.map((image, idx) => (
                    <div key={idx} className="w-full h-full overflow-hidden">
                      <img
                        src={image}
                        alt={`${collection.name} Image ${idx}`}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/120")
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium']">
                  <p>{collection.name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
