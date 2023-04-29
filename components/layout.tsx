import { User, Upload, AlignJustify } from 'react-feather'
import Link from 'next/link'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  /**
   * Layout principal del proyecto.
   * Actualmente esta divido en 3 partes: Sidebar, Header y Content.
   * El layout es un grid de Tailwind CSS con 12 columnas y 12 filas y renderiza todo el contenido
   * de las paginas dentro del componente Content.
   */
  return (
    <div className="grid grid-rows-12 grid-cols-12">
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
      <div className="max-md:hidden row-span-4 row-start-1 bg-blue-900 overflow-y-auto col-span-2 py-3 text-slate-300">
        <ul className="w-full">
          <li className="py-2 mx-2 font-semibold text-center">
            <Link className="px-4 text-xl hover:text-slate-50" href="/">
              Joko Security
            </Link>
          </li>
          <Link href="/item1" passHref>
            <li className="hover:cursor-pointer px-2 py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-50 flex items-center">
              <User className="inline-block" />
              <div className="px-4 text-lg">Item 1</div>
            </li>
          </Link>
          <Link href="/item2" passHref>
            <li className="hover:cursor-pointer px-2 py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-50 flex items-center">
              <Upload className="inline-block" />
              <div className="px-4 text-lg">Item 2</div>
            </li>
          </Link>
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