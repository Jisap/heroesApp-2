import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Pruebas en el <AppRouter', () => {
    
    
    test('debe de mostar el login si no esta autenticado', () => {
        
        const contextValue = {
            user:{
                logged:false
            }
        }

        const wrapper = mount(
         
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
          
        )

        expect( wrapper ).toMatchSnapshot()
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login' ) 
    });
    
    test('debe de mostar el componente de Marvel si está autenticado', () => {
        
        const contextValue = {
            user:{
                logged:true, 
                name: 'Pepe'
            }
        }
        
        const wrapper = mount(
         
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
          
        )

        // console.log(wrapper.html())
        expect( wrapper ).toMatchSnapshot()
        expect( wrapper.find('.navbar').exists() ).toBe( true ) 
    });
})
