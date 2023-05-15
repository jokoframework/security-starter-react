import { Inter } from 'next/font/google'
import { Card, Text, Metric } from '@tremor/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Card className="max-w-xs mx-auto">
      <Text>Sales</Text>
      <Metric>$ 34,743</Metric>
    </Card>
      <p className="text-3xl font-bold">Bienvenido a Joko Security.</p>
      <h1 className="text-3xl">TODO:</h1>
      <ul>
        <li>
        </li>
      </ul>
    </>
  )
}