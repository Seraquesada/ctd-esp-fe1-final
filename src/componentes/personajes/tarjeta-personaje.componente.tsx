import { useEffect } from 'react';
import { getCharacterByName, idSetter,  } from '../../redux/characterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { useNavigate, redirect } from 'react-router-dom';
import { useGetEpisodesByCharacter } from '../../hooks/useApi';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */
const TarjetaPersonaje = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {loading,data,page,name} = useAppSelector(state => state.character)

    useEffect(() => {
        dispatch(getCharacterByName({name, page}))
    }, [page])
    
    const onClick = (id : number) => {
        dispatch(idSetter(id))
        return navigate("/detalle")
    };

    return (loading ? 
        <h2>Cargando</h2>
        :
        <>
            {data?.results.map(c=>
                <div className="tarjeta-personaje" >
                    <img src={c.image} alt={c.name} onClick={()=>onClick(c.id)}/>
                    <div className="tarjeta-personaje-body">
                        <span>{c.name}</span>
                        <BotonFavorito esFavorito={c.esFavorito}   />
                    </div>
                    </div>
                )}
        </>

    )
}

export default TarjetaPersonaje;