import React, { useState, useEffect } from "react";

const AddModal = ({ onClose }) => {
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  // fetchCollections 함수를 정의하여 컴포넌트 내의 다른 함수에서도 사용 가능하게 합니다.
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
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data = await response.json();

      const collectionList = data.collection_list || [];
      setCollections(
        collectionList.map((collection) => ({
          id: collection.id,
          name: collection.collection_name,
          isSelected: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [token, userId]);

  const handleSelect = (index) => {
    const newCollections = [...collections];
    newCollections[index].isSelected = !newCollections[index].isSelected;
    setCollections(newCollections);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleNewCollectionNameChange = (event) => {
    setNewCollectionName(event.target.value);
  };

  const addNewCollection = async () => {
    try {
      // POST 요청을 통해 새 컬렉션 생성
      const response = await fetch(
        "http://43.202.57.225:28282/api/collections",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            collection_name: newCollectionName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new collection");
      }

      // 새 컬렉션 생성 후에는 서버에서 컬렉션 리스트를 다시 받아옴
      await fetchCollections();
      setNewCollectionName("");
      setIsAddingNew(false);
    } catch (error) {
      console.error("Error adding new collection:", error);
    }
  };

  const showNewCollectionInput = () => {
    setIsAddingNew(true);
  };

  const hideNewCollectionInput = () => {
    setIsAddingNew(false);
    setNewCollectionName("");
  };

  const filteredCollections =
    searchTerm.length === 0
      ? collections
      : collections.filter((collection) =>
          collection.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="검색"
            className="pl-10 pr-2 py-2 w-full border border-gray-300 rounded-md font-['pretendard-medium']"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-col space-y-2 overflow-y-auto max-h-64">
          {filteredCollections.map((collection, index) => (
            <div
              key={collection.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer font-['pretendard-regular']"
              onClick={() => handleSelect(index)}
            >
              <span>{collection.name}</span>
              {collection.isSelected ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {!isAddingNew ? (
            <button
              className="px-4 py-2 bg-[#3A57A7] text-white rounded-full hover:bg-[#213261] font-['pretendard-medium']"
              onClick={showNewCollectionInput}
            >
              새 아카이브 생성
            </button>
          ) : (
            <div className="flex w-full">
              <input
                type="text"
                placeholder="새 아카이브 이름"
                className="p-2 border border-gray-300 rounded-l-md w-full font-['pretendard-medium']"
                value={newCollectionName}
                onChange={handleNewCollectionNameChange}
                onKeyDown={(event) =>
                  event.key === "Enter" && addNewCollection()
                }
              />
              <button
                className="px-4 py-2 w-28 bg-[#3A57A7] text-white rounded-r-md hover:bg-[#213261] font-['pretendard-medium']"
                onClick={addNewCollection}
              >
                생성하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddModal;
