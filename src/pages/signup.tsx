import Link from "next/link"
import React, { useState } from "react"
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
            <div className="min-h-screen min-w-full mx-auto my-auto flex flex-col justify-center items-center bg-slate-900 text-white gap-4 font-serif">
                <form onSubmit={handleSubmit} className="border flex flex-col justify-center items-center bg-slate-700 p-6 gap-4 rounded-3xl"
                action="/" method="post"> {/* TODO: ver donde enviar esto */}
                    <h1 className="italic text-3xl">
                        Registrarse
                    </h1>
                    <label className="min-w-full">Introduzca su email: 
                        <input type="email" className="block text-black min-w-full h-8 p-2" required placeholder="ejemplo@ejemplo.com"></input>
                    </label>
                    <label className="min-w-full">Contraseña: 
                        <input onBlur={handlePassword1Blur} type="password" className="block text-black min-w-full h-8 p-2" 
                        required minLength={minimun} placeholder="**********"></input>
                    </label>
                    <label className="min-w-full">Confirmar contraseña: 
                        <input onBlur={handlePassword2Blur} type="password" className="block text-black min-w-full h-8 p-2" 
                        required minLength={minimun} placeholder="**********"></input>
                    </label>
                    <button type="submit" className="bg-gray-400 rounded-2xl p-2 min-w-full">Registrarme</button>
                </form>
                <p>
                    <Link href="/" className="hover:font-extrabold">Click aqui</Link> para ir a la pagina principal 
                    {/* TODO: lo mas probable es que esto tenga que chutar */}
                </p>
            </div>
        </>
    )
}