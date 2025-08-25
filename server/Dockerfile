# Use a lightweight Node.js image
FROM node:22-alpine

# App dir
WORKDIR /app

# Copy ONLY package.json so deps resolve inside Linux/musl
COPY package.json ./

# Install runtime deps (no dev deps, no lockfile needed)
RUN npm cache clean --force && npm install --omit=dev

# Copy the app code
COPY src ./src

# Env + port
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# Start
CMD ["node", "src/index.js"]
