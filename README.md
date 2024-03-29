# Тестовое задание для Frontend-разработчика
## _Фронтенд-часть сервиса сокращения ссылок_

Развернутый сервер  https://shorter-azure.vercel.app/
## Описание проекта
Этот проект представляет собой фронтенд-часть сервиса сокращения ссылок. Основной функционал сервиса включает в себя создание коротких ссылок на основе произвольных URL-адресов, а также отслеживание количества переходов по этим ссылкам. Пользователи могут зарегистрироваться, авторизоваться, создавать короткие ссылки и просматривать статистику переходов по ним.
## Технологии
Проект реализован с использованием фреймворка React и различных библиотек для обеспечения функциональности:
-  React Router: для маршрутизации
- Axios: для работы с HTTP-запросами
- Material-UI: для создания пользовательского интерфейса
-  Redux Toolkit: для управления состоянием приложения
- Formik: для управления формами и их валидации
- Yup: для схемы валидации данных форм
- React Copy to Clipboard: для копирования коротких ссылок
- Redux Logger: для логирования состояния Redux во время разработки
- React Router DOM: для управления маршрутами в React-приложении

## Функциональность
Проект состоит из следующих страниц:

1. Страница регистрации
2. Страница авторизации
3. Основная страница, предоставляющая следующие возможности:
- Просмотр статистики по созданным ссылкам в виде таблицы
- Пагинация таблицы, работающая на стороне сервера
- Сортировка таблицы по различным столбцам
- Копирование коротких ссылок при клике на них

Для запуска проекта на локальной машине выполните следующие шаги:

Склонируйте репозиторий

Перейдите в директорию проекта:
```sh
cd project-directory
```

Установите зависимости:
```sh
npm install
```

Запустите проект:
```sh
npm start
```

Откройте браузер и перейдите по адресу http://localhost:3000



Если у вас возникли вопросы или проблемы с запуском проекта, обращайтесь к автору.

Автор
Пастухова Ксения
 https://t.me/KsShepherd
