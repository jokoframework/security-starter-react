import Link from "next/link"
//Pagina de registro para los usuarios.
export default function Signup() {
    return ( 
        <>
            <div className="min-h-screen min-w-full mx-auto my-auto flex flex-col justify-center items-center bg-slate-900 text-white gap-4 font-serif">
                <form onSubmit={validarContrasenas} className="border flex flex-col justify-center items-center bg-slate-700 p-6 gap-4 rounded-3xl"
                action="/" method="post"> {/* TODO: ver donde enviar esto */}
                    <h1 className="italic text-3xl">
                        Registrarse
                    </h1>
                    <label className="min-w-full">Introduzca su email: 
                        <input type="email" className="block text-black min-w-full h-8 p-2" required placeholder="ejemplo@ejemplo.com"></input>
                    </label>
                    <label className="min-w-full">Contraseña: 
                        <input type="password" id="password1" className="block text-black min-w-full h-8 p-2" 
                        required minLength={12} placeholder="**********"></input>
                    </label>
                    <label className="min-w-full">Confirmar contraseña: 
                        <input type="password" id="password2" className="block text-black min-w-full h-8 p-2" 
                        required minLength={12} placeholder="**********"></input>
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

function validarContrasenas(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() //evito que el formulario se envíe de una
    const password1Input = document.getElementById("password1") as HTMLInputElement
    const password2Input = document.getElementById("password2") as HTMLInputElement
    //TODO: cambiar la forma que obtengo las contras, hacer mas react-like (usar estados)
    const password1 = password1Input.value
    const password2 = password2Input.value
  
    if (password1 != password2) { 
        alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.")
        return false
    }
    event.currentTarget.submit() 
    return true
}