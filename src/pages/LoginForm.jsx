import React from 'react';

const LoginForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // 로그인 로직을 추가하세요.
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[380px] h-[250px]">
                <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                    <button
                        type="submit"
                        className="mt-4 bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-12 rounded-full transition duration-200"
                    >
                        구글로 로그인
                    </button>
                </form>
                <div className="text-center mt-12">
                    <a
                        href="https://support.google.com/accounts/answer/27441?hl=ko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:underline"
                    >
                        회원이 아니신가요? 구글 회원가입
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
