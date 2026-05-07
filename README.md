# Space Flow: NestJS & Next.js

Современный стак технологии обеспечивающую отлично эффективную и модульно развиваемый проект. Проект позволяет вам хранить данные связанные c фотографиями космоческих объектов с их характеристикой.

---

## 🏗 Технологический Стек

### **💻 Frontend (`/nextjs1`)**

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4.1](https://tailwindcss.com/) — использование последних возможностей JIT.
- **Data Fetching:** [Tanstack Query](https://tanstack.com/query/latest) — легкое кэширование и ревалидация данных.
- **CSS Motion:** [Motion.dev](https://motion.dev/docs/react) — интересные возможностей в стилях.
- **Tree-shakable :** [react-parallax-tilt](https://www.npmjs.com/package/react-parallax-tilt) — добовляет объёмность айтемам(card) относительно положения курсора на карточке.
- **Generated API:** [orval](https://orval.dev/) — позволяет при должной настройки, генерировать полноценный API со всеми инстансами и дто-объёктами
- **Utilities:** `clsx`, `tailwind-merge` для удобной работы с классами, позволяющий их объединять и задавать необходимые условия как вам будет удобно.

### **⚙️ Backend (`/nestjs2`)**

- **Framework:** [NestJS](https://nestjs.com/)
- **Validation:** `class-validator` и `class-transformer` для строгой типизации DTO.
- **Prisma:** [PrismaORM](https://www.prisma.io/orm) лучшая ORM для работы с базами данными
- **API Docs:** [Swagger/OpenAPI](https://swagger.io/) — автогенерация документации эндпоинтов.
- **Security** [Argon2](https://www.npmjs.com/package/argon2) — один из лучших хеширующих пароли библетокета, безопасность которого на достаточно высок уровни.

---

## 🛠 Запуск проекта

### 1. Требования

- **Docker** и **Docker Compose**
- **Node.js** (рекомендуется v20+)
- **MongoDB** (локально или через Docker)

## 2. Настройка окружения

Перед запуском вручную необходимо настроить переменные окружения. Создайте файл `.env` в обеих папка на основе примера:

```env в fronend
NEXT_PUBLIC_ACCESS_TOKEN_2GIS="ваш-токен-2GIS"
NEXT_PUBLIC_ACCESS_API_URL="http://localhost:5000"
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

```env в backend
DATABASE_URL="postgresql://username:password@localhost:5432/db?schema=public"
JWT_SECRET="ваш секрет"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=ваш порт
SMTP_USER=почта пользователя с которой будет присылаться код-верификации
SMTP_PASS=пароль приложения (16 букв) этого пользователя(не путать с обычным паролем)
```

##3. Быстрый старт (Docker) 🐳
Запустите всё приложение целиком (фронтенд, бэкенд и базу данных) одной командой из корневой директории:

```Bash
docker-compose up --build
```

## 4. Локальная разработка

Если вы хотите запустить части проекта по отдельности(вручеую):

### Бэкенд:

```Bash
cd nestjs/prisma
npm install
npm run start:dev
```

### Фронтенд:

```Bash
cd my-heroui-app
npm install
npm run dev
```

Если вы хотите выйти из дочерней папки в родительский:

```Bash
cd ..

```

## 📑 API Документация

После запуска бэкенда, интерактивная документация Swagger доступна для тестирования эндпоинтов по адресу: 👉 http://localhost:3000/api или по ссылке в терминале после "npm run start:dev"
