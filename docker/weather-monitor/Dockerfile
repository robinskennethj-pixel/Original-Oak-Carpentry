FROM node:20-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Create directory for logs
RUN mkdir -p /app/logs

# Expose port for health checks
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Run the weather monitor
CMD ["node", "weather-monitor.js"]