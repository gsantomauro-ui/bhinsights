FROM node:20-slim

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Configurar el puerto que espera Google Cloud Run
EXPOSE 3000
ENV PORT=3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
