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

type Query = {
  name_like: string
  _page: string
}

export async function getServerSideProps({ query }: { query: Query }) {
  // Si el query esta vacio, traer todos los usuarios. Caso contrario, filtrar.
  let queryurl = ''
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
  let linkObject = {}
  let linkHeader = res.headers.get('link')
  if (linkHeader) {
    const links = linkHeader.split(',')
    links.map((link) => {
      let matches = link.match(linkregex)
      let url = new URL(matches?.groups!.link)
      linkObject[matches?.groups!.key] = "/usuarios" + url.search
      if(matches?.groups!.key === "last") {
        linkObject["lastPage"] = url.searchParams.get("_page")
      }
    })
    linkObject["currentPage"] = query._page ? query._page : 1
    linkObject["firstPage"] = 1
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
export default function UsersTable({ userData, paginationData }: { userData: User[] }) {
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
      <div className="bg-white border rounded-lg my-5 mx-9 text-neutral-600">
        <table className="p-5 px-9 table-fixed w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left">
              <th className="py-5">Nombre</th>
              <th className="py-5">Username</th>
              <th className="py-5">Email</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user: User, i: number, arr: User[]) => (
              <tr key={user.id}>
                <td className={(arr.length - 1 !== i ? "border-b-2 " : "") + "py-4"}>{user.name}</td>
                <td className={(arr.length - 1 !== i ? "border-b-2 " : "") + "py-4"}>{user.username}</td>
                <td className={(arr.length - 1 !== i ? "border-b-2 " : "") + "py-4"}>{user.email}</td>
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

function PaginationControls({ paginationData }) {
  const router = useRouter()
  return(
    <>
      <div className="flex items-center">
        <ChevronsLeft size={30} className="inline-block border" onClick={() => Object.hasOwn(paginationData, 'first') ? router.replace(paginationData.first) : null} />
        <ChevronLeft size={30} className="inline-block border" onClick={() => Object.hasOwn(paginationData, 'prev') ? router.replace(paginationData.prev) : null} />
        <ChevronRight size={30} className="inline-block border" onClick={() => Object.hasOwn(paginationData, 'next') ? router.replace(paginationData.next) : null} />
        <ChevronsRight size={30} className="inline-block border" onClick={() => Object.hasOwn(paginationData, 'last') ? router.replace(paginationData.last) : null} />
        <div className="inline-block">
          Página {paginationData.currentPage} de {paginationData.lastPage}
        </div>
      </div>
    </> 
  )
}