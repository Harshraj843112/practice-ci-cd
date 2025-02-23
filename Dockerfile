# Build stage: Use Node.js 20 with increased memory and Alpine for efficiency
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_OPTIONS=--max-old-space-size=2048
COPY package*.json ./
RUN npm install --production --no-audit --no-fund
COPY . .
RUN npm run build

# Runtime stage: Use lightweight Nginx for serving static files
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 443  # Expose HTTPS port
CMD ["nginx", "-g", "daemon off;"]
