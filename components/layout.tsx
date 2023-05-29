import { User, AlignJustify, Target, X, BarChart2 } from 'react-feather'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logoJoko from '../public/images/logoJoko.png'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import colors from 'tailwindcss/colors'

const fullConfig = resolveConfig(tailwindConfig)

/**
 * Representa informacion de un modulo.
 * Esta informacion es utilizada por la cabecera y el sidebar para
 * mostrar informacion al respecto.  
 * id: Id designado al modulo.  
 * name: Nombre asignado al modulo.
 */
type Module = {
  id: number
  name: string
  route: string
}

interface ModuleObject {
  [index: string]: Module
}

const modules: ModuleObject = {
  "/":  {
    id: 0,
    name: "Dashboard",
    route: "/",
  },
  "/usuarios": {
    id: 1,
    name: "Usuarios",
    route: "/usuarios"
  },
}

/**
 * Layout principal del proyecto.  
 * Actualmente esta divido en 4 partes: CollapsedSidebar, Sidebar, Header y Content.  
 * El layout es un grid de Tailwind con 12 columnas y 12 filas y renderiza todo el contenido
 * de las paginas dentro del componente Content.
 * El sidebar colapsado solo puede ser visto para breakpoints inferiores a md.  
 */
export default function PageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [selectedModule, setSelectedModule] = useState<Module>(modules[router.pathname])
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true)
  return (
    <>
      <div className="static grid grid-rows-12 grid-cols-12">
        <CollapsedSidebar selectedModule={selectedModule} setSelectedModule={setSelectedModule}
          isSidebarCollapsed={isSidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <Sidebar classes={"max-md:hidden"} selectedModule={selectedModule} setSelectedModule={setSelectedModule}/>
        <Header selectedModule={selectedModule} setSidebarCollapsed={setSidebarCollapsed} />
        <Content>
          { children }
        </Content>
      </div>
    </>
  )
}

/**
 * Sidebar colapsado, solo es visible para breakpoins inferiores a md.
 * Recibe la informacion del modulo seleccionado actualmente y un estado
 * que representa si el sidebar tiene que estar colapsado (o sea, visible) o
 * no actualmente.  
 * Si el icono X es seleccionado entonces se cambia el estado del sidebar a colapsado.    
 * Recibe:  
 * selectedModule: Objeto tipo Module con informacion del actualmente seleccionado.  
 * setSelectedModule: Funcion para cambiar selectedModule.  
 * isSidebarCollapsed: Booleano que representa si el sidebar esta colapsado o no.  
 * setSidebarCollapsed: Funcion para cambiar el estado del sidebar a colapsado.
 */
function CollapsedSidebar({ selectedModule, setSelectedModule, isSidebarCollapsed, setSidebarCollapsed }: {
  selectedModule: Module,
  setSelectedModule: Function,
  isSidebarCollapsed: boolean,
  setSidebarCollapsed: Function,
}) {
  if (isSidebarCollapsed === true) {
    return null
  }
  else {
    return(
      <div className="md:hidden absolute border-r-2 h-screen z-10 bg-white text-neutral-450 w-5/6">
        <X className="m-3 hover:cursor-pointer" onClick={() => setSidebarCollapsed(true)} />
        <Sidebar classes={""} selectedModule={selectedModule} setSelectedModule={setSelectedModule}/> 
      </div>
    )
  }
}

/**
 * Sidebar del layout.  
 * Funciona como una lista <ul></ul> con la clase overflow-y-auto donde cada elemento <li></li> representa un item dentro
 * del sidebar.  
 * Ademas, cada elemento que no sea el titulo del sidebar tiene un next/link alrededor del <li></li> para
 * poder redireccionar a esa pagina.  
 * Recibe:  
 * selectedModule: Objeto tipo Module con informacion del actualmente seleccionado.  
 * setSelectedModule: Funcion para cambiar selectedModule.  
 */
function Sidebar({ selectedModule, setSelectedModule, classes }: {
  selectedModule: Module,
  setSelectedModule: Function,
  classes: String,
}) {
  return (
    <>
      <div className={classes + " row-span-6 bg-white overflow-y-auto col-span-2 py-3 text-neutral-450"}>
        <Link className="py-3 px-4 text-xl flex items-center justify-center" href="/" onClick={() => setSelectedModule(modules['/'])}>
          <Image
            src={logoJoko}
            alt="Joko Logo"
          />
        </Link>
        <ul className="w-full px-4">
          <li className="py-2 mx-2">
            Menú principal
          </li>
          <Link href="/" passHref>
            <SidebarItem 
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              moduleData={modules['/']}
            >
              <BarChart2 color={selectedModule.id == modules['/'].id ? colors.blue[500] : "gray"} className="inline-block" />
              <div className="px-4 text-lg">Dashboard</div>
            </SidebarItem>
          </Link>
          <Link href="/usuarios" passHref>
            <SidebarItem
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              moduleData={modules['/usuarios']}
            >
              <User color={selectedModule.id == modules['/usuarios'].id ? colors.blue[500] : "gray"} className="inline-block" />
              <div className="px-4 text-lg">Usuarios</div>
            </SidebarItem>
          </Link>
        </ul>
      </div>
    </>
  )
}

/**
 * Representa un item dentro del Sidebar (diferente de un titulo).
 * Cuando un item es seleccionado esto se ve reflejado en el sidebar cambiando el
 * color de fondo.  
 * Recibe:  
 * selectedModule: Objeto tipo Module con informacion del modulo actualmente seleccionado.  
 * setSelectedModule: Funcion para cambiar selectedModule si el item es clickeado.  
 * moduleData: Objeto tipo Module con informacion sobre el modulo asociado a este item.  
 * children: Contenido del item.  
 */
function SidebarItem({ selectedModule, setSelectedModule, moduleData, children }: {
  selectedModule: Module,
  setSelectedModule: Function,
  moduleData: Module,
  children: React.ReactNode,
}) {
  return (
    <li className={(selectedModule.id === moduleData.id ?
      "bg-blue-450 text-black font-semibold " : "hover:bg-blue-450 hover:text-black ") +
      "hover:cursor-pointer px-3 mx-1 py-2 my-2 rounded-md flex items-center"}
      onClick={() => {setSelectedModule(moduleData)}}
    >
      { children }
    </li>
  )
}

/**
 * Cabecera de la pagina, contiene un icono que es clickeable para poder colapsar el sidebar
 * y un boton para redirigir a la pagina de login.  
 * Si el icono AlignJustify es clickeado se cambia el estado del sidebar a no colapsado.  
 * Recibe:  
 * selectedModule: Objeto tipo Module con informacion del modulo actualmente seleccionado.  
 * setSidebarCollapsed: Funcion para cambiar el estado del sidebar a no colapsado.
 */
function Header({ selectedModule, setSidebarCollapsed }: { 
  selectedModule: Module,
  setSidebarCollapsed: Function,
}) {
  return (
    <div className="col-span-12 md:col-span-10 px-4 py-4 mt-2 bg-neutral-150 rounded-tl-3xl">
      <div className="md:hidden flex items-center justify-between">
        <AlignJustify onClick={() => setSidebarCollapsed(false)} />
        <Target size={50} className="border p-1 rounded-xl hover:cursor-pointer" />
        <Link href="/login" passHref><div className="text-right">Login</div></Link>
      </div>
      <Link href="/login" className="max-md:hidden" passHref><div className="text-right">Login</div></Link>
      <div className="mx-4 text-3xl font-semibold">
        { selectedModule.name }
      </div>
    </div>
  )
}

/**
 * Representa el contenido de la pagina que esta siendo visitada actualmente.  
 * Recibe:  
 * children: Contenido a mostrar definido en cada pagina dentro de pages/. 
 */
function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="row-span-11 col-span-12 md:col-span-10 h-screen bg-neutral-100">
      { children }
    </div>
  )
}