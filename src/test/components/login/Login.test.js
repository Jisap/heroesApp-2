import { mount } from 'enzyme';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({              // Mock del router
    ...jest.requireActual('react-router-dom'),      // Se necesita todo como estaba
    useNavigate: () => mockNavigate                 // pero el navigate se simula
}))


describe('Pruebas en <LoginComponent />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user:{ 
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route  path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )
    
    test('debe de hacer match con el snapshot', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de realizar el dispatch y la navegación', () => {
        
        const handleClick = wrapper.find('button').prop('onClick')  // Localizamos el boton de login
        handleClick();                                              // Hacemos click en la función asociada al boton        
        expect ( contextValue.dispatch ).toHaveBeenCalledWith({    // Esperariamos que sobre el context se disparara una acción -> payload y type
            "payload": {"name": "Fernando"},
            "type": "[auth] Login",
        })

        expect( mockNavigate ).toHaveBeenCalledWith( //Esperariamos que el navigate se hubiera llamado con la última pág visitada
            "/marvel", {"replace": true})            //La última pag visitada es la del localStorage y sino existe /marvel
    
        localStorage.setItem('lastPath', '/dc')      // Establecemos como última pág visitada /dc
        handleClick()
        expect( mockNavigate ).toHaveBeenCalledWith('/dc', {'replace': true})   // Esperariamos que el navigate se hubiera llamado con /dc

    });
    
    
})
