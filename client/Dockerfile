# Build stage — install deps and build for Linux
FROM node:22-slim AS build
WORKDIR /app

# Copy only manifest
COPY package.json ./

# Generate fresh package-lockfile inside container (Linux target)
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Final stage — serve static assets with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
