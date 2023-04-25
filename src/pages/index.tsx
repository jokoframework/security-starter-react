import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className="grid grid-rows-12 grid-cols-12">
      <div className="max-sm:hidden row-span-4 row-start-1 bg-blue-900 overflow-y-auto col-span-2 py-3 text-slate-300">
        <ul className="w-full">
          <li className="py-2 mx-2 rounded-md hover:bg-blue-500">
            <a className="px-4 text-lg hover:text-slate-100" href="#">
              Barra de navegacion
            </a>
          </li>
          <li className="py-2 mx-2 rounded-md hover:bg-blue-500">
           <a className="px-4 text-lg hover:text-slate-100" href="#">
              Item 1
            </a>
          </li>
          <li className="py-2 mx-2 rounded-md hover:bg-blue-500">
            <a className="px-4 text-lg hover:text-slate-100" href="#">
              Item 2
            </a>
          </li>
        </ul>
      </div>
      <div className="max-sm:col-span-12 col-span-10 px-3 py-3">
        <div>Cabecera (falta boton)</div>
      </div>
      <div className="row-span-3 max-sm:col-span-12 col-span-10 bg-neutral-100">
        <h1 className="m-4 p-4 text-3xl h-screen font-bold bg-white">
          Bienvenido a Joko Security.
        </h1>
      </div>
    </div>
    </>
  )
}
