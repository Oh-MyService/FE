import React, { useState, useEffect } from "react";

const AddModal = ({ onClose }) => {
  const initialCollections = [
    { id: 4, name: "unique collection", isSelected: false },
    { id: 3, name: "collection name 3", isSelected: false },
    { id: 2, name: "collection name 2", isSelected: false },
    { id: 1, name: "collection name 1", isSelected: false },
  ]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const [collections, setCollections] = useState(initialCollections);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSelect = (index) => {
    const newCollections = collections.map((collection, i) => {
      if (i === index) {
        return { ...collection, isSelected: !collection.isSelected };
      }
      return collection;
    });
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

  const addNewCollection = () => {
    const newCollection = {
      id: Math.max(...collections.map((c) => c.id)) + 1,
      name: newCollectionName,
      isSelected: false,
    };
    const updatedCollections = [newCollection, ...collections].sort(
      (a, b) => b.id - a.id
    );
    setCollections(updatedCollections);
    setNewCollectionName("");
    setIsAddingNew(false);
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
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="검색"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 font-['pretendard-medium']"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {isAddingNew && (
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="새 컬렉션 이름"
              className="p-2 border border-gray-300 rounded-md w-full font-['pretendard-medium']"
              value={newCollectionName}
              onChange={handleNewCollectionNameChange}
              onKeyDown={(event) => event.key === "Enter" && addNewCollection()}
            />
          </div>
        )}
        <div className="flex flex-col space-y-2 overflow-y-auto max-h-64">
          {filteredCollections.map((collection, index) => (
            <div
              key={index}
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
          <button
            className="px-4 py-2 bg-[#3A57A7] text-white rounded-full hover:bg-gray-500 font-['pretendard-medium'] "
            onClick={showNewCollectionInput}
          >
            Create new collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
