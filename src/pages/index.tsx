import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="max-sm:hidden row-span-3 bg-blue-950">Barra de navegacion</div>
      <div className="col-span-2">Cabecera</div>
      <div className="row-span-2 col-span-2 bg-neutral-400">
        <h1 className="text-3xl font-bold underline">
          Bienvenido a Joko Security.
        </h1>
      </div>
    </div>
    </>
  )
}
