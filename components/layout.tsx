import { User, Upload, AlignJustify, Target } from 'react-feather'
import Link from 'next/link'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  /**
   * Layout principal del proyecto.
   * Actualmente esta divido en 3 partes: Sidebar, Header y Content.
   * El layout es un grid de Tailwind CSS con 12 columnas y 12 filas y renderiza todo el contenido
   * de las paginas dentro del componente Content.
   */
  return (
    <div className="grid grid-rows-12 grid-cols-12 bg-neutral-150">
      <Sidebar />
      <Header />
      <Content>
        { children }
      </Content>
    </div>
  )
}

function Sidebar() {
  /**
   * Sidebar del layout. 
   * Funciona como una lista <ul></ul> con la clase overflow-y-auto donde cada elemento <li></li> representa un item dentro
   * del sidebar. 
   * Ademas, cada elemento que no sea el titulo del sidebar tiene un next/link alrededor del <li></li> para
   * poder redireccionar a esa pagina.
   * TODO: Hacer que sea colapsable.
   */
  return (
    <>
      <div className="max-md:hidden row-span-4 row-start-1 bg-white overflow-y-auto col-span-2 py-3 text-neutral-450">
        <Link className="py-3 px-4 text-xl flex items-center" href="/">
          <Target size={50} className="border p-1 rounded-xl inline-block" />
          <p className="px-3 inline-block antialiased text-black font-semibold">Joko Security</p>
        </Link>
        <ul className="w-full px-4">
          <li className="py-2 mx-2">
            Menú principal
          </li>
          <Link href="/item1" passHref>
            <li className="hover:cursor-pointer px-2 py-2 rounded-md hover:bg-blue-450 hover:text-black flex items-center">
              <User className="inline-block" />
              <div className="px-4 text-lg">Dashboard</div>
            </li>
          </Link>
          <Link href="/item2" passHref>
            <li className="hover:cursor-pointer px-2 py-2 rounded-md hover:bg-blue-450 hover:text-black flex items-center">
              <Upload className="inline-block" />
              <div className="px-4 text-lg">Apps</div>
            </li>
          </Link>
        </ul>
        <ul className="w-full px-4">
          <li className="py-2 mx-2">
            Workflows
          </li>
        </ul>
        <ul className="w-full px-4">
          <li className="py-2 mx-2">
            General
          </li>
        </ul>
      </div>
    </>
  )
}

function Header() {
  /**
   * Cabecera de la pagina, actualmente solo contiene un icono que es clickeable para poder colapsar el sidebar.
   * TODO: Hacer que el icono sea clickeable para colapsar el sidebar.
   */
  return (
    <div className="col-span-12 md:col-span-10 row-span-1 px-4 py-4">
      <AlignJustify className="inline-block" />
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  /**
   * Representa el contenido de la pagina que esta siendo visitada actualmente.
   */
  return (
    <div className="row-span-3 col-span-12 md:col-span-10 bg-neutral-100">
      <div className="m-4 p-4 h-screen bg-white">
        { children }
      </div>
    </div>
  )
}