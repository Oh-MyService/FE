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

// 슬라이더 스타일 설정
const applySliderStyles = (element) => {
    element.style.webkitAppearance = 'none';
    element.style.width = '100%';
    element.style.height = '10px';
    element.style.background = '#dcdcdc';
    element.style.outline = 'none';
    element.style.borderRadius = '5px';
    element.style.overflow = 'visible';
    element.style.appearance = 'none';

    // 슬라이더 배경 색상 업데이트
    const setSliderBackground = (value) => {
        const percentage = ((value - element.min) / (element.max - element.min)) * 100;
        element.style.background = `linear-gradient(to right, #8194EC 0%, #8194EC ${percentage}%, #dcdcdc ${percentage}%, #dcdcdc 100%)`;
    };

    setSliderBackground(element.value);

    element.addEventListener('input', (e) => {
        setSliderBackground(e.target.value);
    });

    // 슬라이더 thumb 스타일 추가
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
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedResultId, setSelectedResultId] = useState(null);

    const openAddModal = (imageId) => {
        setSelectedResultId(imageId);
        setAddModalOpen(true);
    };
    const closeAddModal = () => setAddModalOpen(false);

    const [results, setResults] = useState([]);
    const [cfgScale, setCfgScale] = useState(10);
    const [samplingSteps, setSamplingSteps] = useState(50);
    const [isLoading, setIsLoading] = useState(false);

    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    const token = localStorage.getItem('token'); // 토큰 가져오기

    // 슬라이더 스타일 초기화
    useEffect(() => {
        if (sliderRef1.current) applySliderStyles(sliderRef1.current);
        if (sliderRef2.current) applySliderStyles(sliderRef2.current);
    }, []);

    const [repeatDirectionPage, setRepeatDirectionPage] = useState(0);
    const [moodPage, setMoodPage] = useState(0);
    const [selectedRepeatDirection, setSelectedRepeatDirection] = useState(null);
    const [selectedMood, setSelectedMood] = useState(null);

    // 반복 방향 및 분위기 옵션
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
    const optionsPerPage = 5; // 한 페이지당 옵션 수

    // 토큰 만료 여부 확인
    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    };

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
            setIsLoading(true); // 로딩 상태 설정
            pollForImages(data.id, newResult); // 이미지 폴링 시작
        } catch (error) {
            console.error('Error occurred:', error);
            setAlertMessage('Error occurred while creating prompt.');
        }
    };

    // 이미지 생성 결과 폴링
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
                                      images: [...result.images, ...data.results], // 이미지 데이터 추가
                                      created_at: formatDateWithoutDot(new Date(result.created_at)),
                                  }
                                : result
                        )
                    );
                }

                if (data.results.length >= 4) {
                    setIsLoading(false); // 이미지 로딩 완료 시 로딩 상태 해제
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Error occurred while fetching the image:', error);
                setIsLoading(false); // 오류 발생 시 로딩 상태 해제
                clearInterval(interval);
            }
        }, 10000);
    };

    // 날짜 형식 변환
    const formatDateWithoutDot = (date) => {
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
            .getDate()
            .toString()
            .padStart(2, '0')}`;
    };

    // Enter 키로 이미지 생성 요청 처리
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    // 이미지 저장 처리
    const handleSaveImage = (imageData, imageId) => {
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `image_${imageId}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    // 이전 페이지로 이동
    const handlePrevPage = (setter) => {
        setter((prev) => Math.max(prev - 1, 0));
    };

    // 다음 페이지로 이동
    const handleNextPage = (setter, options) => {
        setter((prev) => Math.min(prev + 1, Math.ceil(options.length / optionsPerPage) - 1));
    };

    // 현재 페이지의 반복 방향 옵션
    const currentRepeatDirections = repeatDirectionOptions.slice(
        repeatDirectionPage * optionsPerPage,
        (repeatDirectionPage + 1) * optionsPerPage
    );

    // 현재 페이지의 분위기 옵션
    const currentMoods = moodOptions.slice(moodPage * optionsPerPage, (moodPage + 1) * optionsPerPage);

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

                {/* 생성 결과 섹션 */}
                <div className="flex flex-col w-[55%] mx-2 mt-14 h-[77vh] overflow-y-auto border-3 border-200 p-6 rounded-lg shadow-lg min-w-[700px]">
                    {isLoading ? (
                        <div role="status" className="flex justify-center items-center h-full">
                            {/* 로딩 중 애니메이션 */}
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
                        // 생성 결과 출력
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
                                                    {/* 이미지 추가 모달 열기 버튼 */}
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
                                                    {/* 이미지 저장 버튼 */}
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
