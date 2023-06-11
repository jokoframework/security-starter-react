# security-starter-react
React starter project to work with security-starter-backend

# Información del proyecto
## Datos del proyecto
El proyecto tiene las siguientes opciones de configuración:
- TypeScript: Sí.
- ESLint: Sí, para tener un estándar de código entre los colaboradores.
- Tailwind CSS: Fue agregado después de manera manual.
- Utilizar el directorio src/: Sí.
- Utilizar el direction app/: No.
- Import alias: @/* (opción por defecto).
## Informacion sobre el [layout](/docs/layout.md)

# Correr el proyecto
Para probar el proyecto seguir en orden los siguientes pasos:
## Clonar el repositorio:
```
git clone https://github.com/jokoframework/security-starter-react.git
cd security-starter-react
```
## Agregar fake backend y correr los servidores
Nota: Asegurarse de posicionarse en la ruta raiz del proyecto antes de ejecutar lo siguiente: 
### 1. Instalar dependencias definidas en el package.json:
```
npm install
```
### 2. Definir variables de entorno.
#### &ensp; &ensp; 2.1 Crear el archivo .env.local:
```
vi .env.local
```
#### &ensp; &ensp; 2.3 Definir las siguientes variables de entorno:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
### 3. Correr el servidor json:
```
npm run mockdb
```
### 4. Correr el servidor web:
```
npm run dev
```
### 5. Ir a la siguiente url:
```
http://localhost:3000
```