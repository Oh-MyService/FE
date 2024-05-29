import React, { useState } from 'react';
import AddModal from '../components/AddModal';

const Bubble = ({ text }) => {
    return (
        <div className="bg-[#3A57A7] text-white p-2 rounded-lg max-w-md h-10 font-['pretendard-medium']">
            " {text} " 생성 결과
        </div>
    );
};

const CreateImage = () => {
    const [inputText, setInputText] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [promptText, setPromptText] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    const [results, setResults] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted: ' + inputText);

        const newResult = {
            promptText: inputText,
            date: new Date().toISOString().slice(0, 10), // 현재 날짜 설정
        };
        setResults([newResult, ...results]);

        try {
            // Send the string to process_string
            // let response = await fetch("http://192.168.39.100:8000/process_string", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ string_input: inputText }),
            // });

            // if (!response.ok) throw new Error("Network response was not ok");
            // const data = await response.text();
            // console.log(data);
            // setAlertMessage(data);
            // alert(data);

            // // Now get the image from get_image
            // response = await fetch("http://192.168.39.100:8000/get_image");
            // if (!response.ok) throw new Error("Network response was not ok");
            // const blob = await response.blob();
            // const url = URL.createObjectURL(blob);
            // setImageURL(url);

            // 말풍선에 텍스트 설정
            setPromptText(inputText);
            setShowResult(true);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    const handleAddMore = (text) => {
        const newResult = {
            promptText: text,
            date: new Date().toISOString().slice(0, 10),
        };
        setResults([newResult, ...results]);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    // 이미지 다운로드
    const handleSaveImage = () => {};

    return (
        <div className="flex justify-center items-center p-4 bg-neutral-300 min-h-screen">
            <div className="flex flex-col p-4 w-[85%] inset-0 top-0 pt-20 mx-auto">
                <div className="flex flex-row justify-center">
                    <div className="w-[85%]">
                        <span className="block text-lg font-['pretendard-extrabold'] text-left text-slate-700">
                            Pattern Generator
                        </span>
                        <textarea
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="appearance-none block w-full h-40 bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500 placeholder-top shadow-lg"
                            placeholder="ex) cat"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-2 sm:mt-4 bg-[#3A57A7] hover:bg-blue-700 text-white font-['pretendard-bold'] py-2 px-4 rounded-full"
                                onClick={handleSubmit}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-start relative">
                        <button onClick={toggleOptions}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                />
                            </svg>
                        </button>
                        {showOptions && (
                            <div className="absolute top-10 right-7 w-30 bg-white p-3 rounded-lg shadow-xl">
                                <span className="block text-lg font-['pretendard-extrabold'] text-left text-slate-700">
                                    Option
                                </span>
                                <div className="w-40 h-40 bg-gray-200"></div>
                            </div>
                        )}
                    </div>
                </div>

                {results.map((result, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-center mt-4 bg-gray-200 w-[85%] mx-auto p-6 rounded-lg shadow-lg"
                    >
                        <Bubble text={result.promptText} />
                        <div className="grid grid-cols-4 gap-6 mt-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex flex-col justify-between items-center w-60">
                                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                                    <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium'] text-gray-600">
                                        <p className="text-left">{result.date}</p>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={openAddModal}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
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
                        <div>
                            <button
                                type="button"
                                className="mt-4 bg-[#3A57A7] hover:bg-[#303030] text-white font-['pretendard-medium'] py-2 px-12 rounded-full transition duration-200"
                                onClick={() => handleAddMore(result.promptText)}
                            >
                                같은 명령어로 더 생성하기
                            </button>
                        </div>
                        {isAddModalOpen && <AddModal onClose={closeAddModal} />}
                    </div>
                ))}
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
