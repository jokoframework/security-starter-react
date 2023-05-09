import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import imagen from '../../images/desk_image1.jpg'
import { User, UserPlus } from "react-feather"
//Pagina de registro para los usuarios.
export default function Signup() {
    const minimun = 12 //Longitud minima de contrasenha
    const [pass1, setPass1] = useState('') //contra 1, seteador
    const [pass2, setPass2] = useState('') //contra 2, seteador

    /*  Maneja el evento de que cuando el input de contrasenha1 se "desenfoque" setea el valor de la contrasenha1 */
    function handlePassword1Blur(event: React.ChangeEvent<HTMLInputElement>){
        setPass1(event.target.value)
    }
    /*  Maneja el evento de que cuando el input de contrasenha2 se "desenfoque" setea el valor de la contrasenha2 */
    function handlePassword2Blur(event: React.ChangeEvent<HTMLInputElement>){
        setPass2(event.target.value)
    }

    /*  Compara las contrasenhas:
            si son iguales, entonces deja enviar el formulario.
            si no son iguales, entonces muestra un mensaje de error.
    */
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault() //evito que el formulario se envíe de una
        if (pass1 != pass2) {
            alert("Las contras no coinciden, intente de nuevo.")
            return false
        }
        event.currentTarget.submit()
        return true
    }

    return ( 
        <>
            <div className="min-h-screen min-w-full grid grid-flow-col grid-cols-2 gap-4 font-serif selection:bg-[#4f46e5] selection:text-white max-md:grid-cols-1">
                <div className="mx-auto my-auto flex flex-col justify-center items-center w-3/4 h-3/4">
                    <form onSubmit={handleSubmit} className="min-h-full min-w-full flex flex-col justify-center items-center p-6 gap-4 rounded-3xl"
                    action="/" method="post"> {/* TODO: ver donde enviar esto */}
                        <UserPlus size={150} color="#4f46e5"></UserPlus>
                        <h1 className="italic text-3xl font-black">
                            Registrarse
                        </h1>
                        <label className="min-w-full pt-1 pb-2">Introduzca su email: {/* si esta vacio entonces que no aplique los colores */}
                            <input type="email" className="block text-black min-w-full rounded-lg h-10 p-2 border-2 
                            invalid:text-red-500 invalid:border-red-500" required placeholder="ejemplo@ejemplo.com"></input>
                        </label>
                        <label className="min-w-full pt-1 pb-2">Introduzca su contraseña: 
                            <input onBlur={handlePassword1Blur} type="password" className="block text-black min-w-full rounded-lg h-10 p-2 border-2" 
                            required minLength={minimun} placeholder="**********"></input>
                        </label>
                        <label className="min-w-full pt-1 pb-2">Confirmar contraseña: 
                            <input onBlur={handlePassword2Blur} type="password" className="block text-black min-w-full rounded-lg h-10 p-2 border-2" 
                            required minLength={minimun} placeholder="**********"></input>
                        </label>
                        <button type="submit" className="bg-[#4f46e5] text-white rounded-2xl p-2 min-w-full">Registrarme</button>
                    </form>
                    <p>
                        <Link href="/" className="hover:font-extrabold">Click aqui</Link> para ir a la pagina principal 
                        {/* TODO: lo mas probable es que esto tenga que chutar */}
                    </p>
                </div>
                <div className="min-h-full min-w-full flex items-center justify-center max-md:hidden">
                    <Image src={imagen} className='max-h-screen min-h-full object-cover' alt="Imagen"></Image>
                </div>
            </div>
        </>
    )
}