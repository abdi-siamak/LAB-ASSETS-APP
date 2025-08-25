# Use a lightweight Node.js image from Alpine linux
FROM node:18-alpine 
# Set working directory inside container
WORKDIR /app
# Copy only package files first (for layer caching)
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production
# Copy application source code
COPY src ./src
# Set environment variables inside the container
ENV NODE_ENV=production
ENV PORT=4000
# Expose server port
EXPOSE 4000
# Run the server
CMD ["node", "src/index.js"]