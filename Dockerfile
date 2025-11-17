# Stage principal
FROM node:20-alpine AS api

WORKDIR /app

# Instalar python + pip + dependências necessárias
RUN apk add --no-cache python3 py3-pip build-base

# Criar venv
RUN python3 -m venv /opt/venv

# Adicionar venv ao PATH
ENV PATH="/opt/venv/bin:$PATH"

# Instalar libs Python dentro do venv
RUN /opt/venv/bin/pip install --no-cache-dir --upgrade pip && \
    /opt/venv/bin/pip install \
        requests \
        beautifulsoup4 \
        lxml \
        pdfplumber \
        pypdf

# Copiar arquivos Node
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
