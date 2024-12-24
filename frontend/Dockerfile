FROM node:22-alpine AS build-env

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json  ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend app
RUN npm run build

# Use a lightweight server to serve the build
FROM nginx:alpine

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only necessary files from the build stage
COPY --from=build-env /app/dist /usr/share/nginx/html
