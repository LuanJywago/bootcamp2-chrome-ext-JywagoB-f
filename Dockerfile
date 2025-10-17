# Base Playwright (já vem com Chromium)
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

WORKDIR /app

# Copia dependências
COPY package*.json ./

# Instala dependências
RUN npm ci --silent

# Garante que navegadores estão instalados (precaução)
RUN npx playwright install --with-deps chromium

# Copia o restante do projeto
COPY . .

# Executa o build da extensão
RUN node scripts/build-extension.mjs

# Comando padrão do container
CMD ["npm", "test"]
