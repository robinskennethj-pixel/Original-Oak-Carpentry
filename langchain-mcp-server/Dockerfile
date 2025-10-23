FROM node:20-alpine

WORKDIR /app

# Install system dependencies for PDF processing
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/
COPY .env.example ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S langchain -u 1001

# Change ownership
RUN chown -R langchain:nodejs /app

USER langchain

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["npm", "start"]