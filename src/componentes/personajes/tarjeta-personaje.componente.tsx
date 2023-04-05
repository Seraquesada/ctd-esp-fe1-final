import { useEffect } from 'react';
import { getAllCharacters, idSetter,  } from '../../redux/characterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { useLocation, useNavigate } from 'react-router-dom';


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
    const {loading,data,page,name,favorites} = useAppSelector(state => state.character)
    const path = useLocation()

    useEffect(() => {
        dispatch(getAllCharacters({name, page}))
    }, [name,page])
    
    const onClick = (id : number) : void => {
        dispatch(idSetter(id))
        return navigate("/detalle")
    };
    
    const pageFav : boolean = path.pathname ==="/favoritos"; 

    return (
        loading ? 
            <h2>Cargando</h2>
        :
        pageFav ? (<>
            {favorites.map(c=>
                <div className="tarjeta-personaje" key={c.id} >
                    <img src={c.image} alt={c.name} onClick={()=>onClick(c.id)}/>
                    <div className="tarjeta-personaje-body">
                        <span>{c.name}</span>
                        <BotonFavorito esFavorito={c.esFavorito} id={c.id} character={c}  />
                    </div>
                    </div>
                )}
        </>)
        :
        (<>
            {data?.results.map(c=>
                <div className="tarjeta-personaje" key={c.id} >
                    <img src={c.image} alt={c.name} onClick={()=>onClick(c.id)}/>
                    <div className="tarjeta-personaje-body">
                        <span>{c.name}</span>
                        <BotonFavorito esFavorito={c.esFavorito} id={c.id}  character={c}  />
                    </div>
                    </div>
                )}
        </>)

    );
}

export default TarjetaPersonaje;