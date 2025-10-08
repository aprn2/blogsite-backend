FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the files
COPY . .

# Expose app port
EXPOSE 3000

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "serve"]
