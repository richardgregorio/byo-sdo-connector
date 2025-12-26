# --- STAGE 1: Build ---
# FROM node:18-slim AS builder
FROM node:24.0.0-slim AS builder 
# NODE VERSÃO 24
# TODO SUBSTITUIR

RUN apt-get update 
# Install build dependencies for canvas and node-gyp
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies (this will now succeed)
COPY package*.json ./
RUN npm install
RUN npm install --save-dev webpack-cli

# --- STAGE 2: Production ---
FROM node:24.0.0-slim
# TODO SUBSTITUIR

# The 'canvas' library still needs the runtime graphics libraries 
# to function, even after it is compiled.
RUN apt-get update && apt-get install -y \
    libcairo2 \
    libpango-1.0-0 \
    libjpeg62-turbo \
    libgif7 \
    librsvg2-2 \
    && rm -rf /var/lib/apt/lists/*
    
WORKDIR /app
    
# Copy ONLY the node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3031
CMD ["npm", "start"]