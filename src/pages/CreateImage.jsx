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

// 스켈레톤 카드 컴포넌트 정의
const SkeletonCard = () => (
    <div className="flex flex-col justify-center w-full bg-white p-4 rounded-lg shadow-md mt-3 animate-pulse">
        <div className="flex mt-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div> {/* 로고 위치 */}
            <div className="ml-2 flex-1 bg-gray-300 rounded h-12"></div> {/* 텍스트 공간 */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
            {Array(4)
                .fill(null)
                .map((_, index) => (
                    <div key={index} className="flex flex-col justify-between items-center w-full">
                        <div
                            className="w-full bg-gray-300 rounded"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: '250px',
                                maxHeight: '250px',
                                aspectRatio: '1/1', // 이미지 비율 유지
                            }}
                        ></div>
                        <div className="flex items-center justify-between w-full mt-2 font-['pretendard-medium'] text-gray-600 max-w-[255px]">
                            <div className="w-1/4 h-4 bg-gray-200 rounded"></div> {/* 날짜 위치 */}
                            <div className="flex space-x-2 ml-auto">
                                <div className="h-6 w-6 bg-gray-200 rounded"></div> {/* 북마크 아이콘 위치 */}
                                <div className="h-6 w-6 bg-gray-200 rounded"></div> {/* 다운로드 아이콘 위치 */}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
);

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
    const token = localStorage.getItem('token'); // 토큰 가져오기

    // 프롬프트 상태 관리
    const [positivePrompt, setPositivePrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');

    // 옵션 상태 관리
    const [cfgScale, setCfgScale] = useState(7);
    const [samplingSteps, setSamplingSteps] = useState(20);
    const [width, setWidth] = useState(512);
    const [height, setHeight] = useState(512);
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [seed, setSeed] = useState('');
    const [isRandomSeed, setIsRandomSeed] = useState(false);

    // 기타 상태 관리
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedResultId, setSelectedResultId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    // 로컬 스토리지에서 불러온 결과 기록 상태 관리
    const [results, setResults] = useState(() => {
        const savedResults = localStorage.getItem('results');
        const parsedResults = savedResults ? JSON.parse(savedResults) : [];

        // 이미 이미지가 생성된 경우는 isLoading을 false로 설정
        return parsedResults.map((result) =>
            result.images && result.images.length > 0 ? { ...result, isLoading: false } : result
        );
    });

    // useEffect를 통해 컴포넌트가 마운트될 때 로딩 상태를 업데이트
    useEffect(() => {
        const updatedResults = results.map((result) => {
            // 이미지가 이미 생성된 경우 isLoading을 false로 설정
            if (result.images.length > 0) {
                return { ...result, isLoading: false };
            }
            return result;
        });

        setResults(updatedResults); // 상태 업데이트
        localStorage.setItem('results', JSON.stringify(updatedResults)); // 로컬 스토리지 업데이트
    }, []);

    // 슬라이더 상태 관리
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    // 한글 입력 제한 함수
    const handleInputChange = (e) => {
        const value = e.target.value;
        const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글 체크하는 정규 표현식

        if (koreanRegex.test(value)) {
            setAlertMessage('한국어는 입력할 수 없습니다.');
        } else {
            setAlertMessage(''); // 알림 초기화
            setPositivePrompt(value); // 한글이 아닐 때만 상태 업데이트
            setNegativePrompt(value);
        }
    };

    // 컬렉션 추가 모달
    const openAddModal = (imageId) => {
        setSelectedResultId(imageId);
        setAddModalOpen(true);
    };

    const closeAddModal = () => setAddModalOpen(false);

    // 슬라이더 스타일 초기화
    useEffect(() => {
        if (sliderRef1.current && sliderRef2.current) {
            applySliderStyles(sliderRef1.current);
            applySliderStyles(sliderRef2.current);
        }
    }, [sliderRef1, sliderRef2]);

    const [repeatDirectionPage, setRepeatDirectionPage] = useState(0);
    const [moodPage, setMoodPage] = useState(0);
    const [selectedRepeatDirection, setSelectedRepeatDirection] = useState(null);
    const [selectedMood, setSelectedMood] = useState(null);

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

    // 컬러 옵션
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

    // 토큰 만료 여부 확인
    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    };

    // 이미지 생성 요청 처리
    const handleSubmit = async (event) => {
        event.preventDefault();

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
            formData.append('positive_prompt', positivePrompt); // Positive 프롬프트 추가
            formData.append('negative_prompt', negativePrompt); // Negative 프롬프트 추가
            formData.append('width', width || 512); // 기본값 512
            formData.append('height', height || 512); // 기본값 512
            formData.append('background_color', backgroundColor || 'white'); // 기본값 white
            formData.append('mood', selectedResultId || '카툰'); // 선택된 분위기 추가
            formData.append('cfg_scale', cfgScale || 7); // 기본값 7
            formData.append('sampling_steps', samplingSteps || 20); // 기본값 20
            formData.append('seed', isRandomSeed ? Math.floor(Math.random() * 10000) : seed || 0); // 랜덤 Seed 또는 입력된 Seed

            let response = await fetch('http://118.67.128.129:28282/api/prompts', {
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
                isLoading: true, // 새로운 결과는 로딩 중으로 설정
            };
            setResults((prevResults) => [newResult, ...prevResults]);
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
                const response = await fetch(`http://118.67.128.129:28282/api/results/${promptId}`, {
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
                                      isLoading: false, // 로딩 완료
                                  }
                                : result
                        )
                    );
                }

                if (data.results.length >= 4) {
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Error occurred while fetching the image:', error);
                setResults((prevResults) =>
                    prevResults.map((result) => (result.id === promptId ? { ...result, isLoading: false } : result))
                );
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

    // 로컬에 이미지 저장하기
    const handleSaveImage = (imageUrl, imageId) => {
        fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `image_${imageId}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch((error) => {
                console.error('Error downloading the image:', error);
            });
    };

    // 이전 페이지로 이동
    const handlePrevPage = (setter) => {
        setter((prev) => Math.max(prev - 1, 0));
    };

    // 다음 페이지로 이동
    const handleNextPage = (setter, options) => {
        setter((prev) => Math.min(prev + 1, Math.ceil(options.length / optionsPerPage) - 1));
    };

    // 현재 페이지의 분위기 옵션
    const currentMoods = moodOptions.slice(moodPage * optionsPerPage, (moodPage + 1) * optionsPerPage);

    return (
        <div className="flex flex-col min-h-screen bg-[#F2F2F2] pt-10 pb-10 w-full">
            <div className="flex w-full max-w-[1400px] mx-auto px-4 justify-center mt-10 mb-[-40px]">
                <div className="flex flex-col w-1/2 px-4 mt-10">
                    <div className="flex flex-col justify-start items-start">
                        <span className="block text-3xl font-['pretendard-extrabold'] text-black mb-5">
                            상상 속 패턴을 지금 만들어보세요!
                        </span>
                        <div className="flex justify-between w-full max-w-[1400px] mx-auto px-4">
                            <div className="w-1/2">
                                {/* Positive 프롬프트 입력 */}
                                <p className="text-lg font-['pretendard-bold'] mb-2">
                                    패턴에 포함하고 싶은 요소를 입력하세요
                                </p>
                                <textarea
                                    type="text"
                                    value={positivePrompt}
                                    onChange={(e) => setPositivePrompt(e.target.value)}
                                    className="w-full h-24 bg-[#F2F2F2] text-black rounded-lg py-4 px-4 mb-4 border-3 border-[#3A57A7]"
                                    placeholder="ex) Natural wave pattern, background color is blue and waves light yellow"
                                />

                                {/* Negative 프롬프트 입력 */}
                                <p className="text-lg font-['pretendard-bold'] mb-2">
                                    패턴에 제외하고 싶은 요소를 입력하세요
                                </p>
                                <textarea
                                    type="text"
                                    value={negativePrompt}
                                    onChange={(e) => setNegativePrompt(e.target.value)}
                                    className="w-full h-24 bg-[#F2F2F2] text-black rounded-lg py-4 px-4 mb-4 border-3 border-[#3A57A7]"
                                    placeholder="ex) Natural wave pattern, background color is blue and waves light yellow"
                                />
                            </div>
                        </div>

                        {/* 분위기 선택 */}
                        <div className="mb-4">
                            <label className="block text-lg font-['pretendard-bold']">분위기 선택</label>
                            <select
                                value={selectedResultId}
                                onChange={(e) => setSelectedResultId(e.target.value)}
                                className="w-full p-2 border-3 border-[#8194EC] rounded-lg"
                            >
                                {moodOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 색상 선택 */}
                        <div className="mb-4">
                            <label className="block text-lg font-['pretendard-bold']">색상 선택</label>
                            <select
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="w-full p-2 border-3 border-[#8194EC] rounded-lg"
                            >
                                {colorOptions.map((color, index) => (
                                    <option key={index} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 가로 세로 크기 입력 */}
                        <div className="flex mb-4">
                            <label className="mr-4">
                                가로:
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(Number(e.target.value))}
                                    className="w-20 p-2 ml-2 border border-gray-300 rounded"
                                />
                            </label>
                            <label>
                                세로:
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(Number(e.target.value))}
                                    className="w-20 p-2 ml-2 border border-gray-300 rounded"
                                />
                            </label>
                        </div>

                        {/* CFG Scale */}
                        <div className="flex items-center">
                            <label className="text-lg font-['pretendard-bold'] mr-2">CFG Scale</label>
                            <input
                                type="range"
                                min="1"
                                max="13"
                                value={cfgScale}
                                onChange={(e) => setCfgScale(parseFloat(e.target.value))}
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

                        {/* Seed 입력 및 랜덤 체크박스 */}
                        <div className="flex items-center mb-4">
                            <label className="text-lg font-['pretendard-bold'] mr-2">Seed</label>
                            <input
                                type="number"
                                className="w-20 p-2 focus:outline-[#8194EC] rounded-lg mr-2 font-['pretendard-regular']"
                                value={seed}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSeed(value === '' ? '' : Number(value));
                                }}
                                disabled={isRandomSeed} // 랜덤 선택 시 입력 비활성화
                            />
                            <label className="flex items-center ml-4 text-sm">
                                <input
                                    type="checkbox"
                                    checked={isRandomSeed}
                                    onChange={(e) => setIsRandomSeed(e.target.checked)}
                                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                random
                            </label>
                        </div>

                        {/* 생성하기 버튼 */}
                        <button
                            onClick={handleSubmit}
                            className="w-full p-4 mt-6 font-['pretendard-bold'] bg-blue-500 text-white rounded"
                        >
                            생성하기
                        </button>
                    </div>
                </div>
            </div>

            {/* 생성 결과 섹션 */}
            <div className="flex flex-col w-1/2 px-4 mt-24 h-[730px] overflow-y-auto border-3 border-200 p-6 rounded-lg shadow-lg bg-[#F2F2F2]">
                {results.map((result, index) =>
                    result.isLoading ? (
                        <SkeletonCard key={index} />
                    ) : (
                        <div
                            key={index}
                            className="flex flex-col justify-center w-full bg-white p-4 rounded-lg shadow-md mt-3"
                        >
                            <div className="flex -mt-2">
                                <DLlogo width="50" height="50" className="mt-2 flex-shrink-0" />
                                <Bubble text={result.content} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                                {result.images.map((imageResult, idx) => (
                                    <div key={idx} className="flex flex-col justify-between items-center w-full">
                                        <div
                                            className="overflow-hidden"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxWidth: '250px',
                                                maxHeight: '250px',
                                            }}
                                        >
                                            <img
                                                src={imageResult.image_data}
                                                alt="Generated Image"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between w-full mt-2 font-['pretendard-medium'] text-gray-600 max-w-[255px]">
                                            <p className="text-left mr-2">{result.created_at}</p>
                                            <div className="flex items-center space-x-2 ml-auto">
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
                    )
                )}
            </div>
        </div>
    );
};

export default CreateImage;
