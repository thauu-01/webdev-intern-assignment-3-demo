# Bước 1: Build ứng dụng React với Node.js
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Nhận biến API URL từ môi trường build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Bước 2: Dùng Nginx nhẹ để serve static files
FROM nginx:alpine

# Copy kết quả build từ bước 1 vào thư mục mặc định của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy file cấu hình Nginx để hỗ trợ SPA Routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
