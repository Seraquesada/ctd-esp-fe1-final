import { useAppSelector } from '../../redux/hooks';
import './tarjeta-episodio.css';

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

    const {loading} = useAppSelector(state => state.character)

    return (loading ?
        <h2>Cargando</h2>
        :
        <div>
            {
                episodes?.map((ep,i)=> 
                    <div className="tarjeta-episodio">
                        <h4>{ep[i]}</h4>
                        <div>
                            <span>S01E01</span>
                            <span>Lanzado el: April 7, 2014</span>
                        </div>
                    </div>)
            }
        </div>
        )
}

export default TarjetaEpisodio;