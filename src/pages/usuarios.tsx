import process from 'process'
import { Key, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { Search } from 'react-feather'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'
import { useState } from 'react'

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

/**
 * Renderiza la tabla de usuarios leida de db.json.
 * Existe un input para filtrar los usuarios por su nombre y este renderiza la pagina
 * de vuelta con router.replace haciendo que se llame a getServerSideProps() otra vez.
 */
export default function UsersTable() {
  const [totalCount, setTotalCount] = useState<number>(0)
  const [nameLike, setNameLike] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [lastPage, setLastPage] = useState<number>(0)
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MOCK_USER_URL}?_page=${page}&name_like=${nameLike}&_limit=${limit}`)
    .then((resp) => {
      setTotalCount(Number(resp.headers.get('X-Total-Count')!))
      /**
       * Si la division es exacta, entonces la cantidad de paginas es la division.
       * Caso contrario, la ultima pagina es la division + 1 
       * (solo que la ultima pagina no tendra tantos elementos como limit).
       */
      setLastPage(Math.ceil(totalCount / limit))
      return resp.json()
    })
    .then((data) => {
      setData(data)
    })
  }, [page, nameLike, totalCount, limit, lastPage])
  return (
    <>
      <div className="relative block mx-9 w-2/3 md:w-1/3">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Search size={20} color="gray" className="inline-block ml-2" />
        </div>
        <input 
          onChange={e => { setNameLike(e.currentTarget.value); setPage(1) }} 
          className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm lg:text-lg"
          placeholder="Buscar por nombre..."
        />
      </div>
      <div className="bg-white border rounded-lg my-5 mx-9 p-8 text-neutral-600 sm:text-sm">
        <table className="p-5 px-9 table-fixed w-full">
          <thead>
            <tr className="text-left">
              <th className="py-5">Nombre</th>
              <th className="py-5">Username</th>
              <th className="py-5">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d: User) => (
              <tr key={d.id} className="last:border-b-0 border-b-2 break-all">
                <td className="py-4 text-sm md:text-base">{d.name}</td>
                <td className="py-4 text-sm md:text-base">{d.username}</td>
                <td className="py-4 text-sm md:text-base">{d.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-9 text-left">
        <PaginationControls page={page} lastPage={lastPage} setPage={setPage} />
      </div>
    </>
  )
}

/**
 * Componente con los botones para cambiar las paginas. Si alguno de los links no esta definido, el boton no redirecciona.
 */
function PaginationControls({ page, lastPage, setPage }: { 
  page: number,
  lastPage: number,
  setPage: Function,
}) {
  return(
    <>
      <div className="flex items-center">
        <ChevronsLeft size={30} className="inline-block border bg-white" onClick={() => setPage(1)} />
        <ChevronLeft size={30} className="inline-block border bg-white" onClick={() => page <= 1 ? setPage(1) : setPage(page - 1)} />
        <ChevronRight size={30} className="inline-block border bg-white" onClick={() => page >= lastPage ? setPage(lastPage) : setPage(page + 1)} />
        <ChevronsRight size={30} className="inline-block border bg-white" onClick={() => setPage(lastPage)} />
        <div className="inline-block ml-2 text-sm md:text-base">
          Página {page} de {lastPage}
        </div>
      </div>
    </> 
  )
}