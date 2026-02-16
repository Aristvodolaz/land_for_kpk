import Link from 'next/link'
import { biologyCourse } from '@/data/courses'
import styles from '../physics/physics.module.css'

export default function BiologyPage() {

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
            <span className={styles.metaItem}>⏱️ 72 ак.часа</span>
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* СПИКЕРЫ */}
      <section id="speakers" className="section">
        <div className="container">
          <h2 className="section__title">Спикеры курса</h2>
          <div className={styles.speakersGrid}>
            {biologyCourse.speakers.map((speaker, index) => (
              <div key={index} className={styles.speakerCard}>
                <h3 className={styles.speakerName}>{speaker.name}</h3>
                <p className={styles.speakerRole}>{speaker.role}</p>
                <p className={styles.speakerBio}>{speaker.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
