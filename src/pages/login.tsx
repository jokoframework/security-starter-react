import Link from "next/link"
import Image from "next/image"
import logoJoko from '../../public/images/logoJoko.png'
import imagen from '../../public/images/modelo.jpg'
import React, { useState } from "react"
import { useRouter } from "next/router"
import { loginUser } from "../utils/api"

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('') //email, seteador
    const [pass, setPass] = useState('') //contra, seteador

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPass(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault() //evito que el formulario se envíe de una
        ////Objeto que sirve para enviar en el body de la API fetch
        const data = { 
            email: email, 
            password: pass
        }
        //Mando los datos al json server
        let postOK = await loginUser(data)
        if (postOK) { //Si el usuario se pudo autenticar, redirigo a la pagina principal.
            router.push("/")
        }
    }

//Pagina de login para los usuarios.
    return (
        <>
            <div className="min-h-screen min-w-full grid grid-flow-col grid-cols-2 selection:bg-lila selection:text-white max-md:grid-cols-1">
                <div className="mx-auto my-auto flex flex-col justify-center items-center w-3/4 h-3/4">
                    <form onSubmit={handleSubmit} action="/" className=" min-h-full min-w-full flex flex-col p-6 gap-4 rounded-3xl">
                        <Image src={logoJoko} alt="Joko logo" priority={true}></Image>
                        <h1 className="text-2xl font-black">Inicie sesion</h1>
                        <label className="min-w-full pt-2 pb-2 text-gray-600">Introduzca su email:
                            <input onChange={handleEmailChange} type="email" className="block text-black min-w-full rounded-lg h-10 p-2 border-2 mt-2 hover:border-lila" 
                            required placeholder="ejemplo@ejemplo.com"></input>
                        </label>
                        <label className="min-w-full pt-2 pb-2 text-gray-600">Introduzca su contraseña: 
                            <input onChange={handlePasswordChange} type="password" className="block text-black min-w-full rounded-lg h-10 p-2 border-2 mt-2 hover:border-lila" 
                            required placeholder="**********"></input>
                        </label>
                        <div className="min-w-full flex justify-between"> 
                            <label className="flex items-center hover:cursor-pointer text-gray-400 hover:text-lila"> {/* Accent-color creo que no soportan todos los navegadores, investigar */}
                                <input type="checkbox" className="mr-2 p-0 accent-lila"></input>Recordarme 
                            </label>
                            <p className="hover:underline text-[#4f46e5]"><Link href="/signup">Registrarse</Link></p> 
                        </div>
                        <button type="submit" className="bg-lila text-white rounded-xl p-2 mt-2 min-w-full hover:bg-violet-500 focus:cursor-wait">Iniciar</button>
                    </form>
                </div>
                <div className="min-h-full min-w-full flex items-center justify-center max-md:hidden">
                    <Image src={imagen} className='max-h-screen min-h-full object-cover' alt="Imagen" priority={true}></Image>
                </div>
            </div>
        </>
    );
}
