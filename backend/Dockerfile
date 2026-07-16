# Sử dụng Node.js LTS làm base image
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies (bao gồm cả devDependencies để có tsc)
RUN npm install

# Copy toàn bộ mã nguồn backend
COPY . .

# Biên dịch TypeScript sang JavaScript trong thư mục dist/
RUN npx tsc

# Mở cổng port 5000 cho backend
EXPOSE 5000

# Sử dụng dist/index.js đã biên dịch để chạy trong Docker
CMD ["node", "dist/index.js"]
