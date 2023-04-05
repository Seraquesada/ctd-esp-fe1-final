import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import BotonLimpiarFiltro from "../componentes/botones/boton-limpiar-filtros";
import { useAppSelector } from "../redux/hooks";

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

    return  <div className="container">
                <div className="actions">
                    <h3>Catálogo de Personajes</h3>
                    <BotonLimpiarFiltro/>
                </div>
                <Filtros />
                <Paginacion />
                <GrillaPersonajes />
                <Paginacion />
            </div>
}

export default PaginaInicio