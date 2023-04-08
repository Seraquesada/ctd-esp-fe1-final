import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import BotonLimpiarFiltro from "../componentes/botones/boton-limpiar-filtros";
import { useAppSelector } from "../redux/hooks";
import { useRef } from "react";

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {
    const {data} = useAppSelector(state => state.character);
    const inputRef = useRef<HTMLInputElement>(null);

    return  <div className="container">
                <div className="actions">
                    <h3>Catálogo de Personajes</h3>
                    <BotonLimpiarFiltro inputRef={inputRef}/>
                </div>
                <Filtros inputRef={inputRef} />
                <Paginacion />
                <GrillaPersonajes />
                <Paginacion />
            </div>
}

export default PaginaInicio