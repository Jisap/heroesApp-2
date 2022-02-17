import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"


describe('Pruebas en authReducer', () => {
    
    test('debe de retornar el estado por defecto ', () => {
       
        const state = authReducer( {logged:false}, {}) // Al no enviarle ninguna acción al authReducer, este 
        expect( state ).toEqual({logged:false})        // devolverá el  default state osea el que le dio por args
    })
  
    test('debe de autenticar y colocar el "name" del usuario', () => {
        
        const action = {                                // Definimos la action con su tipo 
            type: types.login,                          // y la carga útil. Action + payload = state
            payload:{ name: 'Fernando' }
        }

        const state = authReducer({ logged:false }, action )
        expect( state ).toEqual({ logged:true, name: 'Fernando' })
    });

    test('debe de borrar el name del usuario y logged en false', () => {
        
        const action = {                                
            type: types.logout  
        }

        const state = authReducer({ logged:true, name: 'Fernando' }, action )
        expect( state ).toEqual({ logged: false })
    });
    
})
