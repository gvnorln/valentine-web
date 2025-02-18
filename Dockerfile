# Stage 1: Build untuk produksi
FROM node:20 AS builder

WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu untuk cache dependensi
COPY package*.json ./

# Install dependencies untuk build
RUN npm install

# Salin semua file sumber aplikasi
COPY . .

# Build aplikasi untuk produksi
RUN npm run build

# Stage 2: Running aplikasi di mode production
FROM node:20

WORKDIR /app

# Salin file hasil build dari stage sebelumnya
COPY --from=builder /app /app

# Install dependencies untuk runtime (tanpa devDependencies)
COPY package*.json ./
RUN npm install --only=production

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi di mode produksi
CMD ["npm", "run", "start"]
