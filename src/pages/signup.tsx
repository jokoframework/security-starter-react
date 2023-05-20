import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import imagen from '../../public/images/desk_image1.jpg'
import { UserPlus } from "react-feather"
import { useRouter } from 'next/router';
//Url del json server
const mockURL = process.env.NEXT_PUBLIC_MOCK_USER_URL

export default function Signup() {
    const router = useRouter();
    const minimun = 12 //Longitud minima de contrasenha
    const [pass1, setPass1] = useState('') //contra 1, seteador
    const [pass2, setPass2] = useState('') //contra 2, seteador
    const [email, setEmail] = useState('') //email, seteador
     //Objeto que sirve para enviar en el body de la API fetch
     const data = { 
        email: email, 
        password: pass1 
    }
    /*  Maneja el evento de que cuando el input de contra1 se cambia, setea el valor de pass1 */
    function handlePassword1Change(event: React.ChangeEvent<HTMLInputElement>){
        setPass1(event.target.value)
    }
    /*  Maneja el evento de que cuando el input de contra2 se cambia, setea el valor de pass2 */
    function handlePassword2Change(event: React.ChangeEvent<HTMLInputElement>){
        setPass2(event.target.value)
    }
    /*  Maneja el evento de que cuando el input de email se cambia, setea el valor de email */
    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault() //evito que el formulario se envíe de una
        //Verificacion de contras, si no son iguales se notifica
        if (pass1 != pass2) {
            alert("Las contras no coinciden, intente de nuevo.")
            return false
        }
        //Mando los datos al json server
        try { 
            let response = await fetch(mockURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-Type': 'application/json'
                }
              })
            let responseJson = await response.json()
            //Validaciones para notificar al usuario
            if (response.ok) {
                alert("Registro exitoso, usuario creado")
                router.push('/')
            } else if (typeof responseJson === 'string') {
                 alert("Ocurrio un problema al crear el usuario\n\n"+responseJson)
            } else {
                alert("Ocurrio un problema al iniciar sesion, por favor, intente de nuevo...")
            }
            //para recuperar el access token y guardarlo en el storage del browser
            let token = responseJson.accessToken
            localStorage.setItem("accessToken", token) //guardo el access token en el storage del browser
            localStorage.setItem("email", email) //guardo el email en el storage del browser
        } catch (error) {
            alert("Ocurrio un problema con el servidor, intente de nuevo en unos instantes...\n"+ error)
            return error
        }
    }
    //Pagina de registro para los usuarios.
    return ( 
        <>
            <div className="min-h-screen min-w-full grid grid-flow-col grid-cols-2 gap-4 bg-neutral-150 selection:bg-lila selection:text-white max-md:grid-cols-1">
                <div className="mx-auto my-auto flex flex-col justify-center items-center w-3/4 h-3/4">
                    <form onSubmit={handleSubmit} className="min-h-full min-w-full flex flex-col justify-center items-center p-6 gap-4 rounded-3xl"> 
                        <UserPlus size={150} color="#4f46e5"></UserPlus>
                        <h1 className="text-3xl font-black">
                            Registrarse
                        </h1>
                        <label className="min-w-full pt-1 pb-2">Introduzca su email:
                            <input onChange={handleEmailChange} type="email" className="block text-black min-w-full rounded-lg h-10 p-2 border-2" 
                            required placeholder="ejemplo@ejemplo.com"></input>
                        </label>
                        <label className="min-w-full pt-1 pb-2">Introduzca su contraseña: 
                            <input onChange={handlePassword1Change} type="password" className="block text-black min-w-full rounded-lg h-10 p-2 border-2" 
                            required minLength={minimun} placeholder="**********"></input>
                        </label>
                        <label className="min-w-full pt-1 pb-2">Confirmar contraseña: 
                            <input onChange={handlePassword2Change} type="password" className="block text-black min-w-full rounded-lg h-10 p-2 border-2" 
                            required minLength={minimun} placeholder="**********"></input>
                        </label>
                        <button type="submit" className="bg-lila text-white rounded-2xl p-2 min-w-full">Registrarme</button>
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

//json-server db.json -m ./node_modules/json-server-auth --port 3001