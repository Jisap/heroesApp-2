import { heroes } from "../data/hero"



export const getHeroesByPublisher = ( publisher ) => {              // Esta función nos devuelve los heroes cuya prop publisher
   
    const validPublishers = ['DC Comics', 'Marvel Comics']
    if ( !validPublishers.includes( publisher )) {
        throw new Error( `${publisher } is not a valid publisher`)
    }

    return heroes.filter( hero => hero.publisher === publisher )    // coincida con la que es proporcionada por argumentos.
}