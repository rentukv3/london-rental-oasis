#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "🚀 Iniciando despliegue de London Rental Oasis..."

# Verificar Node.js y npm
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar variables de entorno
if [ ! -f .env ]; then
    echo -e "${RED}❌ Archivo .env no encontrado${NC}"
    exit 1
fi

# Build
echo "🔨 Construyendo aplicación..."
npm run build

# Verificar build
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build fallido${NC}"
    exit 1
fi

# Despliegue
echo "🚀 Desplegando aplicación..."
npm run deploy

# Verificar despliegue
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Despliegue completado exitosamente${NC}"
else
    echo -e "${RED}❌ Error en el despliegue${NC}"
    exit 1
fi 