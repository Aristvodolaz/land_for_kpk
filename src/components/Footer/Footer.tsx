import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>О курсах</h3>
            <p className={styles.text}>
              Официальная программа повышения квалификации для педагогов Красноярского края.
              Полностью дистанционный формат с поддержкой на всех этапах.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Курсы</h3>
            <ul className={styles.list}>
              <li><Link href="/physics">Физика</Link></li>
              <li><Link href="/chemistry">Химия</Link></li>
              <li><Link href="/biology">Биология</Link></li>
              <li><Link href="/mathematics">Математика</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Контакты</h3>
            <ul className={styles.list}>
              <li>Телефон: <a href="tel:+79164241224">+7 (916) 424-12-24</a></li>
              <li>Телефон: <a href="tel:+79809702164">+7 (980) 970-21-64</a></li>
              <li>Email: <a href="mailto:regions@cpm.moscow">regions@cpm.moscow</a></li>
              <li><a href="https://t.me/cpckrasnoyarsk2026" target="_blank" rel="noopener noreferrer">Telegram-канал</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} КПК для педагогов. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
