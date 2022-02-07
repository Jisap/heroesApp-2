import { useEffect, useReducer } from "react"
import { AuthContext } from "./auth/authContext"
import { authReducer } from "./auth/authReducer"
import { AppRouter } from "./routers/AppRouter"


const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged:false }
}

export const HeroesApp = () => {    // Dispatch dispara acciones al reducer, el reducer modifica el state
                                    // basado en un estado inicial                    
          //state 
    const [ user, dispatch] = useReducer( authReducer ,{}, init )  // Un useReducer es como un useState pero se utiliza       
                                                                   // cuando el state es mas complejo y tiene múltiples valores 

    useEffect(() => {
        if( !user ) return                                  // Si el usuario no existe return, el useEffect no hace nada
        localStorage.setItem('user',JSON.stringify(user))   // Pero si el usuario si existe lo grabamos en localStorage
    }, [user])

    return (
        <AuthContext.Provider value = {{
            user,
            dispatch
        }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}
