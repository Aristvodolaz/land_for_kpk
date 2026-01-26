# 📧 Интеграция формы обратной связи

Инструкции по подключению формы к различным сервисам и backend.

---

## 📋 ТЕКУЩЕЕ СОСТОЯНИЕ

**Форма уже работает:**
- ✅ Открывается по клику на кнопку "Задать вопрос"
- ✅ Валидация полей (имя, email, сообщение — обязательны)
- ✅ Закрывается по клику на крестик, overlay или ESC
- ✅ Адаптивна для мобильных

**Что нужно добавить:**
Реальную отправку данных на сервер или email.

---

## 🚀 СПОСОБ 1: Formspree (самый простой)

**Плюсы:** Бесплатно до 50 отправок/месяц, без backend  
**Минусы:** Ограничение на бесплатном тарифе

### Шаг 1: Регистрация

1. Перейдите на [formspree.io](https://formspree.io/)
2. Зарегистрируйтесь
3. Создайте новую форму
4. Скопируйте Form Endpoint (например: `https://formspree.io/f/xyzabc123`)

### Шаг 2: Интеграция

Откройте `js/main.js` и замените секцию отправки формы:

```javascript
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Отправка через Formspree
    fetch('https://formspree.io/f/ВАША_ФОРМА_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            closeModal();
            contactForm.reset();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Ошибка отправки');
            });
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке. Попробуйте позже.');
    });
});
```

**Готово!** Письма будут приходить на email, указанный при регистрации.

---

## 📧 СПОСОБ 2: EmailJS (без backend)

**Плюсы:** Бесплатно до 200 отправок/месяц, поддержка Gmail/Outlook  
**Минусы:** Требуется регистрация

### Шаг 1: Регистрация

1. Перейдите на [emailjs.com](https://www.emailjs.com/)
2. Зарегистрируйтесь
3. Подключите email-сервис (Gmail, Outlook, etc.)
4. Создайте Email Template
5. Скопируйте:
   - Service ID
   - Template ID
   - Public Key (User ID)

### Шаг 2: Подключение библиотеки

Добавьте в `<head>` в `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function(){
    emailjs.init("ВАШ_PUBLIC_KEY");
  })();
</script>
```

### Шаг 3: Интеграция

Обновите `js/main.js`:

```javascript
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Отправка через EmailJS
    emailjs.sendForm('ВАШ_SERVICE_ID', 'ВАШ_TEMPLATE_ID', contactForm)
        .then(function() {
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            closeModal();
            contactForm.reset();
        }, function(error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке. Попробуйте позже.');
        });
});
```

**Готово!** Письма будут приходить на указанный email.

---

## 🐘 СПОСОБ 3: PHP Backend (классика)

**Плюсы:** Полный контроль, можно сохранять в БД  
**Минусы:** Требуется хостинг с PHP

### Шаг 1: Создайте файл `send-mail.php`

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Проверка метода
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не разрешён']);
    exit;
}

// Получение данных
$name = htmlspecialchars($_POST['name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = htmlspecialchars($_POST['phone'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

// Валидация
if (empty($name) || !$email || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Заполните все обязательные поля']);
    exit;
}

// Email получателя
$to = 'your-email@example.com'; // ИЗМЕНИТЕ НА СВОЙ EMAIL

// Тема письма
$subject = 'Новое обращение с сайта КПК';

// Формирование письма
$emailBody = "Новое обращение с лендинга\n\n";
$emailBody .= "Имя: $name\n";
$emailBody .= "Email: $email\n";
$emailBody .= "Телефон: $phone\n";
$emailBody .= "Сообщение:\n$message\n";

// Заголовки
$headers = "From: noreply@yourdomain.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Отправка
if (mail($to, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка отправки письма']);
}
?>
```

### Шаг 2: Обновите `js/main.js`

```javascript
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Отправка на PHP backend
    fetch('send-mail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            closeModal();
            contactForm.reset();
        } else {
            throw new Error(data.error);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке. Попробуйте позже.');
    });
});
```

**Готово!** Загрузите `send-mail.php` на хостинг.

---

## 🚀 СПОСОБ 4: Node.js + Express + Nodemailer

**Плюсы:** Современный стек, гибкость  
**Минусы:** Требуется Node.js сервер

### Шаг 1: Создайте `server.js`

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Конфигурация транспорта
const transporter = nodemailer.createTransport({
    service: 'gmail', // или 'yandex', 'mail.ru'
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password' // Пароль приложения
    }
});

// Эндпоинт для отправки
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Валидация
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Заполните все поля' });
    }

    // Настройки письма
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient@example.com',
        subject: 'Новое обращение с сайта КПК',
        text: `
Имя: ${name}
Email: ${email}
Телефон: ${phone || 'Не указан'}
Сообщение:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка отправки' });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
```

### Шаг 2: Установите зависимости

```bash
npm install express nodemailer cors
```

### Шаг 3: Запустите сервер

```bash
node server.js
```

### Шаг 4: Обновите `js/main.js`

```javascript
fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('Спасибо за обращение!');
        closeModal();
        contactForm.reset();
    }
})
.catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке.');
});
```

---

## 📊 СПОСОБ 5: Google Forms (хак)

**Плюсы:** Бесплатно, автосбор в таблицу  
**Минусы:** Не очень красиво, редирект

### Инструкция:

1. Создайте Google Form
2. Получите ссылку формы
3. Измените кнопку в `index.html`:

```html
<a href="https://forms.gle/ВАША_ФОРМА" target="_blank" class="btn btn--secondary">
    Задать вопрос
</a>
```

**Примечание:** Форма откроется в новой вкладке.

---

## 🗄️ СПОСОБ 6: Telegram Bot (для быстрых уведомлений)

**Плюсы:** Моментальные уведомления, бесплатно  
**Минусы:** Требуется Telegram Bot API

### Шаг 1: Создайте бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. Скопируйте **Bot Token**

### Шаг 2: Получите Chat ID

1. Напишите боту любое сообщение
2. Откройте: `https://api.telegram.org/bot<ВАШ_TOKEN>/getUpdates`
3. Найдите `"chat":{"id":123456789}`

### Шаг 3: Обновите `js/main.js`

```javascript
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    const telegramMessage = `
🔔 Новое обращение с сайта

👤 Имя: ${data.name}
📧 Email: ${data.email}
📱 Телефон: ${data.phone || 'Не указан'}
💬 Сообщение:
${data.message}
    `;

    const botToken = 'ВАШ_BOT_TOKEN';
    const chatId = 'ВАШ_CHAT_ID';

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Спасибо за обращение!');
            closeModal();
            contactForm.reset();
        } else {
            throw new Error('Ошибка Telegram API');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке.');
    });
});
```

**Готово!** Обращения будут приходить в Telegram.

---

## 🔐 БЕЗОПАСНОСТЬ

### Рекомендации:

1. **Валидация на сервере** — всегда проверяйте данные
2. **Rate limiting** — ограничьте количество запросов (защита от спама)
3. **CAPTCHA** — добавьте reCAPTCHA для защиты отботов
4. **HTTPS** — обязательно используйте SSL-сертификат
5. **Санитизация** — очищайте входные данные от XSS

### Пример интеграции Google reCAPTCHA v3:

**В `<head>` добавьте:**

```html
<script src="https://www.google.com/recaptcha/api.js?render=ВАШ_SITE_KEY"></script>
```

**В `js/main.js`:**

```javascript
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    grecaptcha.ready(function() {
        grecaptcha.execute('ВАШ_SITE_KEY', {action: 'submit'}).then(function(token) {
            // Добавьте token к данным формы
            const formData = new FormData(contactForm);
            formData.append('recaptcha_token', token);

            // Отправьте форму с token
            // ... ваш код отправки
        });
    });
});
```

---

## 📈 АНАЛИТИКА ФОРМ

Отслеживайте конверсию форм через Google Analytics:

```javascript
// После успешной отправки
gtag('event', 'form_submit', {
    'event_category': 'Contact',
    'event_label': 'Question Form'
});
```

Или Яндекс.Метрика:

```javascript
ym(COUNTER_ID, 'reachGoal', 'form_submit');
```

---

## 🧪 ТЕСТИРОВАНИЕ

### Чек-лист перед запуском:

- [ ] Форма открывается и закрывается
- [ ] Валидация работает (попробуйте отправить пустую форму)
- [ ] Email приходит на правильный адрес
- [ ] Текст письма корректен
- [ ] Форма сбрасывается после отправки
- [ ] Модальное окно закрывается после отправки
- [ ] Работает на мобильных
- [ ] Нет ошибок в консоли браузера

---

## 📞 АЛЬТЕРНАТИВЫ ФОРМЕ

Если не хотите настраивать форму, используйте:

1. **Прямую ссылку на email:**
   ```html
   <a href="mailto:info@example.com?subject=Вопрос по курсу" class="btn btn--secondary">
       Написать на email
   </a>
   ```

2. **Ссылку на WhatsApp:**
   ```html
   <a href="https://wa.me/79001234567?text=Здравствуйте,%20у%20меня%20вопрос%20по%20курсу" class="btn btn--secondary">
       Написать в WhatsApp
   </a>
   ```

3. **Ссылку на Telegram:**
   ```html
   <a href="https://t.me/username" class="btn btn--secondary">
       Написать в Telegram
   </a>
   ```

---

## 🎯 РЕКОМЕНДАЦИЯ

**Для быстрого старта:** Используйте **Formspree** (Способ 1)  
**Для продакшена:** Используйте **PHP Backend** (Способ 3) или **Node.js** (Способ 4)  
**Для быстрых уведомлений:** Добавьте **Telegram Bot** (Способ 6) параллельно

---

**Версия:** 1.0.0  
**Дата:** Январь 2026
