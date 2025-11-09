# Changelog - Web App

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
