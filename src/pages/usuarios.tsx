import process from 'process'
import { Key } from 'react'
import { Inter } from 'next/font/google'
import { Search } from 'react-feather'

const inter = Inter({ subsets: ['latin'] })

type User = {
  id: Key
  name: String
  username: String
  email: String
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.MOCK_DB_URL}/users`)
  const data = await res.json()
  return {
    props: { data },
  }
}

export default function UsersTable({ data }: { data: User[] }) {
  return (
    <>
      {
        // TODO: Hacer que la busqueda funcione.
      }
      <div className="relative block mx-9 w-1/3">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Search size={20} color="gray" className="inline-block ml-2" />
        </div>
        <input className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm lg:text-lg" placeholder="Buscar por nombre..." />
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
            {data.map((user: User, i: number, arr: User[]) => (
              <tr key={user.id}>
                <td className={(arr.length - 1 !== i ? "border-b-2 " : "") + "py-4"}>{user.name}</td>
                <td className={(arr.length - 1 !== i ? "border-b-2 " : "") + "py-4"}>{user.username}</td>
                <td className={(arr.length - 1 !== i ? "border-b-2 " : "") + "py-4"}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}