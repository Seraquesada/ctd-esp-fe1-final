import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById, idSetter } from "../redux/characterSlice";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 * 
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 * 
 * 
 * 
 * Uso: 
 * ``` <PaginaDetalle /> ```
 * 
 * @returns la pagina de detalle
 */
const PaginaDetalle = () => {
    
    const dispatch = useAppDispatch();
    const {character,id} = useAppSelector(state => state.character)

    useEffect(() => {
        dispatch(getCharacterById(id))
    },[id])
    //<BotonFavorito esFavorito={esFav} onClick={onClick} />

    return <div className="container">
        <h3>{character?.name}</h3>
        <div className={"detalle"}>
            <div className={"detalle-header"}>
                <img src={character?.image} alt={character?.name}/>
                <div className={"detalle-header-texto"}>
                    <p>{character?.name}</p>
                    <p>{character?.origin.name}</p>
                    <p>{character?.gender}</p>
                    </div>
                        boton fav
                </div>
            </div>
                <h4>Lista de episodios donde apareció el personaje</h4>
            <div className={"episodios-grilla"}>
                <TarjetaEpisodio episodes={character?.episode}  />
            </div>
    </div>
}

export default PaginaDetalle