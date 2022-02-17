import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";


describe('Pruebas en <DashboardRoutes />', () => {

    const contexValue = {
        user:{
            logged: true, 
            name: 'Juanito'
        }
    }

    test('debe demostrarse correctamente Marvel ', () => {
        
        // MemoryRouter nos permitirá mantener el mismo diseño que usamos con Routes

        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <MemoryRouter initialEntries={['/']}>                              
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )    
       
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Juanito')
        expect(wrapper.find('h1').text().trim()).toBe('Marvel Screen')
    });
    
    test('debe demostrarse correctamente de DC ', () => {
        
        // MemoryRouter nos permitirá mantener el mismo diseño que usamos con Routes

        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <MemoryRouter initialEntries={['/dc']}>                              
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )    
       
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('Dc Screen')
    });
})
