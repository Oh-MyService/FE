import React, { useState, useRef, useEffect } from 'react';
import CollectionAddModal from '../components/CollectionAddModal';
import { ReactComponent as DLlogo } from '../assets/designovel_icon_black.svg';

const Bubble = ({ text }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        const tempInput = document.createElement('textarea');
        tempInput.value = `${text}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopySuccess(true);

        setTimeout(() => {
            setCopySuccess(false);
        }, 1000);
    };

    return (
        <div className="relative">
            <div
                className="relative bg-[#444655] text-white text-lg pt-2 px-5 rounded-xl h-auto inline-block font-['pretendard-medium'] mt-3 pb-3 ml-2 max-w-full before:content-[''] before:absolute before:w-4 before:h-4 before:rotate-45 before:top-5 before:-left-2 before:-translate-y-1/2"
                style={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    textAlign: 'justify',
                }}
            >
                "{text}" 생성 결과
                <button onClick={handleCopy} className="ml-2">
                    {copySuccess ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="inline-block w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="inline-block w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

const applySliderStyles = (element) => {
    element.style.webkitAppearance = 'none';
    element.style.width = '100%';
    element.style.height = '10px';
    element.style.background = '#dcdcdc';
    element.style.outline = 'none';
    element.style.borderRadius = '5px';
    element.style.overflow = 'visible';
    element.style.appearance = 'none';

    const setSliderBackground = (value) => {
        const percentage = ((value - element.min) / (element.max - element.min)) * 100;
        element.style.background = `linear-gradient(to right, #8194EC 0%, #8194EC ${percentage}%, #dcdcdc ${percentage}%, #dcdcdc 100%)`;
    };

    setSliderBackground(element.value);

    element.addEventListener('input', (e) => {
        setSliderBackground(e.target.value);
    });

    const thumbStyles = document.createElement('style');
    thumbStyles.innerHTML = `
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border: 3px solid #3A57A7;
      background: #ffffff;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      top: 50%;
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: 3px solid #3A57A7;
      background: #ffffff;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      top: 50%;
    }

    input[type="range"]::-ms-thumb {
      width: 20px;
      height: 20px;
      border: 3px solid #3A57A7;
      background: #ffffff;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      top: 50%;
    }
  `;
    document.head.appendChild(thumbStyles);
};

const CreateImage = () => {
    const [inputText, setInputText] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [promptText, setPromptText] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    const [results, setResults] = useState([]);
    const [promptId, setPromptId] = useState(null);
    const [imageDataList, setImageDataList] = useState([]);

    const [cfgScale, setCfgScale] = useState(10);
    const [samplingSteps, setSamplingSteps] = useState(50);

    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (sliderRef1.current) applySliderStyles(sliderRef1.current);
        if (sliderRef2.current) applySliderStyles(sliderRef2.current);
    }, []);

    const [repeatDirectionPage, setRepeatDirectionPage] = useState(0); // 반복 방향 및 비율 페이지 상태
    const [moodPage, setMoodPage] = useState(0); // 분위기 페이지 상태
    const [selectedRepeatDirection, setSelectedRepeatDirection] = useState(null);
    const [selectedMood, setSelectedMood] = useState(null);

    const repeatDirectionOptions = ['격자', '대각선', '원형', '수평', '수직', '물결', '물방울', '다이아몬드'];
    const moodOptions = [
        '카툰',
        '모던',
        '아방가르드',
        '빈티지',
        '보헤미안',
        '미니멀리스트',
        '로맨틱',
        '펑크',
        '그래픽',
        '에스닉',
        '내추럴',
        '레트로',
    ];
    const optionsPerPage = 5;

    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted: ' + inputText);

        if (!token) {
            setAlertMessage('로그인이 필요합니다.');
            return;
        }

        if (isTokenExpired(token)) {
            setAlertMessage('Session expired. Please login again.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('content', inputText);

            let response = await fetch('http://43.202.57.225:28282/api/prompts', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data);

            const newResult = {
                id: data.id,
                content: data.content,
                created_at: data.created_at,
                user_id: data.user_id,
            };
            setResults([newResult, ...results]);

            setPromptId(data.id);

            setPromptText(data.content);
            setShowResult(true);
        } catch (error) {
            console.error('Error occurred:', error);
            setAlertMessage('Error occurred while creating prompt.');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const handleSaveImage = () => {};

    const handlePrevPage = (setter) => {
        setter((prev) => Math.max(prev - 1, 0));
    };

    const handleNextPage = (setter, options) => {
        setter((prev) => Math.min(prev + 1, Math.ceil(options.length / optionsPerPage) - 1));
    };

    const currentRepeatDirections = repeatDirectionOptions.slice(
        repeatDirectionPage * optionsPerPage,
        (repeatDirectionPage + 1) * optionsPerPage
    );

    const currentMoods = moodOptions.slice(moodPage * optionsPerPage, (moodPage + 1) * optionsPerPage);

    useEffect(() => {
        if (promptId) {
            const interval = setInterval(async () => {
                try {
                    const response = await fetch(`http://43.202.57.225:28282/api/results/${promptId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    console.log('Received Image Data:', data); // 이미지 데이터 확인

                    // 여기서 data.results 배열을 imageDataList에 추가
                    setImageDataList(data.results.map((result) => result.image_data));
                } catch (error) {
                    console.error('Error occurred while fetching the image:', error);
                }
            }, 60000);

            return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
        }
    }, [promptId, token]);

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] pt-20 pb-10 w-full justify-center">
            <div className="flex w-[80%] justify-center px-4 mt-10">
                <div className="flex flex-col w-[50%] mx-2 min-w-[650px]">
                    {/* 입력창 섹션 */}
                    <div className="flex flex-col justify-start items-start">
                        <span className="block text-3xl font-['pretendard-extrabold'] text-black mb-5">
                            상상 속 패턴을 지금 만들어보세요!
                        </span>
                        <div className="relative w-full">
                            <textarea
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="appearance-none block w-full h-56 bg-[#F2F2F2] text-black rounded-lg py-4 px-4 leading-tight focus:outline-none border-3 border-[#3A57A7] mb-0"
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
                    <div className="w-full h-auto mt-8 rounded-lg border-3 border-[#8194EC] p-4">
                        <div className="relative w-full">
                            <span className="block text-2xl font-['pretendard-bold'] text-left text-black mb-3">
                                고급 설정
                            </span>
                            <div className="grid gap-4">
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">가로</label>
                                    <input
                                        type="number"
                                        className="w-20 p-2 focus:outline-[#8194EC] rounded-lg mr-2 font-['pretendard-regular']"
                                        defaultValue={512}
                                    />
                                    <label className="text-lg font-['pretendard-bold'] mr-2">세로</label>
                                    <input
                                        type="number"
                                        className="w-20 p-2 focus:outline-[#8194EC] rounded-lg mr-6 font-['pretendard-regular']"
                                        defaultValue={512}
                                    />
                                    <label className="text-lg font-['pretendard-bold'] mr-2">배경색</label>
                                    <input
                                        type="text"
                                        className="w-32 p-2 focus:outline-[#8194EC] rounded-lg font-['pretendard-regular']"
                                        placeholder="ex) red"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">질감</label>
                                </div>
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">반복 방향 및 비율</label>
                                    <button
                                        onClick={() => handlePrevPage(setRepeatDirectionPage)}
                                        className="px-3 py-2 hover:bg-[#d8dae3] rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 19.5 8.25 12l7.5-7.5"
                                            />
                                        </svg>
                                    </button>
                                    {currentRepeatDirections.map((direction, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedRepeatDirection(direction)}
                                            className={`px-4 py-2 rounded-full ml-2 border-2 ${
                                                selectedRepeatDirection === direction
                                                    ? 'border-[#8194EC]'
                                                    : 'border-primary'
                                            } hover:border-[#8194EC] focus:border-[#8194EC] font-['pretendard-regular']`}
                                        >
                                            {direction}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handleNextPage(setRepeatDirectionPage, repeatDirectionOptions)}
                                        className="px-3 py-2 hover:bg-[#d8dae3] rounded-full ml-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">분위기</label>
                                    <button
                                        onClick={() => handlePrevPage(setMoodPage)}
                                        className="px-3 py-2 hover:bg-[#d8dae3] rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 19.5 8.25 12l7.5-7.5"
                                            />
                                        </svg>
                                    </button>
                                    {currentMoods.map((mood, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedMood(mood)}
                                            className={`px-4 py-2 rounded-full ml-2 border-2 ${
                                                selectedMood === mood ? 'border-[#8194EC]' : 'border-primary'
                                            } hover:border-[#8194EC] focus:border-[#8194EC] font-['pretendard-regular']`}
                                        >
                                            {mood}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handleNextPage(setMoodPage, moodOptions)}
                                        className="px-3 py-2 hover:bg-[#d8dae3] rounded-full ml-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="border-t border-gray-300 my-4"></div>
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">CFG Scale</label>
                                    <input
                                        type="range"
                                        min="7"
                                        max="13"
                                        value={cfgScale}
                                        onChange={(e) => setCfgScale(Number(e.target.value))}
                                        ref={sliderRef1}
                                        className="flex-1 cursor-pointer"
                                    />
                                    <span className="ml-2 text-lg">{cfgScale}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">Sampling Steps</label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="150"
                                        value={samplingSteps}
                                        onChange={(e) => setSamplingSteps(Number(e.target.value))}
                                        ref={sliderRef2}
                                        className="flex-1 cursor-pointer"
                                    />
                                    <span className="ml-2 text-lg">{samplingSteps}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">Seed</label>
                                    <input
                                        type="number"
                                        className="w-20 p-2 focus:outline-[#8194EC] rounded-lg mr-2 font-['pretendard-regular']"
                                        defaultValue={0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-[55%] mx-2 mt-14 h-[77vh] overflow-y-auto border-3 border-200 p-6 rounded-lg shadow-lg min-w-[700px]">
                    {/* 생성 결과 섹션 */}
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center mt-2 w-full bg-white p-4 rounded-lg shadow-md"
                        >
                            <div className="flex">
                                <DLlogo width="50" height="50" className="mt-2 flex-shrink-0" />
                                <Bubble text={result.content} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {imageDataList.map((imageData, idx) => (
                                    <div key={idx} className="flex flex-col justify-between items-center w-40">
                                        <div className="overflow-hidden w-40 h-40 cursor-pointer">
                                            <img
                                                src={`data:image/jpeg;base64,${imageData}`}
                                                alt="Generated Image"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium'] text-black">
                                            <p className="text-left">{result.created_at}</p>
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
