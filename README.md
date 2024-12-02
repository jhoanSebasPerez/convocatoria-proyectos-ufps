# Convocatoria de Proyectos UFPS

### Descripción
**Convocatoria de Proyectos UFPS** es una aplicación web desarrollada con **Next.js** que facilita la gestión, registro y seguimiento de convocatorias y proyectos en un entorno académico. El proyecto utiliza tecnologías modernas como **React**, **TailwindCSS** y **React Query** para proporcionar una experiencia de usuario eficiente y escalable.

---

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
src
├── app                             # Páginas de la aplicación
│   ├── (auth)                      # Autenticación
│   ├── admin                       # Gestión administrativa
│   ├── favicon.ico                 # Ícono de la aplicación
│   ├── fonts                       # Fuentes utilizadas
│   ├── globals.css                 # Estilos globales
│   ├── layout.tsx                  # Plantilla principal
│   └── not-found.tsx               # Página 404
├── components                      # Componentes visuales reutilizables
│   ├── protected-route.tsx         # Protección de rutas
│   ├── providers.tsx               # Proveedores de contexto
│   ├── role-route.tsx              # Gestión de roles en rutas
│   └── ui                          # Componentes de interfaz de usuario
├── core                            # Constantes del proyecto
│   └── environment.ts
├── features                        # Funcionalidades principales
│   ├── auth                        # Autenticación
│   ├── convocatorias               # Gestión de convocatorias
│   ├── proyectos                   # Gestión de proyectos
│   └── usuarios                    # Gestión de usuarios
├── hooks                           # Hooks personalizados
│   └── use-mobile.tsx
├── lib                             # Configuración de librerías externas
│   ├── api.ts                      # API de Axios
│   ├── react-query.ts              # Configuración de React Query
│   └── utils.ts                    # Funciones de utilidad
```

---

## Instalación

### Requisitos Previos
- [Node.js](https://nodejs.org/) versión >=16.
- npm o yarn para la instalación de dependencias.

### Pasos de instalación
1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd convocatoria-proyectos-ufps
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el proyecto en modo de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponibles

- **Desarrollo**:
  ```bash
  npm run dev
  ```
  Inicia el proyecto en modo desarrollo.

- **Producción**:
  ```bash
  npm run build
  npm start
  ```
  Genera el proyecto optimizado y lo ejecuta en producción.

- **Lint**:
  ```bash
  npm run lint
  ```
  Verifica y corrige errores de estilo.

---

## Tecnologías Usadas

- **Next.js**: Framework de React para desarrollo de aplicaciones web.
- **React Query**: Manejo eficiente de datos asíncronos.
- **TailwindCSS**: Framework de CSS para diseño rápido y moderno.
- **Radix UI**: Componentes accesibles y personalizables.
- **Zod**: Validación y manejo de esquemas de datos.

---

## Licencia
Este proyecto no tiene licencia asignada. Si deseas agregar una licencia, actualiza este archivo y el campo `license` en `package.json`.

---