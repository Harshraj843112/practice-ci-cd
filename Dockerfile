# First stage: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
ENV NODE_OPTIONS=--max-old-space-size=2048
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Second stage: Serve the application
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
