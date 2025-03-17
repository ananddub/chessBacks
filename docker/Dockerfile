# Stage 1: Build stage using Bun
FROM oven/bun:canary-alpine AS builder

WORKDIR /app

# Install dependencies and prepare the application
COPY package.json ./
RUN bun install

COPY . .
RUN bunx prisma generate

# Build the Bun application and set permissions
RUN bun run pro
RUN ls -la  
RUN chmod +x main.sh  

# Stage 2: Create a runtime stage with the required libraries and binaries
FROM alpine:latest AS runtime
# Install required libraries and utilities
RUN apk add --no-cache libstdc++ libgcc redis openssl busybox-static

# Stage 3: Final image using scratch
FROM scratch

COPY --from=runtime /lib /lib
COPY --from=runtime /usr/lib /usr/lib

# Copy SSL certificates if needed (for openssl)
COPY --from=runtime /etc/ssl /etc/ssl

# Copy redis-server binary
COPY --from=runtime /usr/bin/redis-server /usr/bin/redis-server

# Copy a statically linked shell (busybox) to provide /bin/sh
COPY --from=runtime /bin/busybox /bin/sh

# Copy the built application files from the builder stage
COPY --from=builder /app/main.sh /main.sh
COPY --from=builder /app/.env /.env
COPY --from=builder /app/prisma_client /prisma_client

EXPOSE 4000

# Start Redis (in daemon mode) and then run the application
CMD ["/bin/sh", "-c", "/usr/bin/redis-server --daemonize yes && /main.sh"]
