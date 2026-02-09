'use client'

import { useEffect, useState } from 'react'
import styles from './TelegramButton.module.css'

export default function TelegramButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Показываем кнопку через 1 секунду после загрузки
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://t.me/cpckrasnoyarsk2026"
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.telegramBtn} ${isVisible ? styles.visible : ''}`}
      aria-label="Подписаться на Telegram-канал"
    >
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM23.8988 10.8037L21.4494 22.7012C21.2744 23.5163 20.7719 23.7325 20.0625 23.3362L15.9169 20.3037L13.9169 22.2137C13.7013 22.4294 13.52 22.6106 13.1013 22.6106L13.3894 18.3819L21.0025 11.5269C21.3269 11.2394 20.9288 11.0794 20.4975 11.3669L11.0606 17.2619L7.00125 16.0056C6.20438 15.7519 6.18813 15.1831 7.17063 14.7869L22.7788 8.86188C23.4338 8.60813 24.0138 9.00875 23.8988 10.8037Z" fill="currentColor"/>
      </svg>
    </a>
  )
}
