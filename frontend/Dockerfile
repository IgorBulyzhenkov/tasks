
# Базовый образ для Node.js
FROM node:18

# Рабочая директория
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код приложения
COPY . .

# Запускаем React-скрипт
CMD ["npm", "start"]
