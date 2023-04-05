import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { cleanValue, searchingValue } from '../../redux/characterSlice';

const BotonLimpiarFiltro = () => {
    
    const dispatch = useAppDispatch();
    const onClick = () : object => dispatch(searchingValue(""))

    return <button className="danger" onClick={onClick}>Limpiar Filtros</button>
}

export default BotonLimpiarFiltro