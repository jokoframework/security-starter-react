import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className="grid grid-rows-3 grid-flow-col">
      <div className="max-sm:hidden row-span-3 bg-blue-950 overflow-y-auto col-span-1 flex items-center text-slate-300">
        <ul>
          <li>
            <a className="px-4 text-lg hover:text-slate-100 hover:bg-blue-500" href="#">
              Barra de navegacion
            </a>
          </li>
          <li>
           <a className="px-4 text-lg hover:text-slate-100 hover:bg-blue-500" href="#">
              Item 1
            </a>
          </li>
          <li>
            <a className="px-4 text-lg hover:text-slate-100 hover:bg-blue-500" href="#">
              Item 2
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-11">
        <div className=""></div>
        <div>Cabecera</div>
      </div>
      <div className="row-span-2 col-span-11 bg-slate-200">
        <h1 className="m-4 p-4 text-3xl font-bold underline bg-white">
          Bienvenido a Joko Security.
        </h1>
      </div>
    </div>
    </>
  )
}