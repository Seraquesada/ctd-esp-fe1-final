import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import {  searchingValue } from '../../redux/characterSlice';

interface Props{
    inputRef: React.RefObject<HTMLInputElement>
}
const BotonLimpiarFiltro = ({inputRef}:Props) => {
    
    const dispatch = useAppDispatch();
    const onClick = () : void => {
        dispatch(searchingValue(""))
        if (inputRef && inputRef.current) {
            inputRef.current.value = '';
        }
        
    }

    return <button className="danger" onClick={onClick}>Limpiar Filtros</button>
}

export default BotonLimpiarFiltro