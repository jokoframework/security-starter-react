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

## Deploy

El frontend del proyecto (este repositorio) está montado en fly.io y se puede acceder en el siguiente enlace: https://security-starter-react.fly.dev/.

Además, este repositorio cuenta con un GitHub Action para hacer un redeploy cada vez que se realiza un push a la rama JOKO-62-deploy, develop o main. Para realizar este redeploy se debe generar un FLY_API_TOKEN, un ejemplo de esto se puede ver en la siguiente guía.

El backend está montado en Vercel.
Repositorio: https://github.com/MathiMartinez00/security-starter-react-backend.  
Enlace: https://security-starter-react-backend.vercel.app/.

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