# Build Stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY web/package.json web/package-lock.json* ./
RUN npm ci

# Copy the rest of the application code
COPY web/ ./

# Set Next.js to output standalone build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the Next.js application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY web/nginx.conf /etc/nginx/conf.d/default.conf

# Create directory for Next.js static files
RUN mkdir -p /usr/share/nginx/html

# Add Node.js for running the Next.js app
RUN apk add --no-cache nodejs npm

# Copy the necessary files from the build stage
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json* ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Create start script properly with literal line breaks
RUN printf '#!/bin/sh\nnpm start & \nnginx -g "daemon off;"\n' > /start.sh
RUN chmod +x /start.sh

# Expose port 5000
EXPOSE 5000

# Start both Next.js and nginx
CMD ["/start.sh"]