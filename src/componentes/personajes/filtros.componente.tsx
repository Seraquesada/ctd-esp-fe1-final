import { useEffect, useRef, useState } from 'react';
import './filtros.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllCharacters, searchingValue } from '../../redux/characterSlice';

const Filtros = () => {

    const [name, setName] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) : void => setName(e.target.value) ;
    const {page} = useAppSelector(state => state.character)

    useEffect(()=>{
        dispatch(getAllCharacters({ name, page }))
        dispatch(searchingValue(name))
    },[name,page])


    return  <div className="filtros">
                <label htmlFor="nombre">Filtrar por nombre:</label>
                <input ref={inputRef}  type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" onChange={onChange}/>
            </div>
}

export default Filtros;