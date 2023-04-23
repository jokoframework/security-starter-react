import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <p className="text-3xl font-bold">Bienvenido a Joko Security.</p>
      <h1 className="text-3xl">TODO:</h1>
      <ul>
        <li>
          Boton en la cabecera para esconder y hacer aparecer el navbar.
        </li>
      </ul>
    </>
  )
}