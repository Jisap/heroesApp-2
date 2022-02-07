import { useNavigate, useLocation } from "react-router-dom"
import queryString from "query-string"
import { useForm } from "../../hooks/useForms"
import { getHeroesByName } from "../../selectors/getHeroesByName"
import { HeroCard } from "../hero/HeroCard"
import { useMemo } from "react"


export const SearchScreen = () => {
    
    const navigate = useNavigate()
    const location = useLocation()  // hook que nos permite obtener un objeto con el pathname y los queryparams ( q=search )
    const { q = '' } = queryString.parse(location.search) // Separamos los queryParams  y nos quedamos solo con q que es el termino de la busqueda
   
    // Valores del form. - funcion que modifica esos valores
    const [ formValues, handleInputChange ] = useForm({searchText: q })
    const { searchText } = formValues   // Extraemos el valor del formulario que nos interesa, el searchText

    const handleSearch = (e) => {   // Cuando se haga click en el submit se llama a handleSearch y se construyen
        e.preventDefault()          // los query params en el pathname (http://localhost:3000/search?q=sdfdf)
        navigate(`?q=${searchText}`)
    }

    const heroesFiltered = useMemo(()=> getHeroesByName(q), [q])// construidos los query params y separado el termino de busqueda de ellos
                                                                // ejecutamos la busqueda  
    return (
        <>
           <h1>Búsquedas</h1>
           <hr />

           <div className="row">
               <div className="col-5">
                   <h4>Buscar</h4>
                   <hr />
                   <form onSubmit={ handleSearch }> 
                       <input
                            type="text"
                            placeholder="Buscar un héroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange } // Cuando cambie este input llamamos a handleInputChange
                                                           // y cambiara el estado de formvalue -> searchText 
                        />

                        <div className="d-grid gap-2">
                            <button 
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                                >
                                    Buscar...
                            </button>
                        </div>
                   </form>
               </div>

               <div className="col-7">
                   <h4>Resultados</h4>
                   <h4 />

                        {
                            (q === '')
                                ? <div className="alert alert-info">Buscar un héroe</div>
                                : (heroesFiltered.length === 0 ) && <div className="alert alert-danger">No hay resultados para: { q }</div>
                        }

                        {
                            heroesFiltered.map( hero => (
                                <HeroCard 
                                    key={ hero.id }
                                    { ...hero }
                                />
                            ) )
                        }

               </div>
           </div>
        </>
    )
}
