// ============================================
// ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    // Обработка всех ссылок с якорями
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Плавная прокрутка к элементу с учётом header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Закрываем мобильное меню
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ============================================
    // HEADER - БУРГЕР МЕНЮ
    // ============================================

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Блокируем/разблокируем прокрутку при открытом меню
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Добавляем тень header при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
    // ============================================

    const observerOptions = {
        root: null,
        threshold: 0.1, // Элемент считается видимым при 10% видимости
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс видимости
                entry.target.classList.add('visible');
                // Отключаем наблюдение после срабатывания
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми секциями
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Наблюдаем за карточками
    const cards = document.querySelectorAll('.feature-card, .format-card, .module-card, .speaker-card, .testimonial-card');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // ============================================
    // ОТСЛЕЖИВАНИЕ АКТИВНОЙ СЕКЦИИ (опционально)
    // ============================================

    const sectionsForTracking = document.querySelectorAll('section[id]');
    
    const trackingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Можно использовать для подсветки навигации, если будет добавлена
                console.log('Активная секция:', id);
            }
        });
    }, {
        threshold: 0.5 // Секция считается активной при 50% видимости
    });

    sectionsForTracking.forEach(section => {
        trackingObserver.observe(section);
    });

    // ============================================
    // УЛУЧШЕНИЕ ДОСТУПНОСТИ
    // ============================================

    // Добавляем фокус-видимость для клавиатурной навигации
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // ============================================
    // МОДАЛЬНОЕ ОКНО
    // ============================================

    const modal = document.getElementById('modal');
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modalClose = document.querySelector('.modal__close');
    const modalOverlay = document.querySelector('.modal__overlay');

    // Открытие модального окна
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }

    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }

    // Обработчики событий для открытия
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Обработчики событий для закрытия
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ============================================
    // ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ
    // ============================================

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formSuccess = document.getElementById('form-success');

    // Валидация в реальном времени
    const inputs = contactForm.querySelectorAll('.form__input, .form__textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Функция валидации поля
    function validateField(field) {
        const errorSpan = document.querySelector(`[data-error-for="${field.id}"]`);
        let errorMessage = '';

        // Проверка на пустое обязательное поле
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorMessage = 'Это поле обязательно для заполнения';
        }
        // Проверка минимальной длины
        else if (field.hasAttribute('minlength')) {
            const minLength = field.getAttribute('minlength');
            if (field.value.length < minLength && field.value.length > 0) {
                errorMessage = `Минимум ${minLength} символов`;
            }
        }
        // Проверка email
        else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorMessage = 'Введите корректный email';
            }
        }
        // Проверка телефона
        else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                errorMessage = 'Введите корректный номер телефона';
            }
        }

        // Отображение ошибки
        if (errorMessage) {
            field.classList.add('error');
            field.classList.remove('success');
            if (errorSpan) {
                errorSpan.textContent = errorMessage;
                errorSpan.classList.add('visible');
            }
            return false;
        } else if (field.value) {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorSpan) {
                errorSpan.classList.remove('visible');
            }
            return true;
        } else {
            field.classList.remove('error', 'success');
            if (errorSpan) {
                errorSpan.classList.remove('visible');
            }
            return true;
        }
    }

    // Глобальная функция для сброса формы (вызывается из HTML)
    window.resetForm = function() {
        contactForm.style.display = 'flex';
        formSuccess.style.display = 'none';
        contactForm.reset();
        
        // Убираем классы валидации
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        closeModal();
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Валидация всех полей
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            // Проверка чекбокса согласия
            const agreementCheckbox = document.getElementById('agreement');
            const agreementError = document.querySelector('[data-error-for="agreement"]');
            
            if (!agreementCheckbox.checked) {
                agreementError.textContent = 'Необходимо согласие на обработку данных';
                agreementError.classList.add('visible');
                isValid = false;
            } else {
                agreementError.classList.remove('visible');
            }

            if (!isValid) {
                return;
            }

            // Получаем данные формы
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            // Показываем индикатор загрузки
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Вывод данных в консоль (для отладки)
            console.log('Отправка формы:', data);

            // ЗДЕСЬ ДОБАВЬТЕ СВОЮ ЛОГИКУ ОТПРАВКИ:
            // Раскомментируйте нужный блок и настройте под свой backend

            // === ВАРИАНТ 1: Formspree ===
            /*
            try {
                const response = await fetch('https://formspree.io/f/ВАША_ФОРМА_ID', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showSuccessMessage();
                } else {
                    throw new Error('Ошибка отправки');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Попробуйте позже.');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
            */

            // === ВАРИАНТ 2: Свой backend ===
            /*
            try {
                const response = await fetch('send-mail.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    showSuccessMessage();
                } else {
                    throw new Error(result.error || 'Ошибка отправки');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Попробуйте позже.');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
            */

            // === ВРЕМЕННОЕ РЕШЕНИЕ (для демо) ===
            // Имитация отправки с задержкой
            setTimeout(() => {
                showSuccessMessage();
            }, 1500);
        });
    }

    // Показ сообщения об успехе
    function showSuccessMessage() {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
    }

    // ============================================
    // ДЕБАГ-ИНФОРМАЦИЯ (только для разработки)
    // ============================================

    console.log('Лендинг загружен успешно');
    console.log('Количество секций:', sections.length);
    console.log('Количество анимируемых элементов:', cards.length);
});
