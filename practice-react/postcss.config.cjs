module.exports = {
  // 💡 수정된 부분: plugins를 객체 {}에서 배열 []로 변경
  plugins: [
    // require() 함수를 사용하여 플러그인 함수를 배열 요소로 전달
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};