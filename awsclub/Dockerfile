# Stage 1: Build Application
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies using exact lockfile versions
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source codebase
COPY . .

# Run production image optimization pipeline and Vite bundler
RUN node scripts/optimize-images.js --ci
RUN npm run build

# Stage 2: Production Web Server
FROM nginx:alpine AS runner

# Remove default static nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled production bundle from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy server configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]