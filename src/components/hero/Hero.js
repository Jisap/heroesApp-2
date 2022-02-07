import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById'


export const Hero = () => {

    const { heroeId } = useParams()     // Obtenemos el id del heroe por los params
    const hero = useMemo( () => getHeroById(heroeId), [heroeId])    // Con el id obtenemos el objeto hero del []heroes
                                                                    // Lo memorizamos para que solo sea llamado 
                                                                    // getHeroById cuando heroeId cambie
    const navigate = useNavigate()  

    const handleReturn = () => {
        navigate( -1 )
    }

    if (!hero) {
        return <Navigate to='/' />      // Cuando NO se trate un evento como un click usamos el componente Navigate
    }

    const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero
    
    const imagePath = `/assets/${ id }.jpg`
    
    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={ imagePath } alt={ superhero } className="img-thumbnail animate__animated animate__fadeInLeft"/>
            </div>
            <div className="col-8">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Alter ego: </b> { alter_ego }
                    </li>
                     <li className="list-group-item">
                        <b>Publisher: </b> { publisher }
                    </li>
                     <li className="list-group-item">
                        <b>First appearance: </b> { first_appearance }
                    </li>
                </ul>
                <h5 className="mt-3">Characters</h5>
                <p>{ characters }</p>

                <button
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Regresar
                </button>
            </div>
        </div>
    )
}
