import Link from "next/link"
import Image from "next/image"
import { LogIn } from "react-feather"
import imagen from '../../public/images/modelo.jpg'

//Url del json server
const mockURL = process.env.MOCK_URL

export default function Login( {id, userInfo, token, expires}: {id: number, userInfo: string, token: string, expires: string} ) {

    function showDB() {
        alert('id: '+id+'\nuserInfo: '+userInfo+'\ntoken: '+token+'\nexpires: '+expires);
    }

//Pagina de login para los usuarios.
    return (
        <>
            <div className="min-h-screen min-w-full grid grid-flow-col grid-cols-2 gap-4 bg-neutral-150 selection:bg-lila selection:text-white max-md:grid-cols-1">
                <div className="mx-auto my-auto flex flex-col justify-center items-center w-3/4 h-3/4">
                    <form action="/" className=" min-h-full min-w-full flex flex-col justify-center items-center p-6 gap-4 rounded-3xl">
                        <LogIn size={150} color="#4f46e5" onClick={showDB} className=" hover:cursor-pointer"></LogIn>
                        <h1 className="text-3xl font-black">
                            Inicie sesion
                        </h1>
                        <label className="min-w-full pt-2 pb-2">Introduzca su email:
                            <input type="email" className="block text-black min-w-full rounded-lg h-10 p-2 border-2" 
                            required placeholder="ejemplo@ejemplo.com"></input>
                        </label>
                        <label className="min-w-full pt-2 pb-2">Introduzca su contraseña: 
                            <input type="password" className="block text-black min-w-full rounded-lg h-10 p-2 border-2" required placeholder="**********"></input>
                        </label>
                        <div className="min-w-full flex justify-around"> 
                            <label className="flex items-center hover:cursor-pointer"> {/* Accent-color creo que no soportan todos los navegadores, investigar */}
                                <input type="checkbox" className="mr-1 p-0 accent-lila hover:"></input>Recordarme 
                            </label>
                            <p className="hover:underline text-[#4f46e5]"><Link href="/signup">Registrarse</Link></p> 
                        </div>
                        <button type="submit" className="bg-lila text-white rounded-2xl p-2 min-w-full">Iniciar</button>
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
    );
}

/*TODO:
1. Devolver el token cuando el usuario inicia sesion (verificar email y pass consultandole al json-server)
2. Investigar como usar el storage del navegador para guardar el token alli
3. Cuando el login es exitoso, llevar a la pagina inicial (falta verificar el email y pass para hacer esto)
 */

//Hace cada vez que se actualiza la pagina
export async function getServerSideProps({ }) {
    const res = await fetch(mockURL+'/1');
    const data = await res.json();
    const { id, userInfo, token, expires } = data
    return { props: { id, userInfo, token, expires } };
}