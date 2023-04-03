
import { useAppDispatch } from '../../redux/hooks';
import './boton-favorito.css';

/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */
interface Props {
    esFavorito : boolean,
}
const BotonFavorito = ({esFavorito}: Props) => {
    
    const dispatch = useAppDispatch()

    console.log();
    

    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"

    return  <div className="boton-favorito" onClick={()=>{}} >
                <img src={src} alt={"favorito"} />
            </div>
}

export default BotonFavorito;