import { mount } from 'enzyme';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/Navbar'
import { types } from '../../../types/types';

const mockNavigate = jest.fn()


jest.mock('react-router-dom', () => ({              // Mock del router
    ...jest.requireActual('react-router-dom'),      // Se necesita todo como estaba
    useNavigate: () => mockNavigate                 // pero el navigate se simula
}))


describe('Pruebas en el <Navbar />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user:{
            name: 'Pedro', 
            logged: true
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route  path="/" element={<Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )


    test('debe de mostrarse correctamente', () => {
       
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim()).toBe('Pedro')
    });
    
    test('debe de llamar el logout, llamar el navigate y el dispatch con los argumentos ', () => {
        
        wrapper.find('button').prop('onClick')()                // Simulamos un click en el boton de logout

        expect( contextValue.dispatch ).toHaveBeenCalledWith({  // Esperariamos que sobre el context se disparara una acción -> logged:false
             "type": types.logout,
        })

        expect( mockNavigate ).toHaveBeenCalledWith('/login', {replace: true})
    })
    
})
