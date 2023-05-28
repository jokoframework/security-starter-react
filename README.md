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
Se realizaron 5 componentes de React para esto: PageLayout, CollapsedSidebar, Sidebar, Header y Content.
### PageLayout 
Sirve de wrapper para los componentes mencionados anteriormente: CollapsedSidebar, Sidebar, Header y Content.
El layout es un grid de Tailwind con 12 columnas y 12 filas y renderiza todo el contenido de las paginas dentro del componente Content.  
El sidebar colapsado solo puede ser visto para breakpoints inferiores a md.  
### CollapsedSidebar
Sidebar colapsado, solo es visible para breakpoins inferiores a md.  
Recibe la informacion del modulo seleccionado actualmente y un estado que representa si el sidebar tiene que estar colapsado (o sea, visible) o no actualmente.  
Si el icono X es seleccionado entonces se cambia el estado del sidebar a colapsado.  
#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
| --------- | ---- | --------- | ----------- |
| selectedModule | Module | Requerido | Objeto tipo Module con información del módulo actualmente seleccionado. |
| setSelectedModule | Function | Requerido | Función para cambiar selectedModule. |
| isSidebarCollapsed | Boolean | Requerido | Booleano que representa si el sidebar esta colapsado o no. |
| setSidebarCollapsed | Function | Requerido | Función para cambiar el estado del sidebar a colapsado. |
### Sidebar
Sidebar del layout.  
Funciona como una lista ```<ul></ul>``` con la clase ```overflow-y-auto``` donde cada elemento ```<li></li>``` representa un item dentro del sidebar.  
Además, cada elemento que no sea el título del sidebar tiene un ```next/link``` alrededor del ```<li></li>``` para poder redireccionar a esa página.  
#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
| --------- | ---- | --------- | ----------- |
| selectedModule | Module | Requerido | Objeto tipo Module con informacion del actualmente seleccionado. |
| setSelectedModule | Function | Requerido | Funcion para cambiar selectedModule. |
### SidebarItem
Representa un item dentro del Sidebar (diferente de un titulo).  
Cuando un item es seleccionado esto se ve reflejado en el sidebar cambiando el color de fondo.  
#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
| --------- | ---- | --------- | ----------- |
| selectedModule | Module | Requerido | Objeto tipo Module con información del módulo actualmente seleccionado. |
| setSelectedModule | Function | Requerido | Función para cambiar selectedModule. |
| moduleData | Module | Requerido | Información sobre el módulo. |
### Header
Cabecera de la página, contiene un ícono clickeable para poder colapsar el sidebar y un botón para redirigir a la página de login.  
Si el ícono AlignJustify es clickeado se cambia el estado del sidebar a no colapsado.  
#### Parámetros 
| Parámetro | Tipo | Requerido | Descripción |
| --------- | ---- | --------- | ----------- |
| selectedModule | Module | Requerido | Objeto tipo Module con información del módulo actualmente seleccionado. |
| setSidebarCollapsed | Function | Requerido | Función para cambiar el estado del sidebar a no colapsado. |
### Content
Representa el contenido de la página que está siendo visitada.  
# Agregar fake backend
Nota: Asegurarse de posicionarse en la ruta raiz del proyecto antes de ejecutar lo siguiente: 
## 1. Instalar lo definido en el package.json:
```
npm install
```
## 2. Definir variables de entorno.
### 2.1 Crear el archivo .env.local:
```
touch .env.local
```
### 2.3 Definir las siguientes variables de entorno:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_USERS=$NEXT_PUBLIC_API_URL/users
NEXT_PUBLIC_API_AUTH=$NEXT_PUBLIC_API_URL/login
```
## 3. Correr el servidor:
```
npm run mockdb
```
