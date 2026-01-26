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

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получаем данные формы
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            // Вывод данных в консоль (для отладки)
            console.log('Отправка формы:', data);

            // ЗДЕСЬ ДОБАВЬТЕ СВОЮ ЛОГИКУ ОТПРАВКИ:
            // - Отправка на backend (fetch/axios)
            // - Отправка через сервис (Formspree, Google Forms API)
            // - Отправка на email через PHP

            // Пример с fetch (замените URL на ваш):
            /*
            fetch('https://your-backend.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Успех:', result);
                alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
                closeModal();
                contactForm.reset();
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Попробуйте позже.');
            });
            */

            // Временное решение (для демо):
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            closeModal();
            contactForm.reset();
        });
    }

    // ============================================
    // ДЕБАГ-ИНФОРМАЦИЯ (только для разработки)
    // ============================================

    console.log('Лендинг загружен успешно');
    console.log('Количество секций:', sections.length);
    console.log('Количество анимируемых элементов:', cards.length);
});
