# 🎯 HƯỚNG DẪN CHO NGƯỜI HOÀN TOÀN MỚI LẬP TRÌNH
## Intelligent Aquaculture System - Tuần 1, 2, 3

**Dành cho bạn: Nếu bạn chưa bao giờ mở terminal, chưa biết gì về code, hướng dẫn này sẽ giúp bạn từng bước một.**

---

# 🚀 PHẦN 0: CHUẨN BỊ BAN ĐẦU (30 phút)

## Bước 0.1: Tải & Cài Node.js

### Tại sao cần Node.js?
- **Node.js** = Một công cụ giúp bạn chạy code JavaScript trên máy tính
- Nó giống như một "interpreter" dịch code bạn viết thành lệnh máy tính hiểu
- Không phải một phần mềm bình thường, nó là một **runtime environment**

### Cách cài đặt:

**👉 Cho Windows:**
1. Vào https://nodejs.org (chọn phiên bản **LTS - Long Term Support**)
2. Click "Download for Windows"
3. Sẽ tải file `.msi` (như file cài phần mềm bình thường)
4. Mở file vừa tải → Click "Next" → "I agree" → "Next" cho tới khi xong
5. Máy tính sẽ tự động cài đặt

**👉 Cho macOS:**
1. Vào https://nodejs.org
2. Chọn **LTS version**
3. Download file `.pkg`
4. Mở file → Follow hướng dẫn
5. Nhập password khi được yêu cầu

**👉 Cho Ubuntu/Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Kiểm tra cài đặt thành công:
1. **Mở Terminal** (Windows: "Command Prompt" hoặc "PowerShell", macOS/Linux: "Terminal")
2. Gõ lệnh này:
```bash
node --version
npm --version
```
3. Nếu thấy version numbers (ví dụ: v20.10.0), bạn đã cài thành công ✅

---

## Bước 0.2: Tải & Cài Docker

### Tại sao cần Docker?
- **Docker** = Một hộp chứa ảo để chạy PostgreSQL (database)
- Thay vì cài PostgreSQL trực tiếp vào máy, chúng ta sẽ chạy nó trong Docker
- Ưu điểm: Sạch sẽ, dễ xóa, không ảnh hưởng máy tính

### Cách cài:
1. Vào https://www.docker.com/products/docker-desktop
2. Chọn phiên bản cho hệ điều hành của bạn
3. Cài giống như phần mềm bình thường
4. Sau cài xong, mở Docker Desktop (sẽ chạy ở background)

### Kiểm tra Docker hoạt động:
```bash
docker --version
docker-compose --version
```
Nếu thấy version, bạn đã cài thành công ✅

---

## Bước 0.3: Tải & Cài VS Code (Editor)

### VS Code là gì?
- **VS Code** = Phần mềm để bạn viết code
- Giống như Microsoft Word, nhưng dành cho code
- Nó có tính năng giúp bạn viết code nhanh hơn, tìm lỗi dễ hơn

### Cách cài:
1. Vào https://code.visualstudio.com
2. Click Download cho hệ điều hành của bạn
3. Cài như phần mềm bình thường
4. Mở VS Code

### Cài Extensions (optional nhưng hữu ích):
1. Mở VS Code
2. Click icon "Extensions" bên trái (hình 4 hình vuông)
3. Tìm và cài: **ES7+ React/Redux/React-Native snippets**
4. Tìm và cài: **Prettier - Code formatter**
5. Tìm và cài: **Thunder Client** (để test API)

---

# 📋 TUẦN 1: SETUP PROJECT BƯỚC CHI TIẾT

## Bước 1.1: Tạo folder project

### Phần lý thuyết:
- Bạn sắp tạo một folder chứa toàn bộ code của dự án
- Folder này sẽ chứa các subfolder khác nhau cho backend, database, docs, v.v.

### Các bước thực hiện:

**👉 Cách 1: Dùng Terminal (KHUYÊN DÙNG)**
```bash
# Bước 1: Mở Terminal/Command Prompt
# Windows: Bấm Windows key → gõ "powershell" → Enter
# macOS: Command + Space → gõ "terminal" → Enter
# Linux: Ctrl + Alt + T

# Bước 2: Gõ dòng này (tạo folder)
mkdir aquaculture-system

# Bước 3: Vào folder vừa tạo
cd aquaculture-system

# Bước 4: Khởi tạo Git
git init
```

**👉 Cách 2: Dùng File Explorer (dễ hơn)**
1. Mở File Explorer (Windows) hoặc Finder (macOS)
2. Chọn vị trí bạn muốn (ví dụ: Documents)
3. Click chuột phải → "New Folder"
4. Đặt tên: `aquaculture-system`
5. Mở folder vừa tạo

---

## Bước 1.2: Tạo folder con

### Tại sao cần chia nhỏ folder?
- Khi dự án lớn, sẽ có hàng trăm file
- Chia thành folder giúp code tổ chức, dễ tìm

### Tạo cấu trúc folder:

**👉 Dùng Terminal (nhanh hơn):**
```bash
# Từ folder aquaculture-system, gõ:
mkdir -p backend/src/{config,middleware,routes,controllers,services,utils}
mkdir -p backend/database/{migrations,seeds}
mkdir -p backend/logs
mkdir frontend/src
mkdir docs
```

**👉 Dùng File Explorer (thủ công):**
1. Tạo folder `backend` → vào → tạo:
   - Folder `src` → tạo các subfolder: config, middleware, routes, controllers, services, utils
   - Folder `database` → tạo: migrations, seeds
   - Folder `logs`
2. Tạo folder `frontend` → vào → tạo: src
3. Tạo folder `docs`
4. Tạo folder `.github` → vào → tạo: workflows

---

## Bước 1.3: Tạo file .gitignore

### .gitignore là gì?
- File này nói cho Git biết những file/folder nào **không nên upload lên GitHub**
- Ví dụ: folder `node_modules` to quá, không cần upload

### Cách tạo:

**👉 Cách 1: Dùng Terminal + File**
```bash
# Trong folder aquaculture-system, gõ:
cat > .gitignore << 'EOF'
node_modules/
dist/
build/
.env
.env.local
*.log
logs/
.DS_Store
.vscode/
package-lock.json
EOF
```

**👉 Cách 2: Tạo file thủ công**
1. Mở VS Code
2. Click "File" → "Open Folder" → Chọn folder `aquaculture-system`
3. Click icon "New File" (hoặc Ctrl+N)
4. Gõ tên: `.gitignore`
5. Copy nội dung trên vào file
6. Ctrl+S để lưu

---

## Bước 1.4: Vào folder Backend & Cài NPM

### NPM là gì?
- **NPM** = "Node Package Manager"
- Giống như "App Store" cho code
- Bạn có thể tải các code library có sẵn từ người khác

### Các bước:

```bash
# Bước 1: Vào folder backend
cd backend

# Bước 2: Khởi tạo npm project (tạo file package.json)
npm init -y

# Kết quả sẽ tạo file package.json
# File này chứa thông tin về dự án của bạn
```

### Lưu ý:
- `-y` nghĩa là "Yes for all questions" (đồng ý tất cả)
- Bạn sẽ thấy file `package.json` được tạo

---

## Bước 1.5: Cài Dependencies (Thư viện)

### Dependencies là gì?
- Những code library mà dự án của bạn cần dùng
- Ví dụ: Express để tạo API, dotenv để quản lý biến environment

### Cài dependencies:

```bash
# Gõ lệnh này (trong folder backend):
npm install express cors dotenv jsonwebtoken bcryptjs

# Chờ vài phút để tải xong...
# Bạn sẽ thấy folder node_modules được tạo
```

### Sau cài xong, cài dev dependencies:
```bash
npm install --save-dev typescript ts-node @types/node @types/express
```

### Giải thích:
- `npm install` = Cài package
- `--save-dev` = Chỉ dùng khi phát triển (không cần khi production)

---

## Bước 1.6: Cấu hình TypeScript

### TypeScript là gì?
- **TypeScript** = JavaScript với kiểu dữ liệu
- Giúp tìm lỗi sớm, code an toàn hơn
- Nó được "biên dịch" (compile) thành JavaScript bình thường

### Tạo tsconfig.json:

**👉 Tự động (dễ hơn):**
```bash
# Gõ lệnh này (vẫn trong folder backend):
npx tsc --init
```

Sẽ tạo file `tsconfig.json` với cấu hình mặc định.

**👉 Chỉnh sửa file:**
1. Mở `tsconfig.json` bằng VS Code
2. Tìm và sửa các dòng này:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

3. Ctrl+S để lưu

---

## Bước 1.7: Tạo & Chỉnh sửa package.json

### package.json là gì?
- File này lưu thông tin dự án và list các script commands

### Cách làm:

1. Mở file `package.json` (ở folder backend) bằng VS Code
2. Xóa nội dung cũ
3. Copy nội dung này vào:

```json
{
  "name": "aquaculture-backend",
  "version": "1.0.0",
  "description": "Backend for Intelligent Aquaculture System",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:push": "prisma db push",
    "seed": "ts-node database/seeds/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.1.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/bcryptjs": "^2.4.6",
    "prisma": "^5.7.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

4. Ctrl+S để lưu
5. Chạy lệnh này để cài thêm dependencies:
```bash
npm install
```

---

## Bước 1.8: Tạo file .env

### .env là gì?
- File này chứa **biến environment** (cài đặt)
- Ví dụ: port, database URL, JWT secret
- **QUAN TRỌNG**: Không bao giờ upload .env lên GitHub (đã thêm vào .gitignore)

### Tạo file .env:

1. Mở VS Code, click "New File" (Ctrl+N)
2. Gõ tên file: `.env`
3. Copy nội dung này:

```env
# Server
PORT=3000
NODE_ENV=development

# Database (sẽ update sau)
DATABASE_URL="postgresql://postgres:password@localhost:5432/aquaculture_dev"

# JWT
JWT_SECRET="your-super-secret-key-at-least-32-characters-long!!"
JWT_EXPIRE=24h
```

4. Ctrl+S để lưu

### Giải thích từng dòng:
- `PORT=3000`: Server chạy trên port 3000
- `NODE_ENV=development`: Chế độ phát triển (có logs chi tiết)
- `DATABASE_URL`: Địa chỉ kết nối database
- `JWT_SECRET`: Chìa khóa bí mật để mã hóa token (giữ bí mật!)
- `JWT_EXPIRE`: Token hết hạn sau 24 giờ

---

## Bước 1.9: Tạo docker-compose.yml

### docker-compose.yml là gì?
- File này nói cho Docker cách chạy PostgreSQL & Redis
- Thay vì cài PostgreSQL thủ công, Docker sẽ tự động cài & chạy

### Cách tạo:

1. Mở VS Code, new file
2. Gõ tên: `docker-compose.yml`
3. Copy nội dung này:

```yaml
version: '3.8'

services:
  postgres:
    image: timescale/timescaledb:latest-pg15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: aquaculture_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

4. Ctrl+S để lưu

### Giải thích:
- `services`: Danh sách các service (PostgreSQL, Redis)
- `image`: Ảnh (image) Docker để download
- `environment`: Biến môi trường cho database
- `ports`: Mapping port (5432 là port PostgreSQL tiêu chuẩn)
- `volumes`: Lưu data (như hard drive ảo)

---

## Bước 1.10: Kiểm tra Tuần 1 hoàn tất

```bash
# Chạy từng lệnh này & kiểm tra:

# 1. Kiểm tra Node.js
node --version
# Kết quả: v20.x.x ✅

# 2. Kiểm tra npm
npm --version
# Kết quả: x.x.x ✅

# 3. Kiểm tra TypeScript
npx tsc --version
# Kết quả: Version x.x.x ✅

# 4. Kiểm tra Docker
docker --version
docker-compose --version
# Kết quả: version x.x.x ✅

# 5. Kiểm tra folder structure
ls -la
# Hoặc dùng File Explorer để xem
# Phải thấy: backend, frontend, docs, docker-compose.yml, .env, .gitignore
```

---

# 🗄️ TUẦN 2: DATABASE SETUP - CHI TIẾT CỰC KỲ

## Bước 2.1: Cài Prisma

### Prisma là gì?
- **Prisma** = Công cụ để bạn tương tác với database dễ dàng
- Thay vì viết SQL phức tạp, bạn viết code TypeScript
- Nó tự động sinh SQL command cho bạn

### Cài Prisma:

```bash
# Gõ lệnh này (vẫn trong folder backend):
npm install -D @prisma/cli

# Hoặc
npm install --save-dev @prisma/cli
```

### Khởi tạo Prisma:

```bash
# Tạo thư mục prisma và file .env
npx prisma init

# Sẽ tạo folder prisma/ với file schema.prisma
```

---

## Bước 2.2: Chạy PostgreSQL + Redis bằng Docker

### Các bước:

```bash
# Bước 1: Từ folder aquaculture-system (không phải backend), chạy:
docker-compose up -d

# `-d` nghĩa là "detached" (chạy ở background)
# Chờ vài phút để Docker download & chạy containers

# Bước 2: Kiểm tra containers đang chạy
docker-compose ps

# Output sẽ như này:
# NAME              STATUS
# aquaculture-postgres-1     Up (healthy)
# aquaculture-redis-1        Up
```

### Nếu có lỗi:

```bash
# Xem log chi tiết
docker-compose logs postgres

# Nếu muốn restart
docker-compose restart

# Nếu muốn dừng
docker-compose down

# Nếu muốn reset (xóa tất cả data)
docker-compose down -v
```

---

## Bước 2.3: Cài @prisma/client

```bash
# Gõ lệnh này (trong folder backend):
npm install @prisma/client
```

---

## Bước 2.4: Tạo Prisma Schema

### Schema là gì?
- **Schema** = Mô tả cấu trúc database (các bảng, cột, kiểu dữ liệu)
- Giống như bản thiết kế của database
- Prisma sẽ dùng schema này để tạo tables

### Tạo schema:

1. Mở file `prisma/schema.prisma`
2. Xóa nội dung cũ
3. Copy nội dung này (file quá dài, xem ở file IAS-Setup-Guide.md)

### Giải thích cấu trúc schema:

```prisma
// Model = Table
model User {
  id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  // id = Tên cột
  // String = Kiểu dữ liệu (text)
  // @id = Primary key (định danh duy nhất)
  // @default = Giá trị mặc định
  
  email String @unique
  // @unique = Giá trị này phải duy nhất (không được trùng)
  
  createdAt DateTime @default(now()) @db.Timestamptz(6)
  // DateTime = Kiểu ngày/giờ
  // @default(now()) = Lấy thời gian hiện tại
}
```

---

## Bước 2.5: Chạy Migration

### Migration là gì?
- **Migration** = Hướng dẫn tạo tables trong database
- Prisma sẽ dùng schema để tạo migration files
- Sau đó chạy migration để tạo tables thực tế

### Chạy migration:

```bash
# Gõ lệnh này (trong folder backend):
npx prisma migrate dev --name initial_schema

# Prisma sẽ:
# 1. Tạo folder migrations/
# 2. Sinh SQL file
# 3. Chạy SQL để tạo tables
# 4. Generate Prisma Client
```

### Kiểm tra migration thành công:

```bash
# Mở Prisma Studio (giao diện web để xem database)
npx prisma studio

# Sẽ mở browser ở http://localhost:5555
# Bạn có thể xem & sửa data như Excel
```

---

## Bước 2.6: Tạo Seed Data (dữ liệu mẫu)

### Seed data là gì?
- Dữ liệu mẫu để test dự án
- Ví dụ: tạo user test, farm test, sensors test

### Cách tạo:

1. Tạo file `backend/database/seeds/seed.ts`
2. Copy nội dung (xem file IAS-Setup-Guide.md)

### Giải thích code seed:

```typescript
// Import những công cụ cần dùng
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Xóa dữ liệu cũ (để test fresh)
  await prisma.alertLog.deleteMany();
  await prisma.user.deleteMany();
  
  // Tạo user mới
  const hashedPassword = await bcrypt.hash('admin123', 10);
  // bcrypt = thư viện mã hóa password
  // '10' = độ phức tạp (10 là an toàn)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@aquaculture.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });
  
  console.log(`✅ Created admin: ${admin.email}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect(); // Ngắt kết nối
  });
```

### Chạy seed:

```bash
# Trong folder backend, gõ:
npm run seed

# Output sẽ như:
# 🌱 Seeding database...
# ✅ Created admin: admin@aquaculture.com
# ✅ Created farm: Aquaculture Farm Alpha
# ✨ Seeding complete!
```

### Kiểm tra data:
```bash
# Mở Prisma Studio lại
npx prisma studio

# Bạn sẽ thấy dữ liệu đã được tạo
```

---

## Bước 2.7: Kiểm tra Tuần 2 hoàn tất

```bash
# Chạy từng lệnh:

# 1. Kiểm tra containers chạy
docker-compose ps
# Phải thấy postgres & redis Up ✅

# 2. Kiểm tra Prisma Studio
npx prisma studio
# Phải mở được ở http://localhost:5555 ✅

# 3. Kiểm tra database connection
# Trong Prisma Studio, click vào bảng User
# Phải thấy admin user đã tạo ✅

# 4. Kiểm tra file structure
ls -la backend/prisma/
# Phải thấy schema.prisma & migrations folder ✅
```

---

# 🔌 TUẦN 3: BACKEND API - CHI TIẾT SIÊU ĐƠN GIẢN

## Bước 3.1: Tạo folder src/config

### Tại sao cần config?
- Chứa những file cấu hình (kết nối database, logger, biến môi trường)

### Tạo file config/env.ts:

1. Tạo file `backend/src/config/env.ts`
2. Copy nội dung này:

```typescript
import dotenv from 'dotenv';

// Đọc file .env
dotenv.config();

// Export object config
export const config = {
  server: {
    // parseInt = Chuyển string thành số
    // || 'default value' = Nếu không có thì dùng giá trị mặc định
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRE || '24h',
  },
};
```

### Giải thích:
- `dotenv.config()` = Đọc file .env
- `process.env.PORT` = Lấy biến PORT từ .env
- Export = Cho phép file khác import & dùng

---

## Bước 3.2: Tạo file logger

### Logger là gì?
- Công cụ để in log messages (thông báo)
- Ví dụ: "Server started", "Database connected", "Error occurred"
- Giúp debug & theo dõi application

### Cài winston:

```bash
# Trong folder backend:
npm install winston
```

### Tạo file config/logger.ts:

```typescript
import winston from 'winston';

// Tạo logger object
export const logger = winston.createLogger({
  level: 'info', // 'error', 'warn', 'info', 'debug'
  format: winston.format.json(), // Output dạng JSON
  transports: [
    // Transports = nơi gửi logs
    new winston.transports.Console(), // Gửi tới terminal
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' // Chỉ ghi error logs
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' // Tất cả logs
    }),
  ],
});
```

---

## Bước 3.3: Tạo Middleware - Error Handler

### Middleware là gì?
- **Middleware** = Hàm trung gian xử lý request trước khi tới handler chính
- Ví dụ: check authentication, validate input, xử lý error

### Error Handler là gì?
- Xử lý tất cả lỗi từ API
- Trả về response lỗi với status code & message

### Tạo file middleware/errorHandler.ts:

```typescript
import { Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger';

// Tạo class để định nghĩa API error
export class ApiError extends Error {
  // constructor = hàm khởi tạo
  constructor(
    public status: number = 500, // HTTP status code
    public message: string = 'Internal Server Error',
  ) {
    super(message);
  }
}

// Middleware xử lý error
// Hàm này sẽ được gọi khi có lỗi
export const errorHandler = (
  err: ApiError, // Lỗi được truyền vào
  req: Request, // HTTP request
  res: Response, // HTTP response
  next: NextFunction, // Hàm next() nếu muốn tiếp tục
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Ghi log lỗi
  logger.error(`[${status}] ${message}`);

  // Trả về response lỗi cho client
  res.status(status).json({
    success: false,
    error: { status, message },
  });
};
```

---

## Bước 3.4: Tạo Middleware - Authentication

### Authentication là gì?
- Kiểm tra user có token hợp lệ không
- Token = credential để chứng minh identity

### Tạo file middleware/auth.ts:

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@/config/env';

// Mở rộng Express Request type
declare global {
  namespace Express {
    interface Request {
      userId?: string; // Thêm property userId vào Request
    }
  }
}

// Middleware kiểm tra token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Lấy token từ header
    // Authorization header format: "Bearer <token>"
    // split(' ')[1] = Lấy phần sau "Bearer "
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Xác minh token bằng JWT secret
    const decoded = jwt.verify(token, config.jwt.secret) as any;
    
    // Gán userId vào request object
    req.userId = decoded.userId;
    
    // Tiếp tục handler tiếp theo
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Giải thích JWT:
- **JWT** = "JSON Web Token"
- Format: `header.payload.signature`
- Ví dụ: `eyJhbGc...eyJ1c2VyS...SflKxw...`

---

## Bước 3.5: Tạo Services - Business Logic

### Service là gì?
- Chứa **business logic** (xử lý dữ liệu)
- Tách logic khỏi HTTP handler (controller)
- Dễ test & tái sử dụng

### Tạo file services/sensorService.ts:

```typescript
import { prisma } from '@/index';
import { ApiError } from '@/middleware/errorHandler';

// Tạo class để chứa các method liên quan sensors
export class SensorService {
  // Method 1: Lấy tất cả sensors của 1 pond
  async getSensorsByPond(pondId: string) {
    const sensors = await prisma.sensor.findMany({
      where: { pondId }, // Điều kiện: pondId = pondId được truyền vào
      select: { // Chọn các cột để trả về
        id: true,
        name: true,
        sensorType: true,
        status: true,
      },
    });

    if (sensors.length === 0) {
      throw new ApiError(404, `No sensors found for pond ${pondId}`);
    }

    return sensors;
  }

  // Method 2: Validate sensor data (kiểm tra dữ liệu hợp lệ)
  validateSensorData(
    value: number,
    sensorType: string,
  ): { isValid: boolean; flag: string; message?: string } {
    // Định nghĩa range hợp lệ cho mỗi loại sensor
    const ranges: Record<string, [number, number]> = {
      temperature: [15, 35],
      ph: [5, 9],
      dissolved_oxygen: [0, 15],
    };

    const [min, max] = ranges[sensorType] || [0, 100];

    // Kiểm tra value có nằm trong range không
    if (value < min || value > max) {
      return {
        isValid: false,
        flag: 'error',
        message: `Value out of range [${min}, ${max}]`,
      };
    }

    return { isValid: true, flag: 'good' };
  }

  // Method 3: Insert sensor data vào database
  async insertSensorData(
    sensorId: string,
    value: number,
    unit: string,
    sensorType: string,
  ) {
    // Validate trước khi insert
    const validation = this.validateSensorData(value, sensorType);

    // Insert vào database
    // Note: sensor_data là hypertable (time-series table)
    await prisma.$executeRaw`
      INSERT INTO sensor_data (time, sensor_id, value, unit, quality_flag)
      VALUES (NOW(), ${sensorId}, ${value}, ${unit}, ${validation.flag})
    `;

    // Update last_data_received timestamp
    await prisma.sensor.update({
      where: { id: sensorId },
      data: { lastDataReceived: new Date() },
    });

    return validation;
  }
}

// Export instance để dùng ở nơi khác
export const sensorService = new SensorService();
```

### Giải thích từng phần:

```typescript
// prisma.sensor.findMany() = SELECT * FROM sensors
// where: { pondId } = WHERE pond_id = ?
// select: { ... } = SELECT id, name, ... (chỉ lấy cột nào)

// async = Hàm bất đồng bộ (chờ database trả kết quả)
// await = Chờ hàm async hoàn thành

// throw = Ném error (ngắt code, trả lỗi)
```

---

## Bước 3.6: Tạo Controllers - HTTP Handlers

### Controller là gì?
- **Controller** = Xử lý HTTP request/response
- Gọi service để xử lý logic
- Trả về JSON response cho client

### Tạo file controllers/sensorController.ts:

```typescript
import { Request, Response, NextFunction } from 'express';
import { sensorService } from '@/services/sensorService';
import { ApiError } from '@/middleware/errorHandler';

// Handler 1: Nhận sensor data từ IoT device
export const receiveSensorReading = async (
  req: Request, // HTTP request (chứa body, params, v.v.)
  res: Response, // HTTP response (để trả kết quả)
  next: NextFunction, // Để gọi error handler
) => {
  try {
    // Lấy dữ liệu từ request body
    const { sensorId, value, unit, sensorType } = req.body;

    // Validate các field bắt buộc
    if (!sensorId || value === undefined || !unit || !sensorType) {
      throw new ApiError(400, 'Missing required fields');
    }

    // Gọi service để insert data
    const validation = await sensorService.insertSensorData(
      sensorId,
      value,
      unit,
      sensorType,
    );

    // Trả về response success
    res.status(201).json({
      success: true,
      data: {
        sensorId,
        value,
        validation,
      },
    });
  } catch (error) {
    // Nếu có error, gọi error handler
    next(error);
  }
};

// Handler 2: Lấy tất cả sensors của 1 pond
export const getPondSensors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Lấy pondId từ URL parameter
    // Route: /api/sensors/pond/:pondId
    // Vậy req.params.pondId = giá trị pondId
    const { pondId } = req.params;

    // Gọi service
    const sensors = await sensorService.getSensorsByPond(pondId);

    // Trả về response
    res.json({
      success: true,
      data: sensors,
    });
  } catch (error) {
    next(error);
  }
};
```

---

## Bước 3.7: Tạo Routes

### Route là gì?
- **Route** = URL endpoint của API
- Ánh xạ URL → Controller handler
- Ví dụ: POST /api/sensors/data → receiveSensorReading handler

### Tạo file routes/sensorRoutes.ts:

```typescript
import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import {
  receiveSensorReading,
  getPondSensors,
} from '@/controllers/sensorController';

// Tạo router object
const router = Router();

// Route 1: Public endpoint (không cần token)
// IoT device sẽ POST dữ liệu tới endpoint này
router.post('/data', receiveSensorReading);
// POST /api/sensors/data
// Request body: { sensorId, value, unit, sensorType }

// Route 2: Protected endpoint (cần token)
// Frontend sẽ GET sensors data từ endpoint này
router.get('/pond/:pondId', authMiddleware, getPondSensors);
// GET /api/sensors/pond/:pondId
// Headers: Authorization: Bearer <token>

// Export router
export default router;
```

### Giải thích:
- `router.post('/data', ...)` = POST request tới /data
- `authMiddleware` = Kiểm tra token trước gọi handler
- `:pondId` = Parameter (biến) trong URL

---

## Bước 3.8: Tạo Main Application (index.ts)

### Main application là gì?
- File chính của backend
- Setup Express app, middleware, routes
- Khởi động server

### Tạo file src/index.ts:

```typescript
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { config } from '@/config/env';
import { logger } from '@/config/logger';
import { errorHandler } from '@/middleware/errorHandler';

// Import routes
import sensorRoutes from '@/routes/sensorRoutes';

// Khởi tạo app & database client
const app: Express = express();
const prisma = new PrismaClient();

// =============== MIDDLEWARE ===============

// CORS middleware = Cho phép request từ frontend
app.use(cors());

// Body parser middleware = Parse JSON request body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// =============== ROUTES ===============

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api/sensors', sensorRoutes);
// Tất cả route bắt đầu với /api/sensors sẽ được xử lý bởi sensorRoutes

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: `Route ${req.path} not found`,
    },
  });
});

// Error handler (PHẢI ở cuối cùng)
app.use(errorHandler);

// =============== START SERVER ===============

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$executeRaw`SELECT 1`;
    logger.info('✅ Database connected');

    // Start Express server
    const server = app.listen(config.server.port, () => {
      logger.info(
        `🚀 Server running at http://localhost:${config.server.port}`,
      );
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Shutting down server...');
      server.close();
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Chạy server
startServer();

// Export cho test purposes
export { app, prisma };
```

### Giải thích flow:

```
Request từ client
    ↓
CORS middleware
    ↓
Body parser
    ↓
Tìm matching route (ví dụ: /api/sensors/data)
    ↓
authMiddleware (nếu có)
    ↓
Controller handler
    ↓
Service xử lý logic
    ↓
Database query
    ↓
Response JSON trả về client
    ↓
Nếu có error → errorHandler
```

---

## Bước 3.9: Build & Chạy Server

### Build là gì?
- Chuyển TypeScript thành JavaScript
- Tạo folder `dist` chứa code đã compile

### Các bước:

```bash
# Bước 1: Build (compile TypeScript → JavaScript)
npm run build

# Sẽ tạo folder dist/ chứa code JS
# Nếu thấy error, check tsconfig.json & code syntax

# Bước 2: Chạy server
npm run dev

# Output sẽ như:
# ✅ Database connected
# 🚀 Server running at http://localhost:3000

# Bước 3: Kiểm tra server hoạt động
# Mở browser → http://localhost:3000/health
# Sẽ thấy: { "status": "OK", "timestamp": "...", "uptime": ... }
```

---

## Bước 3.10: Test API Endpoints

### Test API là gì?
- Kiểm tra API hoạt động đúng không
- Có thể dùng curl, Postman, Thunder Client, v.v.

### Test bằng Thunder Client (dễ nhất):

1. Mở VS Code → Extensions → Cài "Thunder Client"
2. Click Thunder Client icon bên trái
3. Click "New Request"
4. **Test 1: Health Check**
   - Method: GET
   - URL: http://localhost:3000/health
   - Click "Send"
   - Kết quả: { status: 'OK', ... } ✅

5. **Test 2: Insert Sensor Data**
   - Method: POST
   - URL: http://localhost:3000/api/sensors/data
   - Headers tab: Content-Type = application/json
   - Body (JSON):
   ```json
   {
     "sensorId": "550e8400-e29b-41d4-a716-446655440000",
     "value": 28.5,
     "unit": "°C",
     "sensorType": "temperature"
   }
   ```
   - Click "Send"
   - Kết quả: { success: true, data: { ... } } ✅

### Test bằng curl:

```bash
# Test health check
curl http://localhost:3000/health

# Test insert sensor data
curl -X POST http://localhost:3000/api/sensors/data \
  -H "Content-Type: application/json" \
  -d '{
    "sensorId": "550e8400-e29b-41d4-a716-446655440000",
    "value": 28.5,
    "unit": "°C",
    "sensorType": "temperature"
  }'
```

---

## Bước 3.11: Kiểm tra Database có Data

```bash
# Mở Prisma Studio
npx prisma studio

# Vào http://localhost:5555
# Click bảng "sensor_data"
# Phải thấy dữ liệu vừa insert ✅
```

---

## ✅ CHECKLIST TUẦN 1-3 HOÀN TẤT

### TUẦN 1: ✅
- [ ] Node.js cài đặt & kiểm tra
- [ ] Docker cài đặt & kiểm tra
- [ ] VS Code cài đặt
- [ ] Folder structure tạo
- [ ] npm project khởi tạo
- [ ] Dependencies cài đặt
- [ ] TypeScript & tsconfig tạo
- [ ] package.json chỉnh sửa
- [ ] .env file tạo
- [ ] docker-compose.yml tạo

### TUẦN 2: ✅
- [ ] Docker containers chạy (postgres + redis)
- [ ] Prisma cài đặt
- [ ] Prisma schema viết
- [ ] Migration chạy thành công
- [ ] Seed data tạo & chạy
- [ ] Prisma Studio mở được & có data

### TUẦN 3: ✅
- [ ] Config files (env, logger) tạo
- [ ] Middleware (errorHandler, auth) tạo
- [ ] Services tạo
- [ ] Controllers tạo
- [ ] Routes tạo
- [ ] Main app (index.ts) tạo
- [ ] Server chạy thành công (npm run dev)
- [ ] API endpoints test thành công
- [ ] Database có sensor data

---

## 🆘 TROUBLESHOOTING CỰC ĐƠN GIẢN

### ❌ "command not found: node"
**Nguyên nhân**: Node.js chưa cài hoặc chưa add vào PATH
**Giải pháp**: Cài lại Node.js, chọn "Add to PATH" khi cài

### ❌ "cannot find module..."
**Nguyên nhân**: Dependencies chưa cài
**Giải pháp**:
```bash
npm install
```

### ❌ "Error: listen EADDRINUSE"
**Nguyên nhân**: Port 3000 đã được dùng
**Giải pháp**:
```bash
# Cách 1: Đổi port
PORT=3001 npm run dev

# Cách 2: Kill process trên port 3000
# Windows: taskkill /PID <pid> /F
# macOS/Linux: kill -9 <pid>
```

### ❌ "database error: connection refused"
**Nguyên nhân**: PostgreSQL chưa chạy
**Giải pháp**:
```bash
# Restart Docker
docker-compose down
docker-compose up -d
```

### ❌ "prisma db push failed"
**Nguyên nhân**: Schema có lỗi
**Giải pháp**:
```bash
# Reset database
npx prisma migrate reset

# Hoặc
docker-compose down -v
docker-compose up -d
npm run seed
```

---

## 🎓 KIẾN THỨC BỔ SUNG

### Các khái niệm cơ bản:

| Khái niệm | Giải thích |
|-----------|-----------|
| **API** | Application Programming Interface - giao diện để gọi service |
| **REST** | Representational State Transfer - cách thiết kế API |
| **Endpoint** | URL của API (ví dụ: /api/sensors/data) |
| **Request** | Yêu cầu từ client gửi tới server |
| **Response** | Kết quả server trả về cho client |
| **JSON** | JavaScript Object Notation - định dạng dữ liệu |
| **Database** | Nơi lưu trữ dữ liệu |
| **Schema** | Cấu trúc của database |
| **Migration** | Thay đổi database schema |
| **Token** | Chứng chỉ để xác thực user |

---

## 🎯 TIẾP THEO

Sau khi hoàn thành tuần 1-3:

1. **Tuần 4**: Tạo WebSocket cho real-time data
2. **Tuần 5**: Frontend React setup
3. **Tuần 6**: Dashboard hiển thị data
4. **Tuần 7**: Analytics & aggregation
5. **Tuần 8-12**: Testing, deployment, documentation

---

**Chúc mừng! Bạn đã học được rất nhiều! 🎉**

Nếu có câu hỏi nào, đừng ngần ngại hỏi. Tôi sẽ giải thích từ từ cho bạn hiểu.