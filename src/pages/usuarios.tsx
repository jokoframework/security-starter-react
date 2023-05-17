import process from "process"
import { Key } from "react"

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
    <table className="table-auto">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user: User) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}