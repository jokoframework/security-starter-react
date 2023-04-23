import Link from "next/link"
//Pagina de login para los usuarios.
export default function Login() {
    return ( 
        <> {/* TODO: Usar variables de css (no hay comentarios semanticos, bajon)*/}
            <div className="min-h-screen min-w-full mx-auto my-auto flex flex-col justify-center items-center bg-slate-900 text-white gap-4 font-serif">
                <form className="border flex flex-col justify-center items-center bg-slate-700 p-6 gap-4 rounded-3xl"> {/* TODO: ver donde enviar esto */}
                    <h1 className="italic text-3xl">
                        Inicie sesion
                    </h1>
                    <label className="min-w-full">Introduzca su email: 
                        <input type="email" className="block text-black min-w-full h-8 p-2" required placeholder="ejemplo@ejemplo.com"></input>
                    </label>
                    <label className="min-w-full">Contraseña: 
                        <input type="password" className="block text-black min-w-full h-8 p-2" required minLength={12} placeholder="**********"></input>
                    </label>
                    <button type="submit" className="bg-gray-400 rounded-2xl p-2 min-w-full">Iniciar</button>
                    <div className="flex gap-5">
                        <p className="hover:underline cursor-pointer" >Olvido su contraseña?</p> {/* TODO: preguntar si me tengo que preocupar por esto. */}
                        <p className="hover:underline"><Link href="/">Registrarse</Link></p> {/* TODO: crear pagina para registrarse. */}
                    </div>
                </form>
                    <p>
                        <Link href="/" className="hover:font-extrabold">Click aqui</Link> para ir a la pagina principal {/* TODO: lo mas probable es que esto tenga que chutar */}
                    </p>
            </div>
        </>
    )
}