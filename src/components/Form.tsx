import useNewSubForm from "../hooks/useNewSubForm";
import { Sub } from '../types';


// declaramos el tipo de la función que recibe el componente Form para agregar un nuevo sub
interface FormProps {
    // onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>
    // onNewSub es una función que recibe un sub y retorna void.
    onNewSub: ( newSub: Sub ) => void
}




export const Form = ({ onNewSub }: FormProps ) => {
    // useNewSubForm lo usaremos pq es un hook que nos devuelve un reducer
    // el reducer lo usaremos para manejar el estado del formulario
    const [inputValues, dispatch] = useNewSubForm()

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        // con onNewSub le pasamos el nuevo sub al componente padre, q lo agrega.
        onNewSub( inputValues )
        dispatch({ type: 'clear' })
          
    }

    // inicio
    // handleChange es una función que recibe un evento de tipo:
    //      React.ChangeEvent<HTMLInputElement> o, 
    //      React.ChangeEvent<HTMLTextAreaElement>
    const handleClear = () => {
        dispatch({ type: 'clear' })

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        dispatch({
            type: 'change_value',
            payload: {
                inputName: name,
                inputValue: value
            }
        })
    }
    // fin
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={ handleChange } value = {inputValues.nick} type="text" name="nick" placeholder="Nick" />
                <input onChange={ handleChange } value = {inputValues.subMonths} type="number" name="subMonths" placeholder="Meses" />
                <input onChange={ handleChange } value = {inputValues.avatar} type="text" name="avatar" placeholder="Avatar" />
                <textarea onChange={ handleChange } value = {inputValues.description} name="description" placeholder="Descripción" />
                <button type='button' onClick={ handleClear }>Limpiar</button>
                <button type="submit">Agregar</button>
            </form>
        </div>
    )



}