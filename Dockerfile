# -------------------------------
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install all deps
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# -------------------------------
# Production stage
FROM nginx:alpine

# Copy build from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
