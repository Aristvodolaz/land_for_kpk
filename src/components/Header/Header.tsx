'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Modal from '@/components/Modal/Modal'
import ContactForm from '@/components/ContactForm/ContactForm'
import styles from './Header.module.css'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link href="/" onClick={closeMenu}>
              КПК для педагогов
            </Link>
          </div>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link href="/#why-convenient" className={styles.navLink} onClick={closeMenu}>
                  Преимущества
                </Link>
              </li>
              <li className={`${styles.navItem} ${styles.navItemDropdown}`}>
                <span className={styles.navLink}>Курсы ▾</span>
                <ul className={styles.dropdown}>
                  <li>
                    <Link href="/physics" className={styles.dropdownLink} onClick={closeMenu}>
                      Физика
                    </Link>
                  </li>
                  <li>
                    <Link href="/chemistry" className={styles.dropdownLink} onClick={closeMenu}>
                      Химия
                    </Link>
                  </li>
                  <li>
                    <Link href="/biology" className={styles.dropdownLink} onClick={closeMenu}>
                      Биология
                    </Link>
                  </li>
                  <li>
                    <Link href="/mathematics" className={styles.dropdownLink} onClick={closeMenu}>
                      Математика
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={styles.navItem}>
                <Link href="/#testimonials" className={styles.navLink} onClick={closeMenu}>
                  Отзывы
                </Link>
              </li>
            </ul>
            <button 
              className="btn btn--primary btn--small" 
              onClick={() => {
                closeMenu()
                setIsModalOpen(true)
              }}
            >
              Записаться
            </button>
          </nav>

          <button
            className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ''}`}
            onClick={toggleMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </header>
  )
}
