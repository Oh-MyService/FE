/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            borderWidth: {
                3: '3px',
            },
            fontFamily: {
                'Pretendard-Thin': ['Pretendard-Thin'],
                'Pretendard-ExtraLight': ['Pretendard-ExtraLight'],
                'Pretendard-Light': ['Pretendard-Light'],
                'Pretendard-Regular': ['Pretendard-Regular'],
                'Pretendard-Medium': ['Pretendard-Medium'],
                'Pretendard-SemiBold': ['Pretendard-SemiBold'],
                'Pretendard-Bold': ['Pretendard-Bold'],
                'Pretendard-ExtraBold': ['Pretendard-ExtraBold'],
                'Pretendard-Black': ['Pretendard-Black'],
            },
        },
    },
    plugins: [],
};
