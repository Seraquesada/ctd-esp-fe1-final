import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './tarjeta-episodio.css';
import {  getEpisodesByCharacter } from '../../redux/characterSlice';

/**
 * Tarjeta para cada episodio dentro de la vista de personaje.
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los episodios
 * 
 * 
 * @returns un JSX element 
 */

interface Props {
    episodes?: string[]
}

const TarjetaEpisodio = ({episodes}: Props) => {


    const dispatch = useAppDispatch();
    const {loading,episodesByCharacter,character} = useAppSelector(state => state.character);
    const idArray : (string[] | number) = episodes?.map((e) => e.split("/").splice(5).join())! ;

    useEffect(()=>{
        if(idArray){
            dispatch(getEpisodesByCharacter(idArray))
        }
    },[character])

    return (loading ?
        <h2>Cargando</h2>
        :
        <>
            {Array.isArray(episodesByCharacter) ?
                episodesByCharacter
                ?.map(ep=>
                        <div className="tarjeta-episodio"  key={ep.id}>
                            <h4 className="tarjeta-episodio">{ep.name}</h4>
                            <span className="tarjeta-episodio">{ep.episode}</span>
                        </div>
            ) :
                <div className="tarjeta-episodio" key={episodesByCharacter.id}>
                    <h4 className="tarjeta-episodio">{episodesByCharacter.name}</h4>
                    <span className="tarjeta-episodio">{episodesByCharacter.episode}</span>
                </div>
        }
        </>
        )
}

export default TarjetaEpisodio;