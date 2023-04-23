import Link from "next/link"
//Pagina de login para los usuarios.
export default function login() {
    return (
        <>
            <h1 className="italic hover:cursor-wait">
                Login
            </h1>
            <p><Link href="/" className="hover:font-extrabold">Click here</Link> to go back</p>
        </>
    )
}