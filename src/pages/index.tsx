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
          <li className="py-2 mx-2 font-semibold text-center">
            <a className="px-4 text-xl hover:text-slate-50" href="#">
              Joko Security
            </a>
          </li>
          <li className="hover:cursor-pointer py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-50">
           <a className="px-4 text-lg" href="#">
              Item 1
            </a>
          </li>
          <li className="hover:cursor-pointer py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-100">
            <a className="px-4 text-lg" href="#">
              Item 2
            </a>
          </li>
        </ul>
      </div>
      <div className="max-sm:col-span-12 col-span-10 px-3 py-4">
        <div>Cabecera</div>
      </div>
      <div className="row-span-3 max-sm:col-span-12 col-span-10 bg-neutral-100">
        <div className="m-4 p-4  h-screen bg-white">
          <p className="text-3xl font-bold">Bienvenido a Joko Security.</p>
          <h1 className="text-3xl">TODO:</h1>
          <ul>
            <li>
              Iconos para los items en el navbar.
            </li>
            <li>
              Boton en la cabecera para esconder y hacer aparecer el navbar.
            </li>
            <li>
              Hacer que el layout sea un layout de verdad (aplicarlo a diferentes rutas).
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
