# security-starter-react
React starter project to work with security-starter-backend

# Datos del proyecto
El proyecto tiene las siguientes opciones de configuración:
- TypeScript: Sí.
- ESLint: Sí, para tener un estándar de código entre los colaboradores.
- Tailwind CSS: Fue agregado después de manera manual.
- Utilizar el directorio src/: Sí.
- Utilizar el direction app/: No.
- Import alias: @/* (opción por defecto).

# Información del proyecto
## Layout
El layout para las páginas del proyecto se encuentra en components/layout.tsx, este es renderizado condicionalmente dependiendo de la ruta.
Actualmente no es renderizado en /login ni /signup.  
El layout consiste en un grid de Tailwind en el cual las columnas de la izquierdan ocupan el sidebar y las de las derecha la cabecera y el cuerpo de la página.
Se realizaron 4 componentes de React para esto: PageLayout, Sidebar, Header y Content.