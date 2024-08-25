import React, { useState, useRef, useEffect } from 'react';
import CollectionAddModal from '../components/CollectionAddModal';
import { ReactComponent as DLlogo } from '../assets/designovel_icon_black.svg';

const Bubble = ({ text }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    // 텍스트 복사 처리
    const handleCopy = () => {
        const tempInput = document.createElement('textarea');
        tempInput.value = `${text}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopySuccess(true);

        // 1초 후에 복사 성공 표시 해제
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
                        // 복사 성공 아이콘
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
                        // 복사 버튼 아이콘
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

const CreateImage = () => {
    const token = localStorage.getItem('token'); // 토큰 가져오기

    // 프롬프트 상태 관리
    const [inputText, setInputText] = useState('');

    // 고급 옵션 상태 관리
    const [cfgScale, setCfgScale] = useState(10);
    const [samplingSteps, setSamplingSteps] = useState(50);
    const [width, setWidth] = useState(512);
    const [height, setHeight] = useState(512);
    const [backgroundColor, setBackgroundColor] = useState('White');
    const [seed, setSeed] = useState(0);

    // 기타 상태 관리
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedResultId, setSelectedResultId] = useState(null);
    const [results, setResults] = useState([]);

    // 로딩 상태 관리
    const [isLoading, setIsLoading] = useState(false);

    // 모달 상태 관리
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    // 슬라이더 상태 관리
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    const colorOptions = [
        'White',
        'Ivory',
        'Light Gray',
        'Gray',
        'Dark Gray',
        'Black',
        'Deep Red',
        'Red',
        'Pink',
        'Light Pink',
        'Pale Pink',
        'Orange',
        'Light Yellow',
        'Yellow',
        'Light Green',
        'Mint',
        'Green',
        'Olive Green',
        'Khaki',
        'Dark Green',
        'Sky Blue',
        'Blue',
        'Navy',
        'Lavender',
        'Purple',
        'Burgundy',
        'Brown',
        'Camel',
        'Beige',
    ];

    const openAddModal = (imageId) => {
        setSelectedResultId(imageId);
        setAddModalOpen(true);
    };

    const closeAddModal = () => setAddModalOpen(false);

    // 이미지 생성 요청 처리
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
            formData.append('width', width || 512);
            formData.append('height', height || 512);
            formData.append('background_color', backgroundColor || 'White');
            formData.append('cfg_scale', cfgScale || 10);
            formData.append('sampling_steps', samplingSteps || 50);
            formData.append('seed', seed || 0);

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

            // 새 결과 추가
            const newResult = {
                id: data.id,
                content: data.content,
                created_at: data.created_at,
                user_id: data.user_id,
                images: [],
            };
            setResults((prevResults) => [newResult, ...prevResults]);
            setIsLoading(true);
            pollForImages(data.id, newResult);
        } catch (error) {
            console.error('Error occurred:', error);
            setAlertMessage('Error occurred while creating prompt.');
        }
    };

    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    };

    const pollForImages = (promptId, newResult) => {
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
                console.log('Received Image Data:', data);

                if (data.results.length > 0) {
                    setResults((prevResults) =>
                        prevResults.map((result) =>
                            result.id === promptId
                                ? {
                                      ...result,
                                      images: [...result.images, ...data.results],
                                      created_at: formatDateWithoutDot(new Date(result.created_at)),
                                  }
                                : result
                        )
                    );
                }

                if (data.results.length >= 4) {
                    setIsLoading(false);
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Error occurred while fetching the image:', error);
                setIsLoading(false);
                clearInterval(interval);
            }
        }, 10000);
    };

    const formatDateWithoutDot = (date) => {
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
            .getDate()
            .toString()
            .padStart(2, '0')}`;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] pt-20 pb-10 w-full justify-center">
            <div className="flex w-[80%] justify-center px-4 mt-10">
                <div className="flex flex-col w-[50%] mx-2 min-w-[650px]">
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
                                        value={width}
                                        onChange={(e) => setWidth(Number(e.target.value))}
                                    />
                                    <label className="text-lg font-['pretendard-bold'] mr-2">세로</label>
                                    <input
                                        type="number"
                                        className="w-20 p-2 focus:outline-[#8194EC] rounded-lg mr-6 font-['pretendard-regular']"
                                        value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                    />
                                    <label className="text-lg font-['pretendard-bold'] mr-2">배경색</label>
                                    <div className="flex flex-wrap">
                                        {colorOptions.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setBackgroundColor(color)}
                                                className={`px-3 py-1 m-1 rounded-md border-2 ${
                                                    backgroundColor === color
                                                        ? 'border-blue-500 bg-blue-100'
                                                        : 'border-gray-300'
                                                } hover:border-blue-500 focus:outline-none`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label className="text-lg font-['pretendard-bold'] mr-2">질감</label>
                                </div>
                                {/* 반복 방향 및 분위기 설정 등 다른 UI 요소들 */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 생성 결과 섹션 */}
                <div className="flex flex-col w-[55%] mx-2 mt-14 h-[77vh] overflow-y-auto border-3 border-200 p-6 rounded-lg shadow-lg min-w-[700px]">
                    {isLoading ? (
                        <div role="status" className="flex justify-center items-center h-full">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        results.map((result, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center w-full bg-white p-4 rounded-lg shadow-md mt-3"
                            >
                                <div className="flex -mt-2">
                                    <DLlogo width="50" height="50" className="mt-2 flex-shrink-0" />
                                    <Bubble text={result.content} />
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-6">
                                    {result.images.map((imageResult, idx) => (
                                        <div key={idx} className="flex flex-col justify-between items-center w-full">
                                            <div
                                                className="overflow-hidden"
                                                style={{ width: '250px', height: '250px' }}
                                            >
                                                <img
                                                    src={`data:image/jpeg;base64,${imageResult.image_data}`}
                                                    alt="Generated Image"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex justify-between items-center w-[250px] mt-2 font-['pretendard-medium'] text-gray-600">
                                                <p className="text-left">{result.created_at}</p>
                                                <div className="flex items-center space-x-2">
                                                    <button onClick={() => openAddModal(imageResult.id)}>
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
                                                    <button
                                                        onClick={() =>
                                                            handleSaveImage(
                                                                imageResult.image_data,
                                                                imageResult.id + '_' + idx
                                                            )
                                                        }
                                                    >
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
                                {isAddModalOpen && (
                                    <CollectionAddModal onClose={closeAddModal} resultId={selectedResultId} />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateImage;
