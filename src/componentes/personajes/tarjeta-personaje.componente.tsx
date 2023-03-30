import { useEffect, useState } from 'react';
import { useChangeFav } from '../../hooks/useChangeFav';
import { getCharacter } from '../../redux/characterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */
const TarjetaPersonaje = () => {

    const dispatch = useAppDispatch();
    const {loading,data,page} = useAppSelector(state => state.character)

    console.log(data?.results.map(a=>a));
    
    
    useEffect(() => {
        dispatch(getCharacter(page))
    }, [page])
    

    return (loading ? 
        <h2>Cargando</h2>
        :
        <div>
        {data?.results.map(c=>
            <div className="tarjeta-personaje">
                <img src={c.image} alt={c.name}/>
                <div className="tarjeta-personaje-body">
                    <span>{c.name}</span>
                    <BotonFavorito esFavorito={c.esFavorito} onClick={()=> c.esFavorito} />
                </div>
                </div>
                
            )}
        </div>

    )
}

export default TarjetaPersonaje;