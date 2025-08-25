# Use a lightweight Node.js image
FROM node:22-slim

# App dir
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install only production deps
RUN npm install --omit=dev

# Copy source
COPY src ./src

# Env + port
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# Start
CMD ["node", "src/index.js"]
