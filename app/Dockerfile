# 1. Base Image
FROM node:20-alpine

# 2. Set Working Directory
WORKDIR /usr/src/app

# 3. Copy package manifest & install dependencies (Memanfaatkan Docker Layer Cache)
COPY package*.json ./
RUN npm ci --only=production

# 4. Copy source code aplikasi
COPY . .

# 5. Environment & Port Declaration
ENV NODE_ENV=production
EXPOSE 3000

# 6. Non-root user untuk praktik keamanan
USER node

# 7. Entrypoint command
CMD ["node", "src/index.js"]
