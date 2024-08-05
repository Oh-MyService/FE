import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const goToRecentGeneration = () => navigate("/recent-generation");
  const goToCollection = () => navigate("/my-collection");

  const [recentImages, setRecentImages] = useState([]);
  const [collections, setCollections] = useState([]);

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
          setRecentImages(data.slice(0, 5));
        } else {
          console.error("Failed to fetch recent images");
        }
      } catch (error) {
        console.error("Error fetching recent images:", error);
      }
    };

    fetchRecentImages();
  }, [token, userId]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          `http://43.202.57.225:28282/api/collections/user/${userId}`,
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
          const collectionsData = await Promise.all(
            data.collection_list.slice(0, 5).map(async (collection) => {
              const imagesResponse = await fetch(
                `http://43.202.57.225:28282/api/collections/${collection.collection_id}/images`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const imagesData = imagesResponse.ok
                ? await imagesResponse.json()
                : { images: [] };

              return {
                id: collection.collection_id,
                name: collection.collection_name,
                images: imagesData.images,
              };
            })
          );

          setCollections(collectionsData);
        } else {
          console.error("Failed to fetch collections:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, [userId, token]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10 rounded-lg">
          {recentImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-60 h-60 bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
              <p className="text-center font-['pretendard-medium']">
                생성된 패턴이 없습니다.
              </p>
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
          {collections.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-60 h-60 bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
              <p className="text-center font-['pretendard-medium']">
                생성된 아카이브가 없습니다.
              </p>
            </div>
          ) : (
            collections.map((collection, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer relative"
              >
                <div className="grid grid-cols-2 gap-1 w-60 h-60">
                  {collection.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="w-full h-full overflow-hidden"
                      style={{ aspectRatio: "1/1" }}
                    >
                      <img
                        src={"data:image/jpeg;base64," + image.image_data}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
