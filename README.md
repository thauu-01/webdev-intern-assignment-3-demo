# Hệ Thống Tra Cứu Điểm Thi THPT 2024 - G-Scores
# Đề tài: G-Scores - Hệ Thống Tra Cứu & Thống Kê Điểm Thi THPT Quốc Gia 2024

## Giới thiệu chung

**G-Scores** là một hệ thống tra cứu và phân tích thống kê điểm thi tốt nghiệp THPT Quốc gia năm 2024 trực quan và tối ưu hiệu năng. Hệ thống quản lý và xử lý dữ liệu lớn thực tế từ hơn 1 triệu thí sinh, cho phép người dùng tra cứu điểm thi tức thời theo số báo danh, xem biểu đồ phân tích tỷ lệ học lực các môn học trên toàn quốc, và theo dõi bảng xếp hạng Top 10 thí sinh điểm cao nhất khối A.

## Mục lục (Table of Contents)

1. [Tính năng nổi bật](#tính-năng-nổi-bật-)
2. [Kiến trúc và Công nghệ](#kiến-trúc-và-công-nghệ-)
3. [Cấu hình & Cài đặt](#cấu-hình--cài-đặt-)
4. [Cách sử dụng](#cách-sử-dụng-)
5. [Liên hệ](#liên-hệ-)

---

## Tính năng nổi bật ✨

Các chức năng chính được xây dựng tối ưu hóa trải nghiệm người dùng trên mọi thiết bị:

### 1. Tra cứu điểm số theo SBD
* Tra cứu điểm số tức thì bằng cách nhập Số báo danh (đúng định dạng 8 chữ số).
* Hiển thị bảng điểm chi tiết các môn thi đã đăng ký của thí sinh.
* Phân loại tự động mức học lực của từng môn học (Giỏi, Khá, Trung bình, Yếu) dựa trên thuật toán OOP domain chặt chẽ.
* Ràng buộc dữ liệu biểu mẫu chặt chẽ (Validation logic ở cả Client và Server).

### 2. Thống kê & Báo cáo Điểm thi theo Môn học
* Tổng hợp và phân tích số lượng, phần trăm học sinh đạt 4 mức điểm:
  * **Giỏi**: Điểm số $\ge 8.0$
  * **Khá**: $6.0 \le \text{Điểm} < 8.0$
  * **Trung bình**: $4.0 \le \text{Điểm} < 6.0$
  * **Yếu**: Điểm số $< 4.0$
* Trực quan hóa dữ liệu qua biểu đồ cột tương tác **Recharts** mượt mà, hỗ trợ chuyển đổi linh hoạt giữa 9 môn học chính.

### 3. Bảng xếp hạng Top 10 Khối A
* Tính toán danh sách 10 thí sinh có tổng điểm 3 môn Toán, Vật lý, Hóa học cao nhất cả nước.
* Thuật toán loại trừ thông minh các thí sinh bị khuyết điểm ở một trong ba môn này.

### 4. Thiết kế Responsive & Chạy đa nền tảng
* Giao diện Light mode sang trọng, sử dụng font chữ chuyên nghiệp **Be Vietnam Pro** chống lỗi font.
* Hiển thị tối ưu và tự động co giãn tương thích trên Máy tính, Máy tính bảng và Điện thoại di động.

---

## Kiến trúc và Công nghệ 💻

Dự án được xây dựng theo mô hình **Client-Server** (tách biệt hoàn toàn Backend API và Frontend React SPA).

### Backend

| Công nghệ | Vai trò chính | Badge |
| :--- | :--- | :--- |
| **Node.js & Express** | Nền tảng server và xây dựng RESTful API bằng TypeScript | ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) |
| **MongoDB & Mongoose** | Hệ quản trị cơ sở dữ liệu và ODM tương tác dữ liệu lớn | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) |
| **TypeScript** | Định kiểu dữ liệu an toàn cho dự án Node.js | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **CSV Parser & Streams** | Xử lý streaming dữ liệu thô từ tệp 80MB (hơn 1 triệu bản ghi) không tốn RAM | ![CSV](https://img.shields.io/badge/CSV_Streams-333333?style=flat-square) |

### Frontend

| Công nghệ | Vai trò chính | Badge |
| :--- | :--- | :--- |
| **React** | Thư viện xây dựng giao diện người dùng | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) |
| **Vite** | Công cụ build frontend tối ưu tốc độ tải trang | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **React Router DOM** | Bộ định tuyến Client-side (Routing SPA) | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) |
| **Tailwind CSS** | Framework CSS thiết kế giao diện linh hoạt, hiện đại | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Recharts** | Thư viện vẽ biểu đồ phân phối điểm số tương tác | ![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square) |

---

## Cấu hình & Cài đặt 🔧

### 1. Clone Repository
```bash
git clone https://github.com/thauu-01/webdev-intern-assignment-3-demo.git
cd webdev-intern-assignment-3-demo
```

### 2. Cài đặt & Cấu hình Backend
Di chuyển vào thư mục backend và cài đặt thư viện:
```bash
cd backend
npm install
```

Tạo tệp `.env` trong thư mục `backend` và cấu hình biến môi trường sau:
```properties
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster_url>/g_scores?retryWrites=true&w=majority
CORS_ORIGINS=http://localhost:5173
```

Chạy migration tạo chỉ mục (index) và seeder nạp dữ liệu từ file CSV:
*(Yêu cầu tệp `diem_thi_thpt_2024.csv` phải có sẵn tại thư mục `dataset/`)*
```bash
npm run migrate:seed
```

Khởi chạy backend cục bộ ở chế độ phát triển:
```bash
npm run dev
```

### 3. Cài đặt & Cấu hình Frontend
Di chuyển vào thư mục frontend và cài đặt thư viện:
```bash
cd ../frontend
npm install
```

Tạo tệp `.env` trong thư mục `frontend` và cấu hình biến môi trường sau:
```properties
VITE_API_URL=http://localhost:5000/api
```

Khởi chạy frontend:
```bash
npm run dev
```

---

## 4. Triển khai bằng Docker 🐳

Dự án hỗ trợ chạy trọn gói nhanh chóng bằng Docker thông qua tệp cấu hình `docker-compose.yml` ở thư mục gốc (tự động chạy cả Frontend, Backend và database MongoDB cục bộ).

### Khởi chạy các dịch vụ
Tại thư mục gốc của dự án, chạy lệnh:
```bash
docker compose up -d --build
```
Lệnh trên sẽ tự động:
1. Tạo container cơ sở dữ liệu `g-scores-mongodb` trên cổng `27017`.
2. Tạo container `g-scores-backend` chạy API trên cổng `5000`.
3. Tạo container `g-scores-frontend` dùng Nginx để chạy giao diện trên cổng `80` (truy cập trực tiếp qua `http://localhost`).

### Nạp dữ liệu vào Database của Docker
Khi chạy Docker lần đầu tiên, hãy chạy lệnh sau để nạp dữ liệu thi THPT vào Database cục bộ:
```bash
docker exec g-scores-backend npm run migrate:seed
```

---

## Cách sử dụng 🚀

### 1. Đường dẫn cục bộ (Local URLs)
* **Website Giao diện:** `http://localhost:5173` (hoặc `http://localhost` nếu chạy Docker)
* **Backend API:** `http://localhost:5000`

### 2. URL Môi trường Production (Live Demo)
* **Địa chỉ chạy trực tuyến:** [https://g-scores-deploy.vercel.app/](https://g-scores-deploy.vercel.app/)

---

## Liên hệ 📧

* **Tác giả:** Trần Hữu Thoại
* **Email:** thauu-01@github.com
* **Mã nguồn dự án:** <https://github.com/thauu-01/webdev-intern-assignment-3-demo.git>
