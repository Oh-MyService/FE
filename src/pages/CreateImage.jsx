import React, { useState } from "react";

const CreateImage = () => {
  const [inputText, setInputText] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted: " + inputText);
    const newImages = Array.from(
      { length: 4 },
      (_, index) => `https://via.placeholder.com/150?text=Image+${index + 1}`
    );
    setImages(newImages);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col mx-0 my-auto w-full lg:w-2/3 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <span className="block text-lg font-bold text-left text-slate-700">
              프롬프트 작성
            </span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="appearance-none block w-full h-40 sm:h-80 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500 placeholder-top"
              placeholder="ex) cat"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 sm:mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleSubmit}
              >
                이미지 생성
              </button>
            </div>
          </div>
          <div className="flex-1">
            <span className="block text-lg font-bold text-left text-slate-700">
              옵션
            </span>
            <div className="w-full h-40 sm:h-80 bg-gray-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Generated Image ${index + 1}`}
              className="w-full h-auto max-w-xs"
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .placeholder-top::placeholder {
          position: relative;
          top: -130px;
        }
      `}</style>
    </div>
  );
};

export default CreateImage;
