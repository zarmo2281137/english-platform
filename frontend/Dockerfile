# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Копіюємо manifest-файли залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Надаємо права на виконання інструментам у node_modules/.bin (виправляє помилку Permission denied)
RUN chmod -R +x node_modules/.bin

# Копіюємо весь вихідний код
COPY . .

# Збираємо проєкт
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Копіюємо зібрані статичні файли у папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копіюємо кастомний конфіг Nginx (якщо є) або залишаємо стандартний порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]