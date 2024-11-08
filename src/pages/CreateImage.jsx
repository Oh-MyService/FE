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
                {<span>"{text}" 생성 결과</span>}

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
    <div className="flex flex-col justify-between items-center w-full animate-pulse">
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
        element.style.background = `linear-gradient(to right, #3A57A7 0%, #3A57A7 ${percentage}%, #dcdcdc ${percentage}%, #dcdcdc 100%)`;
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

// 날짜 형식 변환 함수 추가
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
        .getDate()
        .toString()
        .padStart(2, '0')}`;
};

const ProgressAndRemainingCount = ({ progress, remainingCount, remainingTime }) => (
    <div className="mt-4 ml-4 w-2/3">
        <p className="text-lg font-['pretendard-semibold'] mb-2 text-black">
            {remainingCount > 1 ? `${remainingCount - 1}번째로 생성 대기 중` : '생성 중'}
        </p>
        <div className="flex items-center mt-2">
            <div className="flex-grow h-2.5 bg-gray-300 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#444655]"
                    style={{
                        width: `${progress || 0}%`,
                    }}
                ></div>
            </div>
            <span className="ml-2 text-sm font-['pretendard-medium'] text-gray-500">
                {progress ? `${progress}%` : '0%'}
            </span>
        </div>
        <p className="mt-2 text-sm font-['pretendard-medium'] text-gray-500">예상 소요 시간 : {remainingTime}</p>
    </div>
);

const CreateImage = () => {
    const token = localStorage.getItem('token'); // 토큰 가져오기

    // 프롬프트 상태 관리
    const [positivePrompt, setPositivePrompt] = useState('');
    const [elementErrorMessage, setElementErrorMessage] = useState('');

    // 옵션 상태 관리
    const [cfgScale, setCfgScale] = useState(7);
    const [seed, setSeed] = useState('');
    const [isRandomSeed, setIsRandomSeed] = useState(false);

    // Seed를 랜덤 값으로 설정하기 위한 useEffect
    useEffect(() => {
        if (isRandomSeed) {
            setSeed(-1); // 랜덤일 때는 -1로 고정
        }
    }, [isRandomSeed]);

    // 기타 상태 관리
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedResultId, setSelectedResultId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [seedError, setSeedError] = useState('');

    const [progress, setProgress] = useState(0); // 프로그래스바 상태 관리
    const [remainingCount, setRemainingCount] = useState(null);
    const [remainingTime, setRemainingTime] = useState('');

    // 전체 생성 테스트 수
    const [totalQueueCount, setTotalQueueCount] = useState(0);

    const [taskId, setTaskId] = useState(null);

    // 로컬 스토리지에서 불러온 결과 기록 상태 관리
    const [results, setResults] = useState(() => {
        const savedResults = localStorage.getItem('results');
        const parsedResults = savedResults ? JSON.parse(savedResults) : [];

        // 이미 이미지가 생성된 경우는 isLoading을 false로 설정
        return parsedResults.map((result) =>
            result.images && result.images.length > 0 ? { ...result, isLoading: false } : result
        );
    });

    // 로컬 스토리지에서 promptId 불러오기
    useEffect(() => {
        const savedResults = localStorage.getItem('results');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);
            const latestResult = parsedResults[0]; // 가장 최근 생성된 결과 사용
            if (latestResult && latestResult.id) {
                promptIdRef.current = latestResult.id; // promptIdRef 설정
            }
        }
    }, []);

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 isLoading 상태 불러오기
    useEffect(() => {
        const savedResults = localStorage.getItem('results');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);
            const latestResult = parsedResults[0]; // 가장 최근 생성된 결과 사용
            if (latestResult && latestResult.isLoading !== undefined) {
                setIsLoading(latestResult.isLoading);
            }
        }
    }, []);

    // useEffect를 통해 컴포넌트가 마운트될 때 로컬 스토리지에서 기록 불러오기
    useEffect(() => {
        const savedResults = localStorage.getItem('results');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);

            setResults(parsedResults);

            // isLoading 상태인 경우 프로그래스 폴링 시작
            parsedResults.forEach((result) => {
                if (result.isLoading) {
                    fetchProgress(result.task_id); // task_id별로 진행 상황 확인
                }
            });
        }
    }, []);

    useEffect(() => {
        // isLoading 상태가 false인 경우 버튼을 활성화
        const isAnyLoading = results.some((result) => result.isLoading);
        if (!isAnyLoading) {
            setIsLoading(false); // 모든 로딩이 끝났으면 버튼 활성화
        }
    }, [results]); // results 상태가 변경될 때마다 실행

    // results가 변경될 때마다 로컬 스토리지에 기록 저장
    useEffect(() => {
        localStorage.setItem('results', JSON.stringify(results));
    }, [results]);

    // 슬라이더 상태 관리
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    // 컬렉션 추가 모달
    const openAddModal = (imageId) => {
        setSelectedResultId(imageId);
        setAddModalOpen(true);
    };

    const closeAddModal = () => setAddModalOpen(false);

    // 슬라이더 스타일 초기화
    useEffect(() => {
        if (sliderRef1.current) applySliderStyles(sliderRef1.current);
        if (sliderRef2.current) applySliderStyles(sliderRef2.current);
    }, []);

    // 토큰 만료 여부 확인
    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    };

    // remainingCount 가져오기 함수
    const fetchRemainingCount = async (taskId) => {
        try {
            const response = await fetch(`http://118.67.128.129:28282/api/prompts/count_wait/${taskId}`);
            const data = await response.json();

            setRemainingCount(data.remaining_count);

            // 결과를 results에 반영
            setResults((prevResults) =>
                prevResults.map((result) =>
                    result.task_id === taskId ? { ...result, remaining_count: data.remaining_count } : result
                )
            );
        } catch (error) {
            console.error('Error fetching remaining count:', error);
        }
    };

    // 큐 상태를 가져오기
    const fetchQueueStatus = async () => {
        try {
            const response = await fetch('http://118.67.128.129:28282/rabbitmq/queue_status');
            const data = await response.json();
            setTotalQueueCount(data.total_count);
        } catch (error) {
            console.error('Error fetching queue status:', error);
        }
    };

    // 5초마다 큐수 가져옴
    useEffect(() => {
        fetchQueueStatus();

        const interval = setInterval(() => {
            fetchQueueStatus();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const promptIdRef = useRef(null);

    // 프로그래스바 상태를 업데이트하는 함수
    const fetchProgress = async (taskId) => {
        try {
            const response = await fetch(`http://118.67.128.129:28282/progress/${taskId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch progress');
            }

            const progressData = await response.json();

            if (typeof progressData.progress === 'number') {
                setProgress(progressData.progress);

                setResults((prevResults) =>
                    prevResults.map((result) =>
                        result.task_id === taskId ? { ...result, progress: progressData.progress } : result
                    )
                );

                if (progressData.estimated_remaining_time) {
                    setRemainingTime(progressData.estimated_remaining_time);
                } else {
                    setRemainingTime('');
                }

                // progress가 100%에 도달하면 이미지를 한꺼번에 불러오기
                if (progressData.progress >= 100) {
                    clearInterval(pollingInterval);
                    setPollingInterval(null);
                    pollForImages(promptIdRef.current);
                }
            } else {
                throw new Error('Invalid progress data type received');
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
            setProgress(0);
            setRemainingTime('');
        }
    };

    const [pollingInterval, setPollingInterval] = useState(null);

    // 폴링 추가 부분
    useEffect(() => {
        if (isLoading && results.length > 0) {
            if (pollingInterval) clearInterval(pollingInterval); // 중복 폴링 방지

            const newInterval = setInterval(() => {
                results.forEach((result) => {
                    if (result.isLoading) {
                        fetchProgress(result.task_id); // task_id별로 진행 상황 확인
                    }
                });
            }, 1000);

            setPollingInterval(newInterval);

            return () => {
                if (newInterval) {
                    clearInterval(newInterval);
                }
            };
        }
    }, [isLoading, results]);

    // 생성하기 요청
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProgress(0);
        setRemainingCount(null);
        setRemainingTime('');
        setIsLoading(true);

        if (!token) {
            setAlertMessage('로그인이 필요합니다.');
            return;
        }

        if (isTokenExpired(token)) {
            setAlertMessage('Session expired. Please login again.');
            return;
        }

        // 필수 입력인 positivePrompt가 비어 있을 때 경고 표시
        if (positivePrompt.trim() === '') {
            setAlertMessage('패턴에 포함할 요소를 입력하세요.');
            setIsLoading(false);
            return;
        }

        // seed 값 없을 경우
        if (!seed && !isRandomSeed) {
            setSeedError('Seed 값을 입력해주세요.');
            setIsLoading(false);
            return;
        }
        setSeedError('');

        try {
            const formData = new FormData();
            formData.append('positive_prompt', positivePrompt);
            formData.append('cfg_scale', cfgScale || 7);
            formData.append('seed', seed);

            const response = await fetch('http://118.67.128.129:28282/api/prompts', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            if (data && data.id && data.task_id) {
                const newResult = {
                    id: data.id,
                    content: data.content,
                    created_at: data.created_at,
                    user_id: data.user_id,
                    task_id: data.task_id,
                    images: [],
                    isLoading: true,
                };
                setResults((prevResults) => [newResult, ...prevResults]);
                promptIdRef.current = data.id;
                fetchProgress(data.task_id);
                setTaskId(data.task_id);
                fetchRemainingCount(data.task_id);
            } else {
                console.error('id 또는 task_id가 undefined입니다.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setAlertMessage('Error occurred while creating prompt.');
        }
    };

    useEffect(() => {
        let interval = null;

        if (isLoading && taskId) {
            fetchRemainingCount(taskId);

            interval = setInterval(() => {
                fetchRemainingCount(taskId);
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [isLoading, taskId]);

    // 이미지 생성 결과 폴링
    const pollForImages = async (promptId) => {
        try {
            const response = await fetch(`http://118.67.128.129:28282/api/results/${promptId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (data.results.length > 0) {
                setResults((prevResults) =>
                    prevResults.map((result) =>
                        result.id === promptId
                            ? {
                                  ...result,
                                  images: [...result.images, ...data.results],
                                  isLoading: result.images.length + data.results.length < 4, // 이미지가 4개 미만일 때는 로딩 유지
                              }
                            : result
                    )
                );

                // 모든 이미지 로드 후 로딩 상태 해제
                const allImagesLoaded = data.results.length >= 4; // 결과 이미지가 4개 이상 생성되었는지 확인
                if (allImagesLoaded) {
                    setIsLoading(false); // 모든 이미지 로드 후 로딩 상태 해제
                }
            } else {
                console.log('No images found for this prompt');
            }
        } catch (error) {
            console.error('Error occurred while fetching the image:', error);
            setResults((prevResults) =>
                prevResults.map((result) => (result.id === promptId ? { ...result, isLoading: false } : result))
            );
        }
    };

    // 로컬에 이미지 저장하기
    const handleSaveImage = (imageUrl, imageId) => {
        fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `image_${imageId}.webp`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch((error) => {
                console.error('Error downloading the image:', error);
            });
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F2F2F2] pt-10 pb-10 w-full">
            <div className="flex w-full max-w-[1400px] mx-auto px-4 justify-center mt-10 mb-[-40px]">
                <div className="flex flex-col w-1/2 px-4 mt-10">
                    <div className="flex flex-col justify-start items-start">
                        {/* Positive 프롬프트 입력 */}
                        <p className="text-lg font-['pretendard-bold'] mb-2">
                            패턴에 포함하고 싶은 요소를 영문으로 입력하세요
                        </p>
                        {/* 요소 입력 경고 메시지 출력 */}
                        {elementErrorMessage && (
                            <p className="text-red-600 font-['pretendard-medium'] mb-2">{elementErrorMessage}</p>
                        )}
                        <textarea
                            type="text"
                            value={positivePrompt}
                            onChange={(e) => {
                                const value = e.target.value;
                                const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // 한글 체크하는 정규 표현식

                                if (koreanRegex.test(value)) {
                                    setElementErrorMessage('한국어는 입력할 수 없습니다.');
                                } else {
                                    setElementErrorMessage('');
                                    setPositivePrompt(value);
                                }
                            }}
                            className="w-full h-40 bg-white text-black rounded-lg py-4 px-4 mb-4 mt-2 border-3 border-[#3A57A7] focus:outline-none focus:border-[#263f81] font-['pretendard-medium']"
                            placeholder="ex) a floral pattern with small, curious kittens"
                        />
                        <div className="p-4 border-3 border-[#3A57A7] rounded-lg w-full">
                            {/* CFG Scale */}
                            <div className="flex flex-col mb-4 mt-2 w-2/3">
                                <label className="text-lg font-['pretendard-bold'] mb-2 whitespace-nowrap text-left">
                                    CFG Scale
                                </label>
                                <div className="flex flex-row mr-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max="13"
                                        value={cfgScale}
                                        onChange={(e) => setCfgScale(parseFloat(e.target.value))}
                                        ref={sliderRef1}
                                        className="flex-grow cursor-pointer mr-4 mt-2"
                                        style={{ width: '60%' }}
                                    />
                                    <span className="text-lg font-['pretendard-regular']">{cfgScale}</span>
                                </div>
                            </div>

                            {/* Seed 입력 및 랜덤 체크박스 */}
                            <div className="flex flex-col mb-2 w-full">
                                <div className="flex flex-row">
                                    <label className="text-lg font-['pretendard-bold'] mb-2 mr-4">Seed</label>
                                    <div className="flex items-center">
                                        <label className="flex items-center text-sm font-['pretendard-regular'] mb-2">
                                            <input
                                                type="checkbox"
                                                checked={isRandomSeed}
                                                onChange={(e) => setIsRandomSeed(e.target.checked)}
                                                className="mr-1 h-4 w-4 border-gray-300 rounded"
                                            />
                                            random
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    {!isRandomSeed && (
                                        <input
                                            type="number"
                                            className="w-20 p-2 border focus:outline-none focus:border-[#809DEC] rounded-lg text-left"
                                            value={seed}
                                            onChange={(e) => setSeed(Number(e.target.value))}
                                        />
                                    )}
                                    {seedError && (
                                        <p className="text-red-600 font-['pretendard-medium'] text-sm ml-2">
                                            {seedError}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 생성하기 버튼 */}
                        <div className="flex flex-col item-start w-full justify-end relative mt-3">
                            {isLoading && (
                                <div className="absolute top-0 left-0 w-full">
                                    <ProgressAndRemainingCount
                                        progress={progress}
                                        remainingCount={remainingCount}
                                        remainingTime={remainingTime}
                                    />
                                </div>
                            )}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`w-36 p-4 mt-4 font-['pretendard-semibold'] text-white rounded text-xl ${
                                    isLoading ? 'bg-gray-300' : 'bg-[#3A57A7] hover:bg-[#193174]'
                                }`}
                                style={{
                                    alignSelf: 'flex-end',
                                    position: 'relative',
                                    zIndex: 1,
                                }} // 버튼의 위치 고정
                            >
                                {isLoading ? '생성 중...' : '생성하기'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 생성 결과 섹션 */}
                <div className="flex flex-col w-1/2 px-4 mt-10 h-[720px]">
                    <p className="text-lg font-['pretendard-semibold'] mb-2 text-gray-500 text-left">
                        지금 {totalQueueCount}명이 생성하고 있어요!
                    </p>
                    <div className="flex flex-col w-full px-4 h-full overflow-y-auto border-3 border-200 p-4 rounded-lg shadow-lg bg-[#F2F2F2]">
                        {results.map((result, index) =>
                            result.isLoading ? (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center w-full bg-white p-4 rounded-lg shadow-md mb-3"
                                >
                                    <div className="flex -mt-2">
                                        <DLlogo width="50" height="50" className="mt-2 flex-shrink-0" />
                                        <Bubble text={result.content.positive_prompt} />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                                        {Array(4)
                                            .fill(null)
                                            .map((_, idx) => (
                                                <SkeletonCard key={idx} />
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center w-full bg-white p-4 rounded-lg shadow-md mt-3"
                                >
                                    <div className="flex -mt-2">
                                        <DLlogo width="50" height="50" className="mt-2 flex-shrink-0" />
                                        <Bubble text={result.content.positive_prompt} />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                                        {result.images.map((imageResult, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    className="flex flex-col justify-between items-center w-full"
                                                >
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
                                                        <p className="text-left mr-2">
                                                            {formatDate(result.created_at)}
                                                        </p>
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
                                            );
                                        })}
                                    </div>
                                    {isAddModalOpen && (
                                        <CollectionAddModal onClose={closeAddModal} resultId={selectedResultId} />
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateImage;
