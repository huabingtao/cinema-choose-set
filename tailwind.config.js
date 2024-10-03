/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purchasedColor: '#aaa6b6', // 添加自定义颜色
      },
    }
  },
  plugins: []
}
