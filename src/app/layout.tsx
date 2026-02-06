import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import TelegramButton from '@/components/TelegramButton/TelegramButton'

export const metadata: Metadata = {
  title: 'Повышение квалификации для педагогов — Онлайн-курсы КПК',
  description: 'Онлайн-курсы повышения квалификации для учителей физики, химии, биологии и математики. Официальная программа, удобный формат, практическая польза.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Повышение квалификации для педагогов — Онлайн-курсы КПК',
    description: 'Курсы для учителей физики, химии, биологии и математики. Онлайн-формат, 24 ак.часа, удостоверение.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <TelegramButton />
      </body>
    </html>
  )
}
