# Changelog - Web App

## [0.2.0] - 2025-11-10

### Added
- Sistema de rutas con `/login`, `/register`, `/home`, `/verify-email`
- Pantalla de login simplificada (solo email, sin contraseña)
- Pantalla de verificación de email con timeout automático
- Pantalla de verificación OTP (6 dígitos) con auto-focus y paste support
- Pantalla de declaración jurada (affidavit) con checkbox de aceptación
- Flujo completo de onboarding KYC (8 pasos)
- Loader entre transiciones de flujos

### Changed
- **Migración completa a CSS Modules** para mejor performance
- Refactorización de todos los componentes de inline styles a CSS Modules
- Login ahora redirige a verificación de email antes de home
- Eliminado step indicator visual del formulario
- Reducido espaciado entre PageHeader y FormLayout
- Simplificado formulario DNI: solo DNI y género (removido nombre y fecha de nacimiento)
- Removido campo "nombre" de HomeScreen (alineado con flujo simplificado)

### Improved
- 🚀 Performance mejorada: CSS compilado una vez vs inline styles en cada render
- 📦 Bundle size optimizado: CSS minificado y tree-shaken
- 🎯 Estilos con scope automático: Sin conflictos de nombres
- ♻️ Reutilización de estilos: `steps.module.css` compartido
- 🔧 Mejor mantenibilidad: Separación de concerns
- 💪 Type-safe: TypeScript infiere clases disponibles

### Architecture
- Implementado patrón CSS Modules para arquitectura escalable
- Módulos compartidos para componentes similares
- Módulos específicos para componentes únicos
- CSS Variables para theming consistente

## [0.1.0] - 2025-01-09

### Added
- Loader component con animación Lottie adaptado de mobile-app-react-native
- Custom hook `useKYCFlow` para centralizar lógica del flujo KYC
- Componentes UI reutilizables:
  - `Container` - Layout con centrado y altura mínima
  - `PageHeader` - Encabezado de página con título y subtítulo
  - `FormLayout` - Layout común para formularios con navegación
  - `ValidationSuccess` - Pantalla de validación exitosa
  - `AccountCreated` - Pantalla de cuenta creada

### Changed
- Refactorizado `KYCFlow` de ~350 líneas a ~90 líneas
- Convertidas todas las funciones a arrow functions
- Mejorada separación de responsabilidades
- Loader ahora se muestra dentro del contenedor manteniendo visible el step indicator

### Improved
- Código más mantenible y escalable
- Componentes más reutilizables
- Mejor organización de estilos
- Reducción de complejidad ciclomática
