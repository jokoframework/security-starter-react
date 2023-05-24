import process from 'process'
import { Key } from 'react'
import { Inter } from 'next/font/google'
import { Search } from 'react-feather'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'

const inter = Inter({ subsets: ['latin'] })

type User = {
  id: Key
  name: String
  username: String
  email: String
}

/**
 * Representa los query parameters al realizar una busqueda por nombre.  
 * name_like: Nombre del usuario a la hora de realizar la busqueda.  
 * _page: Numero de pagina.
 */
type Query = {
  name_like: string
  _page: string
}

/**
 * Representa el objeto que tiene como llave un string que representa
 * una pagina dependiendo de su posicion como "first", "last", "next" y "prev".  
 * El valor es el url que se utiliza para acceder a esa pagina.
 */
interface LinkObject {
  [index: string]: string
}

export async function getServerSideProps({ query }: { query: Query }) {
  // Si el query esta vacio, traer todos los usuarios. Caso contrario, filtrar dependiendo de los parametros pasados.
  let queryurl: string = ''
  if (query.name_like && query._page) {
    queryurl = `${process.env.NEXT_PUBLIC_MOCK_USER_URL}?name_like=${query.name_like}&_page=${query._page}`
  } 
  else if (!query.name_like && query._page) {
    queryurl = `${process.env.NEXT_PUBLIC_MOCK_USER_URL}?name_like=&_page=${query._page}`
  }
  else if (query.name_like && !query._page) {
    queryurl = `${process.env.NEXT_PUBLIC_MOCK_USER_URL}?name_like=${query.name_like}&_page=1`
  }
  else {
    queryurl = `${process.env.NEXT_PUBLIC_MOCK_USER_URL}?name_like=&_page=1`
  }
  const res = await fetch(queryurl)
  // ! El header de link es proveido por el json-server
  const linkregex = /<(?<link>.+)>;\srel="(?<key>\w+)"/
  let linkObject: LinkObject = {}
  let linkHeader = res.headers.get('link')
  if (linkHeader) {
    const links = linkHeader.split(',')
    links.map((link) => {
      let matches = link.match(linkregex)
      if (typeof matches?.groups === "undefined") {
        throw "Error: No se encontraron enlaces que cumplan el patron definido en el header."
      }
      let url = new URL(matches.groups.link)
      linkObject[matches.groups.key] = "/usuarios" + url.search
      if(matches.groups.key === "last") {
        // El get estara definido debido a que se encontro una entrada last en el header.
        linkObject["lastPage"] = url.searchParams.get("_page")!
      }
    })
    // Convertir a string para seguir con la definicion de LinkObject.
    linkObject["currentPage"] = (query._page ? query._page : 1).toString()
  }
  const data = await res.json()
  return {
    props: { 
      userData: data,
      paginationData: linkObject,
    },
  }
}

/**
 * Renderiza la tabla de usuarios leida de db.json.
 * Existe un input para filtrar los usuarios por su nombre y este renderiza la pagina
 * de vuelta con router.replace haciendo que se llame a getServerSideProps() otra vez.
 */
export default function UsersTable({ userData, paginationData }: { userData: User[], paginationData: LinkObject }) {
  const router = useRouter()
  return (
    <>
      <div className="relative block mx-9 w-1/3">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Search size={20} color="gray" className="inline-block ml-2" />
        </div>
        <input 
          onChange={e => router.replace(`${window.location.pathname}?name_like=${e.currentTarget.value}`)} 
          className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm lg:text-lg"
          placeholder="Buscar por nombre..."
        />
      </div>
      <div className="bg-white border rounded-lg my-5 mx-9 p-8 text-neutral-600">
        <table className="p-5 px-9 table-fixed w-full">
          <thead>
            <tr className="text-left">
              <th className="py-5">Nombre</th>
              <th className="py-5">Username</th>
              <th className="py-5">Email</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user: User) => (
              <tr key={user.id} className="last:border-b-0 border-b-2">
                <td className="py-4">{user.name}</td>
                <td className="py-4">{user.username}</td>
                <td className="py-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-9 w-1/3 text-left">
        <PaginationControls paginationData={paginationData} />
      </div>
    </>
  )
}

/**
 * Componente con los botones para cambiar las paginas. Si alguno de los links no esta definido, el boton no redirecciona.
 */
function PaginationControls({ paginationData }: { paginationData: LinkObject }) {
  const router = useRouter()
  return(
    <>
      <div className="flex items-center">
        <ChevronsLeft size={30} className="inline-block border" onClick={() => paginationData.first ? router.replace(paginationData.first) : null} />
        <ChevronLeft size={30} className="inline-block border" onClick={() => paginationData.prev ? router.replace(paginationData.prev) : null} />
        <ChevronRight size={30} className="inline-block border" onClick={() => paginationData.next ? router.replace(paginationData.next) : null} />
        <ChevronsRight size={30} className="inline-block border" onClick={() => paginationData.last ? router.replace(paginationData.last) : null} />
        <div className="inline-block ml-2">
          Página {paginationData.currentPage} de {paginationData.lastPage}
        </div>
      </div>
    </> 
  )
}