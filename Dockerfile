FROM nginx:alpine

# Remove default Nginx page (optional)
RUN rm -rf /usr/share/nginx/html/*

# Copy React build files
COPY ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
