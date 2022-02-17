import { mount } from 'enzyme';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Hero } from '../../../components/hero/Hero';



const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({              // Mock del router
    ...jest.requireActual('react-router-dom'),      // Se necesita todo como estaba
    useNavigate: () => mockNavigate                 // pero el navigate se simula
}))

describe('Pruebas en el <HeroScreen />', () => {
    
    test('No debe de mostrar el HeroScreen si no hay un heroe en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<Hero />} /> 
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.find('h1').text().trim()).toBe('No Hero Page')
        
    });
    
    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<Hero />} /> 
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.find('.row').exists()).toBe(true)
        
    });

    test('debe de regresar a la pantalla anterior', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<Hero />} /> 
                </Routes>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')()
        expect( mockNavigate ).toHaveBeenCalledWith(-1)    

    });

    test('debe de mostrar el No Hero Page si no tenemos un héroe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spidergdfgdgwer']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<Hero />} /> 
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.text()).toBe('No Hero Page')
        
    });
    
})
