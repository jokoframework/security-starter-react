import { User, Upload, AlignJustify, Target, Clipboard, Settings, X } from 'react-feather'
import Link from 'next/link'
import { useState } from 'react'

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
}

export default function PageLayout({ children }: { children: React.ReactNode }) {
  /**
   * Layout principal del proyecto.
   * Actualmente esta divido en 3 partes: Sidebar, Header y Content.
   * El layout es un grid de Tailwind CSS con 12 columnas y 12 filas y renderiza todo el contenido
   * de las paginas dentro del componente Content.
   */
  const [selectedModule, setSelectedModule] = useState<Module>({
      id: 0,
      name: 'Dashboard',
    }
  )
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true)
  return (
    <>
      <div className="static grid grid-rows-12 grid-cols-12 bg-neutral-150">
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

function CollapsedSidebar({ selectedModule, setSelectedModule, isSidebarCollapsed, setSidebarCollapsed }: {
  selectedModule: Module,
  setSelectedModule: Function,
  isSidebarCollapsed: boolean,
  setSidebarCollapsed: Function,
}) {
  /**
   * Sidebar colapsado, solo es visible para breakpoins inferiores a md.
   * Recibe la informacion del modulo seleccionado actualmente y un estado
   * que representa si el sidebar tiene que estar colapsado (o sea, visible) o
   * no actualmente.
   */
  if (isSidebarCollapsed == true) {
    return(
      <></>
    )
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

function Sidebar({ selectedModule, setSelectedModule, classes }: {
  selectedModule: Module,
  setSelectedModule: Function,
  classes: String,
}) {
  /**
   * Sidebar del layout. 
   * Funciona como una lista <ul></ul> con la clase overflow-y-auto donde cada elemento <li></li> representa un item dentro
   * del sidebar. 
   * Ademas, cada elemento que no sea el titulo del sidebar tiene un next/link alrededor del <li></li> para
   * poder redireccionar a esa pagina.
   */
  return (
    <>
      <div className={classes + " row-span-4 row-start-1 bg-white overflow-y-auto col-span-2 py-3 text-neutral-450"}>
        <Link className="py-3 px-4 text-xl flex items-center" href="/">
          <Target size={50} className="border p-1 rounded-xl inline-block" />
          <p className="px-3 inline-block antialiased text-black font-semibold">Joko Security</p>
        </Link>
        <ul className="w-full px-4">
          <li className="py-2 mx-2">
            Menú principal
          </li>
          <Link href="/" passHref>
            <SidebarItem 
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              moduleData={{
                id: 0,
                name: 'Dashboard',
              }}
            >
              <User className="inline-block" />
            </SidebarItem>
          </Link>
          <Link href="/item1" passHref>
            <SidebarItem
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              moduleData={{
                id: 1,
                name: 'Apps',
              }}
            >
              <Upload className="inline-block" />
            </SidebarItem>
          </Link>
        </ul>
        <ul className="w-full px-4">
          <li className="py-2 mx-2">
            Workflows
          </li>
          <Link href="/item2" passHref>
            <SidebarItem
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              moduleData={{
                id: 2,
                name: 'To-Do',
              }}
            >
              <Clipboard className="inline-block" />
            </SidebarItem>
          </Link>
        </ul>
        <ul className="w-full px-4">
          <li className="py-2 mx-2">
            General
          </li>
          <Link href="/item2" passHref>
          <SidebarItem
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              moduleData={{
                id: 3,
                name: 'Settings',
              }}
            >              
              <Settings className="inline-block" />
            </SidebarItem>
          </Link>
        </ul>
      </div>
    </>
  )
}

function SidebarItem({ selectedModule, setSelectedModule, moduleData, children }: {
  selectedModule: Module,
  setSelectedModule: Function,
  moduleData: Module,
  children: React.ReactNode,
}) {
  /**
   * Representa un item dentro del Sidebar (diferente de un titulo).
   * Recibe:
   * selectedModule: El id del modulo seleccionado.
   * setSelectedModule: Funcion para cambiar el modulo seleccionado por moduleId.
   * moduleId: Id del modulo al que hace referencia este item.
   * children: Contenido del item.
   */
  return (
    <li className={(selectedModule.id === moduleData.id ?
      "bg-blue-450 text-black font-bold" : "hover:bg-blue-450 hover:text-black ") +
      "hover:cursor-pointer px-2 py-2 rounded-md flex items-center"}
      onClick={() => setSelectedModule(moduleData)}>
     { children }
     <div className="px-4 text-lg">{moduleData.name}</div>
    </li>
  )
}

function Header({ selectedModule, setSidebarCollapsed }: { 
  selectedModule: Module,
  setSidebarCollapsed: Function,
}) {
  /**
   * Cabecera de la pagina, actualmente solo contiene un icono que es clickeable para poder colapsar el sidebar.
   * TODO: Hacer que el icono sea clickeable para colapsar el sidebar.
   */
  return (
    <div className="col-span-12 md:col-span-10 row-span-1 px-4 py-4">
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

function Content({ children }: { children: React.ReactNode }) {
  /**
   * Representa el contenido de la pagina que esta siendo visitada actualmente.
   */
  return (
    <div className="row-span-3 col-span-12 md:col-span-10 bg-neutral-100">
      <div className="m-5 p-4 h-screen bg-white rounded-s drop-shadow-md">
        { children }
      </div>
    </div>
  )
}