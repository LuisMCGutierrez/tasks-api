# User API

  Este es un poryecto de administracion de tareas con la implementación de envio de notificaciones al crear nuevas tareas para usuarios autenticados

## Stack
- NestJS + TypeScript
- PostgreSQL + TypeORM
- JWT con Passport
- Swagger

## Requisitos previos
- Node 18+
- Docker

## Instalación y ejecución

# 1. Clonar e instalar
npm install

# 2. Variables de entorno
cp .env.example .env
# (ajustar valores si es necesario)

# 3. Levantar base de datos
docker compose up -d

# 4. Levantar servidor
npm run start:dev

# Documentación interactiva
http://localhost:3000/api

## Tests
npm test

## Decisiones técnicas

**Patrón Strategy para canales de notificación**
Cada canal (email, SMS, push) es una clase independiente que implementa
una interfaz común. Agregar un canal nuevo no requiere modificar código
existente — solo crear una clase nueva y registrarla en el mapa del
orquestador.

**Autorización por roles**
Se implementó un RolesGuard con un decorador @Roles() que lee metadata
del endpoint. Permite escalar el sistema de permisos sin tocar los
controladores existentes.

**select: false en password**
El campo password nunca se incluye en queries por defecto. Solo se
trae explícitamente cuando es necesario para validación en login.

**Tests de integración con SQLite en memoria**
Se eligió SQLite en memoria sobre una segunda instancia de Postgres
para que los tests sean reproducibles en cualquier máquina sin
configuración adicional.