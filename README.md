# Теревені (Tereveni)

> Сучасна соціальна мережа для спілкування, обміну думок та дискусій

[![Vercel](https://img.shields.io/badge/Live%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://widi-rho.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-GitHub-181717?style=flat-square&logo=github)](https://github.com/SehiiKolesnykov/final_project_back_2025)

---

## Про проект

Теревені — це соціальна мережа, створена як альтернатива X (Twitter). Платформа дозволяє користувачам ділитися думками, коментувати пости, підписуватися на інших користувачів, вести особисті переписки та взаємодіяти через систему лайків і збережень.

---

## Функціонал

#### Автентифікація

- Реєстрація та вхід через email/пароль
- Авторизація через Google OAuth
- JWT токени для безпечних сесій
- Автоматичне оновлення токенів

#### Робота з постами

- Створення постів з текстом та зображеннями
- Редагування власних постів
- Видалення постів
- Завантаження зображень через Cloudinary
- Сортування постів (найновіші, найпопулярніші, за кількістю коментарів)

#### Взаємодія

- Коментарі до постів
- Лайки
- Збереження постів в обране
- Підписки на користувачів
- Система сповіщень у реальному часі (WebSocket)
- Чат між користувачами (WebSocket)

#### Пошук

- Пошук постів за вмістом
- Пошук користувачів за ім'ям та прізвищем
- Фільтрація в реальному часі

#### UX/UI

- Адаптивний дизайн
- Безкінечний скрол постів (infinite scroll)
- Модальні вікна для підтвердження дій
- Темна тема

---

## Технологічний стек

### Frontend

```
├── React 18 + Vite           # Швидкий dev server та build
├── Redux Toolkit             # Управління стейтом
├── React Router v6           # Маршрутизація
├── Styled Components         # CSS-in-JS стилізація
├── WebSocket                 # Реальний час (чат, сповіщення)
├── Cloudinary SDK            # Завантаження зображень
└── PropTypes                 # Валідація пропсів
```

### Backend

```
├── Spring Boot (Java)        # RESTful API
├── PostgreSQL                # База даних
├── JWT                       # Аутентифікація
└── Cloudinary                # Зберігання зображень
```

**[ Повна документація Backend API](https://github.com/SehiiKolesnykov/final_project_back_2025)**

---

## Встановлення та запуск

### Передумови

- Node.js 18+ та npm

### 1. Клонування репозиторію

```bash
# Frontend
git clone https://github.com/yarvil/widi.git
```

### 2. Налаштування Frontend

```bash
# Встановлення залежностей
npm install

# Створення .env файлу (опціонально)
# VITE_API_URL=http://localhost:5173

# Запуск dev сервера
npm run dev
```

Додаток буде доступний на `http://localhost:5173`

### 4. Build для продакшену

```bash
npm run build
npm run preview  # Перегляд production білда
```

---

## Структура проєкту

```
src/
├── api/                          # API клієнт та запити
│   ├── auth.js                   # Автентифікація
│   ├── posts.js                  # Пости
│   ├── comments.js               # Коментарі
│   ├── users.js                  # Користувачі
│   ├── messages.js               # Чат
│   ├── notifications.js          # Сповіщення
│   └── client.js                 # Базовий клієнт
├── app/                          # Конфігурація додатку
│   ├── store/                    # Redux store
│   │   ├── authentication/
│   │   ├── posts/
│   │   ├── users/
│   │   ├── chat/
│   │   ├── notifications/
│   │   └── follows/
│   ├── router/                   # React Router конфігурація
│   └── styles/                   # Глобальні стилі
├── hooks/                        # Кастомні React хуки
│   ├── usePostActions.js
│   ├── useUser.js
│   ├── useChatWebSocket.js            # WebSocket для чату
│   └── useNotificationsSocket.js      # WebSocket для сповіщень
├── pages/                        # Сторінки додатку
│   ├── auth/                     # Реєстрація/логін
│   ├── feed/                     # Головна стрічка
│   ├── post/                     # Детальна сторінка поста
│   ├── profile/                  # Профіль користувача
│   ├── chat/                     # Месенджер
│   ├── follow/                   # Підписки
│   ├── Notifications/            # Сповіщення
│   └── FavoriteList/             # Збережені пости
├── shared/                       # Переиспользуємі компоненти
│   ├── ui/                       # UI компоненти (кнопки, модалки, хедер)
│   ├── components/               # Бізнес-компоненти (PostCard, UserCard)
│   ├── assets/                   # Іконки, логотипи
│   └── utils/                    # Допоміжні функції
└── main.jsx                      # Точка входу
```

---

## Основні можливості коду

### Redux архітектура

- **Redux Toolkit** з `createSlice` та `createAsyncThunk`
- Нормалізація даних з бекенду
- Оптимістичні UI оновлення для лайків та збережень
- Пагінація з infinite scroll

### WebSocket інтеграція

- **Чат**: Приватні повідомлення у реальному часі через STOMP
- **Сповіщення**: Миттєві оновлення про лайки, коментарі, підписки
- Автоматичне перепідключення при розриві з'єднання

### Компоненти

- Styled Components
- Адаптивний дизайн
- Перевикористовувані UI компоненти
- PropTypes

### Оптимізації

- Lazy loading маршрутів
- Debounce для пошуку
- Оптимістичні оновлення UI

---

## Деплой

**Frontend:** [Vercel](https://widi-rho.vercel.app/)  
**Backend:** [Backend репозиторій](https://github.com/SehiiKolesnykov/final_project_back_2025)

---

## Команда розробників

| Роль               | GitHub                                                   |
| ------------------ | -------------------------------------------------------- |
| Frontend Developer | [@yarvil](https://github.com/yarvil)                     |
| Frontend Developer | [@Kosta45](https://github.com/Kosta45)                   |
| Frontend Developer | [@Mykola-Pyshnyuk](https://github.com/Mykola-Pyshnyuk)   |
| Frontend Developer | [@ruslanivanovich](https://github.com/ruslanivanovich)   |
| Frontend Developer | [@arcanit33](https://github.com/arcanit33)               |
| Backend Developer  | [@SehiiKolesnykov](https://github.com/SehiiKolesnykov)   |
| Backend Developer  | [@OleksiiZharkov](https://github.com/OleksiiZharkov)     |
| Backend Developer  | [@Olenka19965](https://github.com/Olenka19965)           |
| Backend Developer  | [@AndreychykViktor](https://github.com/AndreychykViktor) |

---

## Примітки

Проєкт створено з навчальною метою. Деякі функції можуть бути спрощені порівняно з повноцінно працюючими додатками, велику частину функціоналу не реалізовано через брак часу та складною ситуацією зі світлом. Ми обговоримо з командою щодо подальшої підтримки проєкту але вже в зручному темпі для подальшого використання його як pet проєкт для своїх портфоліо.

Це наш перший проєкт, який був створений у великій (для нас велика) команді, тому присутні помилки та дублювання у коді, трохи хаосу в комітах, та загальна структура проєкту потребує ретельного перегляду. Без реальної практики цих проблем неможливо уникнути і певний досвід ми отримали.
