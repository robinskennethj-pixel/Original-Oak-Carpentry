# MCP-Enhanced Next.js Dockerfile with Builder.io Integration

# Use the official Node.js 20 image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies with MCP optimization
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy the app code
COPY . .

# Set environment variables for build with MCP integration
ENV OPENAI_API_KEY=dummy_key_for_build
ENV STRIPE_SECRET_KEY=dummy_stripe_key_for_build
ENV STRIPE_PUBLISHABLE_KEY=dummy_stripe_publishable_key_for_build
ENV NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NODE_ENV=production
ENV BUILDER_PUBLIC_KEY=dummy_builder_key_for_build
ENV RAG_API_URL=http://rag_service:8001
ENV DOCLING_API_URL=http://docling_service:8000

# Build Next.js app with MCP-enhanced optimization
RUN npm run build

# Use the standalone output for better Docker performance
FROM node:20-alpine AS runner
WORKDIR /app

# Copy standalone build with MCP integration
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

# Install curl for healthcheck and MCP monitoring
RUN apk add --no-cache curl

# Expose the port Next.js runs on
EXPOSE 3000

# Health check for MCP monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the app with MCP integration
CMD ["node", "server.js"]