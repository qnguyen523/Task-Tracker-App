# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the development server
CMD ["npm", "start"]

# Build the application
# RUN npm run build

# Production stage
# FROM nginx:alpine

# Copy built assets from the build stage
# COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
# EXPOSE 80

# Start nginx
# CMD ["nginx", "-g", "daemon off;"]
