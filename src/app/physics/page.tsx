'use client'

import { useState } from 'react'
import Link from 'next/link'
import Modal from '@/components/Modal/Modal'
import ContactForm from '@/components/ContactForm/ContactForm'
import { physicsCourse } from '@/data/courses'
import styles from './physics.module.css'

export default function PhysicsPage() {
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
            <Link href="/">Главная</Link> / <span>Физика</span>
          </div>
          <h1 className={styles.heroTitle}>{physicsCourse.title}</h1>
          <p className={styles.heroSubtitle}>{physicsCourse.description}</p>
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

          {physicsCourse.modules.map((module) => (
            <div key={module.number} className={styles.moduleDetailed}>
              <div className={styles.moduleHeader}>
                <div className={styles.moduleNumber}>Модуль {module.number}</div>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <div className={styles.moduleHours}>{module.hours} академических часа</div>
              </div>

              <div className={styles.moduleContent}>
                <div className={styles.moduleSection}>
                  <h4>Содержание модуля:</h4>
                  <ul>
                    {module.content.map((item, index) => {
                      const [title, ...description] = item.split(':')
                      return (
                        <li key={index}>
                          <strong>{title}:</strong>
                          {description.join(':')}
                        </li>
                      )
                    })}
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

      {/* СПИКЕРЫ */}
      <section id="speakers" className="section">
        <div className="container">
          <h2 className="section__title">Спикеры курсов</h2>
          <p className={styles.speakersIntro}>
            Курс ведут практикующие специалисты, понимающие реальную работу школы
          </p>

          {physicsCourse.modules.map((module) => (
            <div key={module.number} className={styles.speakerModule}>
              <h3 className={styles.speakerModuleTitle}>
                Модуль {module.number}: {module.title}
              </h3>
              
              <div className={styles.speakersGrid}>
                {/* Методист */}
                <div className={styles.speakerCard}>
                  <div className={styles.speakerPhoto}>
                    <img src={module.methodist.photo} alt={module.methodist.name} />
                  </div>
                  <div className={styles.speakerInfo}>
                    <div className={styles.speakerRole}>Методист</div>
                    <h4 className={styles.speakerName}>{module.methodist.name}</h4>
                    <p className={styles.speakerBio}>{module.methodist.bio}</p>
                  </div>
                </div>

                {/* Лекторы */}
                {module.lecturers.map((lecturer, index) => (
                  <div key={index} className={styles.speakerCard}>
                    <div className={styles.speakerPhoto}>
                      <img src={lecturer.photo} alt={lecturer.name} />
                    </div>
                    <div className={styles.speakerInfo}>
                      <div className={styles.speakerRole}>Приглашенный лектор</div>
                      <h4 className={styles.speakerName}>{lecturer.name}</h4>
                      <p className={styles.speakerBio}>{lecturer.bio}</p>
                    </div>
                  </div>
                ))}
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
        <ContactForm preselectedCourse={selectedModule} />
      </Modal>
    </>
  )
}
