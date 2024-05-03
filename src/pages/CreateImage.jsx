import React, { useState } from "react";

const CreateImage = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted: " + inputText);
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col mx-0 my-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <span class="block text-lg font-bold text-left text-slate-700">
            프롬프트 작성
          </span>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="appearance-none block w-96 h-80 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500"
            placeholder="ex)cat"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            이미지 생성
          </button>
        </form>
      </div>

      <div class="flex flex-col mx-0 my-auto p-4">
        <span class="block text-lg font-bold text-left text-slate-700">
          옵션
        </span>
        <div class="w-96 h-80 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default CreateImage;
