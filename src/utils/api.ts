import { API_LOGIN_USERS } from "./constants"
import { API_USERS } from "./constants"
/**
 * Realiza una peticion a la API_LOGIN_USER con el metodo post, enviando email y password
 * @param data el objeto data, el cual sera enviado en el cuerpo de la peticion
 * @returns true --> hubo exito en la peticion al servidor y se guardo el token y email en el storage del browser.
 *         false --> la peticion no tuvo exito y se le informa al usuario.
 */
export async function loginUser(data: {email: string, password: string}) {
    try {
        let response = await fetch(API_LOGIN_USERS, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
          })
        let responseJson = await response.json()
        //Validaciones para notificar al usuario
        if (response.ok) {
            alert("Inicio de sesion exitoso")
            //para recuperar el access token y guardarlo en el storage del browser
            let token = responseJson.accessToken
            localStorage.setItem("accessToken", token) //guardo el access token en el storage del browser
            localStorage.setItem("email", data.email) //guardo el email en el storage del browser
            return true
        } else if (typeof responseJson === 'string') {
            alert("Ocurrio un problema al iniciar sesion, por favor, intente de nuevo...\n\n"+responseJson)
            return false
        } else {
            alert("Ocurrio un problema al iniciar sesion, por favor, intente de nuevo...")
            return false
        }
    } catch (error) {
        alert("Ocurrio un problema con el servidor, intente de nuevo en unos instantes...\n\n"+error)
        return false
    }
}

/**
 * Realiza una peticion a la API_USER con el metodo post, enviando email y password
 * @param data el objeto data, el cual sera enviado en el cuerpo de la peticion
 * @returns true --> hubo exito en la peticion al servidor y se guardo el token y email en el storage del browser.
 *         false --> la peticion no tuvo exito y se le informa al usuario.
 */
export async function createUser(data: {email: string, password: string}) {
    try {
        let response = await fetch(API_USERS, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
          })
        let responseJson = await response.json()
        //Validaciones para notificar al usuario
        if (response.ok) {
            alert("El usuario se registro con exito")
            //para recuperar el access token y guardarlo en el storage del browser
            let token = responseJson.accessToken
            localStorage.setItem("accessToken", token) //guardo el access token en el storage del browser
            localStorage.setItem("email", data.email) //guardo el email en el storage del browser
            return true
        } else if (typeof responseJson === 'string') {
            alert("Ocurrio un problema al registrar el usuario, por favor, intente de nuevo...\n\n"+responseJson)
            return false
        } else {
            alert("Ocurrio un problema al registrar el usuario, por favor, intente de nuevo...")
            return false
        }
    } catch (error) {
        alert("Ocurrio un problema con el servidor, intente de nuevo en unos instantes...\n\n"+error)
        return false
    }
}