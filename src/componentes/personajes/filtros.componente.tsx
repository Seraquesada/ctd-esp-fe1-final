import { useEffect, useState } from 'react';
import './filtros.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCharacterByName, searchingValue } from '../../redux/characterSlice';

const Filtros = () => {
    
    const [name, setName] = useState<string>("")

    const dispatch = useAppDispatch()
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)  =>setName(e.target.value) ;
    const {page} = useAppSelector(state => state.character)

    useEffect(()=>{
        dispatch(getCharacterByName({ name, page }))
        dispatch(searchingValue(name))
    },[name,page])


    return  <div className="filtros">
                <label htmlFor="nombre">Filtrar por nombre:</label>
                <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" onChange={onChange}/>
            </div>
}

export default Filtros;