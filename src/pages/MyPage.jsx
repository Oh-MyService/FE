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
  const [isLoading, setIsLoading] = useState(true);

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
          const sortedImages = data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setRecentImages(sortedImages.slice(0, 5));
        } else {
          console.error("Failed to fetch recent images");
        }
      } catch (error) {
        console.error("Error fetching recent images:", error);
      }
    };

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
            data.collection_list.map(async (collection) => {
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
                createdAt: collection.created_at,
              };
            })
          );

          collectionsData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          // 최신 5개의 컬렉션만 설정
          setCollections(collectionsData.slice(0, 5));
        } else {
          console.error("Failed to fetch collections:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchRecentImages(), fetchCollections()]);
      setIsLoading(false);
    };

    fetchData();
  }, [token, userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }

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
              <div key={index} className="flex flex-col items-center relative">
                <div className="grid grid-cols-2 gap-1 w-60 h-60">
                  {collection.images
                    .concat(
                      Array(Math.max(0, 4 - collection.images.length)).fill({
                        image_data: "",
                      })
                    )
                    .slice(0, 4)
                    .map((image, idx) => (
                      <div
                        key={idx}
                        className="relative w-full"
                        style={{ aspectRatio: "1/1" }}
                      >
                        {image.image_data ? (
                          <img
                            src={"data:image/jpeg;base64," + image.image_data}
                            alt={`${collection.name} Image ${idx}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) =>
                              (e.target.src = "https://via.placeholder.com/150")
                            }
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full bg-gray-300"></div>
                        )}
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
