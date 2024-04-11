import React, { useState } from 'react';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Form submitted', formData);
        // 여기서 회원가입 처리 로직을 추가하실 수 있습니다.
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-10 text-gray-800">회원가입</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-5 relative">
                        <label htmlFor="email" className="absolute left-0 -top-5 text-sm text-gray-600">
                            이메일
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded w-full p-2 text-gray-700"
                        />
                    </div>
                    <div className="mb-5 relative">
                        <label htmlFor="password" className="absolute left-0 -top-5 text-sm text-gray-600">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="border rounded w-full p-2 text-gray-700"
                        />
                    </div>
                    <div className="mb-5 relative">
                        <label htmlFor="confirmPassword" className="absolute left-0 -top-5 text-sm text-gray-600">
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border rounded w-full p-2 text-gray-700"
                        />
                    </div>
                    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700">
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}
