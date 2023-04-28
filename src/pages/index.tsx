import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { User, Upload, AlignJustify } from 'react-feather'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className="grid grid-rows-12 grid-cols-12">
      <div className="max-sm:hidden row-span-4 row-start-1 bg-blue-900 overflow-y-auto col-span-2 py-3 text-slate-300">
        <ul className="w-full">
          <li className="py-2 mx-2 font-semibold text-center">
            <Link className="px-4 text-xl hover:text-slate-50" href="/">
              Joko Security
            </Link>
          </li>
          <li className="hover:cursor-pointer px-2 py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-50 flex items-center">
            <User className="inline-block" />
            <Link className="px-4 text-lg" href="#">
              Item 1
            </Link>
          </li>
          <li className="hover:cursor-pointer px-2 py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-50 flex items-center">
            <Upload className="inline-block" />
            <Link className="px-4 text-lg" href="#">
              Item 2
            </Link>
          </li>
        </ul>
      </div>
      <div className="max-sm:col-span-12 col-span-10 px-4 py-4">
        <AlignJustify className="inline-block" />
      </div>
      <div className="row-span-3 max-sm:col-span-12 col-span-10 bg-neutral-100">
        <div className="m-4 p-4  h-screen bg-white">
          <p className="text-3xl font-bold">Bienvenido a Joko Security.</p>
          <h1 className="text-3xl">TODO:</h1>
          <ul>
            <li>
              Boton en la cabecera para esconder y hacer aparecer el navbar.
            </li>
            <li>
              Hacer que el layout sea un layout de verdad (aplicarlo a diferentes rutas).
            </li>
            <li>
              Hacer que los items en el navbar sean clickeables en lugar de solo el texto.
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
