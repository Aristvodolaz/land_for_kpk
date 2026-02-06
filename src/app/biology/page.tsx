'use client'

import { useState } from 'react'
import Link from 'next/link'
import Modal from '@/components/Modal/Modal'
import ContactForm from '@/components/ContactForm/ContactForm'
import styles from '../physics/physics.module.css'

export default function BiologyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Главная</Link> / <span>Биология</span>
          </div>
          <h1 className={styles.heroTitle}>Курсы повышения квалификации для учителей биологии</h1>
          <p className={styles.heroSubtitle}>
            Три направления подготовки: олимпиадная работа, подготовка к ЕГЭ и углубленное преподавание биологии.
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}>📚 3 модуля</span>
            <span className={styles.metaItem}>⏱️ 24 ак.часа каждый</span>
            <span className={styles.metaItem}>💻 Онлайн-формат</span>
            <span className={styles.metaItem}>📜 Удостоверение</span>
          </div>
        </div>
      </section>

      {/* ЗАГЛУШКА */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Программа курсов</h2>
          <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--color-text)', opacity: 0.7 }}>
            Полная информация о модулях будет добавлена в ближайшее время
          </p>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className={`section ${styles.finalCta}`}>
        <div className="container">
          <h2 className="section__title">Готовы начать обучение?</h2>
          <p className={styles.ctaText}>
            Выберите удобный модуль и пройдите повышение квалификации в комфортном темпе
          </p>
          <button 
            className="btn btn--primary btn--large"
            onClick={() => setIsModalOpen(true)}
          >
            Записаться на курс
          </button>
        </div>
      </section>

      {/* МОДАЛЬНОЕ ОКНО */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm preselectedCourse="biology" />
      </Modal>
    </>
  )
}
