import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard'

export const HeroList = ( { publisher }) => {

    const heroes = useMemo( () => getHeroesByPublisher( publisher), [publisher])

    return (
                // grid de rows-col con un tamaño de 1fr // md para pantallas de 765px 3fr
        <div className="row row-cols-1 row-cols-md-3 g-4 animate__animated animate__fadeIn">

                {
                    heroes.map((hero) => (
                        <HeroCard 
                            key={ hero.id }
                            {...hero }
                        /> 
                    ))
                }
            
        </div>
    )
}

