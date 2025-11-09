# Frontend Web - KYC Onboarding Flow

Aplicación React con flujo de verificación KYC (Know Your Customer) para onboarding de usuarios.

## Estructura

```
apps/web/src/app/
├── components/
│   ├── kyc-flow.tsx           # Componente principal del flujo
│   ├── step-indicator.tsx     # Indicador de progreso
│   └── steps/
│       ├── email-register.tsx      # Paso 1: Registro de email
│       ├── dni-capture.tsx         # Paso 3: Captura de DNI y datos
│       ├── phone-verification.tsx  # Paso 4: Verificación de teléfono
│       ├── home-screen.tsx         # Pantalla final (home)
│       └── error-screen.tsx        # Pantalla de error
├── app.tsx                    # Componente raíz
└── styles.css                 # Estilos globales
```

## Flujo de Pasos

1. **Email** - Usuario ingresa su email
2. **Validación** - Confirmación de email verificado
3. **DNI** - Captura de datos personales (nombre, DNI, género, fecha de nacimiento)
4. **Teléfono** - Verificación de número telefónico
5. **Cuenta OK** - Confirmación de cuenta creada
6. **Home** - Pantalla de bienvenida con datos del usuario

## Características

- ✅ Validación de formularios en cada paso
- ✅ Navegación entre pasos con botones Atrás/Siguiente
- ✅ Indicador visual de progreso
- ✅ Manejo de errores con pantalla dedicada
- ✅ Simulación de error aleatorio en verificación telefónica (30% probabilidad)
- ✅ Pantalla final con información del usuario
- ✅ Diseño responsive con CSS inline

## Ejecutar

```bash
# Desde la raíz del monorepo
npm run serve:web

# O con Nx directamente
nx serve web
```

La aplicación se ejecutará en: http://localhost:4200

## Próximos Pasos

- [ ] Integrar con el backend (API en puerto 3000)
- [ ] Conectar endpoints de verificación
- [ ] Agregar validaciones más robustas
- [ ] Implementar manejo de estado global (Context/Redux)
- [ ] Agregar tests unitarios
