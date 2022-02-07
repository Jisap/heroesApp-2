import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types"

export const LoginScreen = () => {

    const { dispatch } = useContext( AuthContext )      // Permite usar el context
    const navigate = useNavigate()                      // Permite navegar a otras pantallas

    const handleLogin = () => {
    
        const action = {                                // Definimos la action
            type: types.login,
            payload:{ name: 'Fernando' }
        }

        dispatch(action)                                // Dispatch de la action -> cambio del state    

        const lastPath = localStorage.getItem('lastPath') || '/marvel'; // Rescatamos la última página visitada

        navigate(lastPath,{      // Navegamos a la última página visitada
            replace:true         // Impide volver atras en el historial del explorador
        })
    }

    return (
        <div className="container mt-5">
           <h1>Login</h1>
           <hr />

           <button 
                className="btn btn-primary"
                onClick={ handleLogin }    
            >
                Login
            </button> 
        </div>
    )
}
