# Mono-repo con Nx + NestJS + React

## Estructura del proyecto

```
.
├─ apps/
│  ├─ api/              # Backend (NestJS) — aquí va el código del back
│  │  ├─ src/
│  │  │  ├─ main.ts
│  │  │  ├─ app.module.ts
│  │  │  ├─ app.controller.ts
│  │  │  └─ app.service.ts
│  │  └─ project.json
│  └─ web/              # Frontend (React) — aquí va el código del front
│     ├─ src/
│     │  ├─ main.tsx
│     │  └─ app/
│     │     └─ app.tsx
│     └─ project.json
├─ libs/                # Código compartido front/back (types, utils)
│  └─ shared/
│     └─ src/
│        ├─ index.ts
│        └─ lib/
│           ├─ types.ts
│           └─ utils.ts
├─ nx.json
├─ package.json
├─ tsconfig.base.json
└─ README.md
```

## Comandos para crear el workspace

```bash
# 1) Instalar Nx globalmente
npm i -g nx

# 2) Crear workspace vacío
npx create-nx-workspace@latest my-workspace --preset empty
cd my-workspace

# 3) Agregar NestJS (api)
nx g @nx/nest:application api

# 4) Agregar React (web)
nx g @nx/react:application web

# 5) Crear librería compartida
nx g @nx/js:library shared --directory=libs
```

## Cómo ejecutar

### Backend (NestJS)
```bash
nx serve api
# o
npm run serve:api
```
- Se ejecuta en: http://localhost:3000
- Endpoints disponibles:
  - `GET /` - Hello API!
  - `GET /api/health` - Health check

### Frontend (React)
```bash
nx serve web
# o
npm run serve:web
```
- Se ejecuta en: http://localhost:4200
- Se conecta automáticamente al backend en puerto 3000

## Dónde agregar código nuevo

### Backend (apps/api/src/)
- **Controladores**: `apps/api/src/*.controller.ts`
- **Servicios**: `apps/api/src/*.service.ts`
- **Módulos**: `apps/api/src/*.module.ts`
- **DTOs y entidades**: `apps/api/src/` (crear carpetas según necesidad)

### Frontend (apps/web/src/)
- **Componentes**: `apps/web/src/app/components/`
- **Páginas**: `apps/web/src/app/pages/`
- **Servicios**: `apps/web/src/app/services/`
- **Hooks**: `apps/web/src/app/hooks/`

### Código compartido (libs/shared/src/lib/)
- **Tipos**: `libs/shared/src/lib/types.ts`
- **Utilidades**: `libs/shared/src/lib/utils.ts`
- **Constantes**: `libs/shared/src/lib/constants.ts`

## Scripts útiles

```bash
# Construir todo
nx build

# Ejecutar tests
nx test

# Linting
nx lint

# Ver dependencias del proyecto
nx graph
```

## Instalación

```bash
npm install
```

¡Listo para desarrollar! 🚀