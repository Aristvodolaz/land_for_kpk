'use client'

import { useState, FormEvent } from 'react'
import styles from './ContactForm.module.css'

interface ContactFormProps {
  preselectedCourse?: string
}

export default function ContactForm({ preselectedCourse }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: preselectedCourse || '',
    message: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон'
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный телефон'
    }

    if (!formData.course) {
      newErrors.course = 'Выберите курс'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Симуляция отправки (замените на реальный API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Отправка формы:', formData)
      
      setIsSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: preselectedCourse || '',
        message: ''
      })
      
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
      
    } catch (error) {
      console.error('Ошибка отправки:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Убираем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>Спасибо за заявку!</h3>
        <p>Мы свяжемся с вами в ближайшее время</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Записаться на курс</h2>
      <p className={styles.formSubtitle}>
        Оставьте заявку и мы свяжемся с вами для уточнения деталей
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>
          Ваше имя <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
          placeholder="Иван Иванов"
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
          placeholder="ivan@example.com"
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.formLabel}>
          Телефон <span className={styles.required}>*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`${styles.formInput} ${errors.phone ? styles.error : ''}`}
          placeholder="+7 (999) 123-45-67"
        />
        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="course" className={styles.formLabel}>
          Выберите курс <span className={styles.required}>*</span>
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          className={`${styles.formSelect} ${errors.course ? styles.error : ''}`}
        >
          <option value="">Выберите курс</option>
          <optgroup label="Физика">
            <option value="physics-olympiad">Олимпиадная подготовка по физике</option>
            <option value="physics-ege">Подготовка к ЕГЭ по физике</option>
            <option value="physics-advanced">Углубленное преподавание физики</option>
          </optgroup>
          <optgroup label="Химия">
            <option value="chemistry-olympiad">Олимпиадная подготовка по химии</option>
            <option value="chemistry-ege">Подготовка к ЕГЭ по химии</option>
            <option value="chemistry-advanced">Углубленное преподавание химии</option>
          </optgroup>
          <optgroup label="Биология">
            <option value="biology-olympiad">Олимпиадная подготовка по биологии</option>
            <option value="biology-ege">Подготовка к ЕГЭ по биологии</option>
            <option value="biology-advanced">Углубленное преподавание биологии</option>
          </optgroup>
          <optgroup label="Математика">
            <option value="math-olympiad">Олимпиадная подготовка по математике</option>
            <option value="math-ege">Подготовка к ЕГЭ по математике</option>
            <option value="math-advanced">Углубленное преподавание математики</option>
          </optgroup>
        </select>
        {errors.course && <span className={styles.errorText}>{errors.course}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.formLabel}>
          Комментарий (необязательно)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={styles.formTextarea}
          placeholder="Дополнительная информация или вопросы..."
          rows={4}
        />
      </div>

      <button 
        type="submit" 
        className={`btn btn--primary ${styles.submitBtn} ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>

      <p className={styles.formNote}>
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  )
}
