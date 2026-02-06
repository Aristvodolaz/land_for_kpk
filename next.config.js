/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Статический экспорт для деплоя на ваш сервер
  images: {
    unoptimized: true, // Для статического экспорта
  },
  trailingSlash: true, // Для совместимости с Nginx
}

module.exports = nextConfig
