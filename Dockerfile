FROM oven/bun:1.0.32-slim
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN bun install 

# Copy all source files
COPY . .


EXPOSE 3000

CMD  bun src/app.ts

