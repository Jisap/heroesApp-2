import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../components/search/SearchScreen"
// MemoryRouter nos permitirá mantener el mismo diseño que usamos con Routes

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // El mock usa el react-router-dom
    useNavigate: () => mockNavigate            // pero sobrescribe el useNavigate para hace un mock de el.      
}))


describe('Pruebas en <SearchScreen />', () => {
    
    test('debe de mostrarse correctamente con valores por defecto', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        )
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe')
    });

    test('debe de mostrar a Batman y el input con el valor del queryString ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        )

        expect( wrapper.find('input').prop('value')).toBe('batman')
    })
    
    test('debe de mostrar un error si no se encuentra el hero ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=kdfjslkf']}>
                <SearchScreen />
            </MemoryRouter>
        )

        expect( wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados para: kdfjslkf')
    })

    test('debe de llamar el navigate a la nueva pantalla ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        )

        wrapper.find('input').simulate('change', {  // Simulamos que escribimos en el input batman
            target:{
                name: 'searchText',
                value: 'batman'
            }
        })

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman')
    })
    
})
