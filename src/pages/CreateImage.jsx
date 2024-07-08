import React, { useState } from "react";
import CollectionAddModal from "../components/CollectionAddModal";
import { ReactComponent as DLlogo } from "../assets/designovel_icon_black.svg";

const Bubble = ({ text }) => {
  return (
    <div className="relative bg-[#444655] text-white text-lg pt-2 px-5 rounded-lg h-auto inline-block font-['pretendard-medium'] mt-3 ml-2 before:content-[''] before:absolute before:bg-[#444655] before:w-4 before:h-4 before:rotate-45 before:top-1/2 before:-left-2 before:-translate-y-1/2">
      "{text}" 생성 결과
    </div>
  );
};

const CreateImage = () => {
  const [inputText, setInputText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted: " + inputText);

    const newResult = {
      promptText: inputText,
      date: new Date().toISOString().slice(0, 10), // 현재 날짜 설정
      showButton: true, // 초기 상태에서 버튼을 보이게 설정
    };
    setResults([newResult, ...results]);

    try {
      let response = await fetch("http://223.194.20.119:8000/process_string", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ string_input: inputText }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.text();
      console.log(data);
      setAlertMessage(data);
      alert(data);

      // Now get the image from get_image
      response = await fetch("http://223.194.20.119:8000/get_image");
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageURL(url);

      // 말풍선에 텍스트 설정
      setPromptText(inputText);
      setShowResult(true);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSaveImage = () => {};

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <div className="flex min-h-screen bg-[#F2F2F2] pt-20 pb-10 w-full justify-center">
      <div className="flex w-[80%] justify-center px-4 mt-10">
        <div className="flex flex-col w-[50%] mx-2">
          {/* 입력창 섹션 */}
          <div className="flex flex-col justify-start items-start">
            <span className="block text-3xl font-['pretendard-extrabold'] text-slate-700 mb-5">
              상상 속 패턴을 지금 만들어보세요!
            </span>
            <div className="relative w-full">
              <textarea
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="appearance-none block w-full h-60 bg-[#F2F2F2] text-gray-700 rounded-lg py-4 px-4 leading-tight focus:outline-none border-3 border-[#3A57A7] mb-0"
                placeholder="ex) Natural wave pattern, background color is blue and waves light yellow"
              />
              <div className="absolute bottom-0 right-0 flex w-full justify-between rounded-b-lg rounded-t-lg">
                <button
                  type="submit"
                  className="w-full bg-[#3A57A7] hover:bg-blue-900 text-white font-['pretendard-bold'] text-2xl py-4 rounded-b-lg"
                  onClick={handleSubmit}
                >
                  생성하기
                </button>
              </div>
            </div>
          </div>
          {/* 옵션 섹션 */}
          <div
            className={
              "w-full h-[48vh] mt-8 rounded-lg border-3 border-[#8194EC]"
            }
          >
            <div className="relative w-full h-full">
              <span className="m-3 block text-2xl font-['pretendard-bold'] text-left text-slate-700">
                옵션
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[55%] mx-2 mt-14 h-[77vh] overflow-y-auto border-3 border-200 p-6 rounded-lg shadow-lg">
          {/* 생성 결과 섹션 */}
          {results.map((result, index) => (
            <div
              key={index}
              className="flex flex-col justify-center mt-2 w-full bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex">
                <DLlogo width="60" height="60" className="mr-6" />
                <Bubble text={result.promptText} />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between items-center w-40"
                  >
                    {imageURL && (
                      <div className="overflow-hidden w-40 h-40 cursor-pointer">
                        <img
                          src={imageURL}
                          alt="Generated Image"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium'] text-gray-600">
                      <p className="text-left">{result.date}</p>
                      <div className="flex items-center space-x-2">
                        <button onClick={openAddModal}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                          </svg>
                        </button>
                        <button onClick={handleSaveImage}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isAddModalOpen && <CollectionAddModal onClose={closeAddModal} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateImage;
