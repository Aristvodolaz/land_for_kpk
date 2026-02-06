'use client'

import { useState } from 'react'
import Link from 'next/link'
import Modal from '@/components/Modal/Modal'
import ContactForm from '@/components/ContactForm/ContactForm'
import styles from './page.module.css'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* HERO */}
      <section id="hero" className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Повышение квалификации без перегрузки</h1>
          <p className={styles.heroSubtitle}>
            Курсы для учителей физики, химии, биологии и математики. Онлайн-формат с поддержкой на всех этапах.
          </p>
          <button className="btn btn--primary" onClick={() => setIsModalOpen(true)}>
            Выбрать курс
          </button>
          <p className={styles.heroNote}>
            Официальная программа повышения квалификации. Полностью дистанционный формат.
          </p>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТОТ КУРС УДОБЕН */}
      <section id="why-convenient" className="section">
        <div className="container">
          <h2 className="section__title">Почему этот курс удобен для учителя</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✓</div>
              <p className={styles.featureText}>Соответствует требованиям к КПК</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✓</div>
              <p className={styles.featureText}>Разработан с учётом реальной нагрузки педагогов</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✓</div>
              <p className={styles.featureText}>Без лишней теории и перегрузки</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✓</div>
              <p className={styles.featureText}>Только то, что можно применять на уроке</p>
            </div>
          </div>
        </div>
      </section>

      {/* ПРАКТИЧЕСКАЯ ПОЛЬЗА */}
      <section id="benefits" className="section">
        <div className="container">
          <h2 className="section__title">Что вы получите</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <h3>Готовые методические материалы</h3>
              <p>Шаблоны и примеры для использования на уроках</p>
            </div>
            <div className={styles.benefitItem}>
              <h3>Инструменты для экономии времени</h3>
              <p>Проверенные способы упростить подготовку к занятиям</p>
            </div>
            <div className={styles.benefitItem}>
              <h3>Рекомендации по работе с классом</h3>
              <p>Практические советы от опытных педагогов</p>
            </div>
            <div className={styles.benefitItem}>
              <h3>Шаблоны и примеры заданий</h3>
              <p>Готовые материалы для разных типов уроков</p>
            </div>
          </div>
        </div>
      </section>

      {/* КУРСЫ ПО ПРЕДМЕТАМ */}
      <section id="courses" className="section">
        <div className="container">
          <h2 className="section__title">Курсы по предметам</h2>
          <div className={styles.coursesGrid}>
            <Link href="/physics" className={styles.courseCard}>
              <div className={styles.courseIcon}>⚛️</div>
              <h3 className={styles.courseTitle}>Физика</h3>
              <p className={styles.courseDescription}>
                Олимпиадная подготовка, ЕГЭ и углубленное преподавание
              </p>
              <div className={styles.courseModules}>
                <span className={styles.metaBadge}>3 модуля</span>
                <span className={styles.metaBadge}>24 ак.часа</span>
              </div>
            </Link>

            <Link href="/chemistry" className={styles.courseCard}>
              <div className={styles.courseIcon}>🧪</div>
              <h3 className={styles.courseTitle}>Химия</h3>
              <p className={styles.courseDescription}>
                Олимпиадная подготовка, ЕГЭ и углубленное преподавание
              </p>
              <div className={styles.courseModules}>
                <span className={styles.metaBadge}>3 модуля</span>
                <span className={styles.metaBadge}>24 ак.часа</span>
              </div>
            </Link>

            <Link href="/biology" className={styles.courseCard}>
              <div className={styles.courseIcon}>🧬</div>
              <h3 className={styles.courseTitle}>Биология</h3>
              <p className={styles.courseDescription}>
                Олимпиадная подготовка, ЕГЭ и углубленное преподавание
              </p>
              <div className={styles.courseModules}>
                <span className={styles.metaBadge}>3 модуля</span>
                <span className={styles.metaBadge}>24 ак.часа</span>
              </div>
            </Link>

            <Link href="/mathematics" className={styles.courseCard}>
              <div className={styles.courseIcon}>📐</div>
              <h3 className={styles.courseTitle}>Математика</h3>
              <p className={styles.courseDescription}>
                Олимпиадная подготовка, ЕГЭ и углубленное преподавание
              </p>
              <div className={styles.courseModules}>
                <span className={styles.metaBadge}>3 модуля</span>
                <span className={styles.metaBadge}>24 ак.часа</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ФОРМАТ ОБУЧЕНИЯ */}
      <section id="format" className="section">
        <div className="container">
          <h2 className="section__title">Как проходит обучение</h2>
          <div className={styles.formatGrid}>
            <div className={styles.formatItem}>
              <h3>Онлайн, из любого места</h3>
              <p>Учитесь дома или в школе — там, где вам удобно</p>
            </div>
            <div className={styles.formatItem}>
              <h3>Доступ 24/7</h3>
              <p>Материалы доступны в любое время суток</p>
            </div>
            <div className={styles.formatItem}>
              <h3>Понятная платформа</h3>
              <p>Простой интерфейс, с которым легко разобраться</p>
            </div>
            <div className={styles.formatItem}>
              <h3>Поддержка куратора</h3>
              <p>Техническая поддержка и консультации на всех этапах</p>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="section__title">Мнение педагогов</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Курс помог структурировать знания и получить новые методики для работы с олимпиадниками. Всё чётко и по делу."
              </p>
              <p className={styles.testimonialAuthor}>— Елена К., учитель физики</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Удобный формат, можно проходить в своём темпе. Материалы действительно пригодились в работе."
              </p>
              <p className={styles.testimonialAuthor}>— Михаил Р., учитель химии</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Понравилось, что всё практично — без лишней теории. Уже применяю полученные знания на уроках."
              </p>
              <p className={styles.testimonialAuthor}>— Ольга В., учитель биологии</p>
            </div>
          </div>
        </div>
      </section>

      {/* МОДАЛЬНОЕ ОКНО */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </>
  )
}
