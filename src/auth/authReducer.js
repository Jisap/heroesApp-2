import { types } from "../types/types"
// const state = {
//     name: 'Fernando',
//     logged: true
// }

export const authReducer = (state = {}, action) => { // El reducer recibe el estado y la action

    switch ( action.type ) {    // Según sea el tipo de acción cambiaremos el estado

        case types.login:               // Si la acción es el login
            return{
                ...action.payload,      // Recibimos la información útil de la action
                logged: true            // y cambiamos la prop logged del state a true
            }     
            
        case types.logout:              // Si la acción es el logout
            return {
                logged: false           // Solo cambiaremos la prop logged del state a false
            }    

        default:
           return state;
    }
}