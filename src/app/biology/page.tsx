'use client'

import { useState } from 'react'
import Link from 'next/link'
import Modal from '@/components/Modal/Modal'
import ContactForm from '@/components/ContactForm/ContactForm'
import { biologyCourse } from '@/data/courses'
import styles from '../physics/physics.module.css'

export default function BiologyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState('')

  const handleEnroll = (moduleTitle: string) => {
    setSelectedModule(moduleTitle)
    setIsModalOpen(true)
  }

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Главная</Link> / <span>Биология</span>
          </div>
          <h1 className={styles.heroTitle}>{biologyCourse.title}</h1>
          <p className={styles.heroSubtitle}>{biologyCourse.description}</p>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}>📚 3 модуля</span>
            <span className={styles.metaItem}>⏱️ 24 ак.часа каждый</span>
            <span className={styles.metaItem}>💻 Онлайн-формат</span>
            <span className={styles.metaItem}>📜 Удостоверение</span>
          </div>
        </div>
      </section>

      {/* ПРОГРАММА КУРСОВ */}
      <section id="program" className="section">
        <div className="container">
          <h2 className="section__title">Программа курсов</h2>

          {biologyCourse.modules.map((module) => (
            <div key={module.number} className={styles.moduleDetailed}>
              <div className={styles.moduleHeader}>
                <div className={styles.moduleNumber}>Модуль {module.number}</div>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <div className={styles.moduleMetaGroup}>
                  <div className={styles.moduleHours}>{module.hours} ак.часов</div>
                  <div className={styles.moduleDates}>{module.dates}</div>
                </div>
              </div>

              <div className={styles.moduleContent}>
                <div className={styles.moduleSection}>
                  <h4>Содержание модуля:</h4>
                  <ul>
                    {module.content.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>

                <div className={styles.moduleSection}>
                  <h4>Практические результаты:</h4>
                  <div className={styles.resultsGrid}>
                    {module.results.map((result, index) => (
                      <div key={index} className={styles.resultItem}>
                        <div className={styles.resultIcon}>✓</div>
                        <p>{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.moduleSection}>
                  <h4>Для кого:</h4>
                  <p className={styles.audienceText}>{module.audience}</p>
                </div>

                <div className={styles.ctaBlock}>
                  <p>Готовы пройти этот модуль?</p>
                  <button 
                    className="btn btn--primary"
                    onClick={() => handleEnroll(module.title)}
                  >
                    Записаться на модуль
                  </button>
                </div>
              </div>
            </div>
          ))}
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
