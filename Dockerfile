# Use a lightweight base image for Node.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Set memory limit for free tier (1 GB RAM)
ENV NODE_OPTIONS=--max-old-space-size=512

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies with Yarn (faster than npm, better caching)
RUN yarn install --production --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the React app
RUN yarn build

# Use lightweight Nginx for serving
FROM nginx:alpine

# Copy the build output to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration (if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
