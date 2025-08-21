# Build stage:Uses Node.js to install dependencies, build the app into static files.
# Use lightweight Node.js image from Alpine linux
FROM node:20-alpine AS build
# Set working directory inside the container
WORKDIR /app
# Copy only package files first (for layer caching)
COPY package*.json ./
# Install ALL dependencies (production + dev) since we need dev tools to build
RUN npm ci
# Copy the rest of the source code into the container
COPY . .
# Accept an API URL at build time
ARG VITE_API_URL
# Make it available as environment variable for the build process
ENV VITE_API_URL=$VITE_API_URL
# Build the frontend (Vite will generate static files in /dist)
RUN npm run build

# serve static assets:Uses Nginx to serve the static files on port 80.
# Use lightweight Nginx web server to serve static files
FROM nginx:alpine
# Copy the build output (dist folder) from previous stage into Nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 (HTTP) for serving the app
EXPOSE 80
# Run Nginx in the foreground (so the container stays alive)
CMD ["nginx", "-g", "daemon off;"]