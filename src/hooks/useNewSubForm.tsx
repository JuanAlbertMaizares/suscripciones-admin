import { useReducer } from "react"
import { Sub } from "../types"

const initial_state = {
    nick: '',
        subMonths: 0,
        avatar: '',
        description: ''
}

interface FormState {
    inputValues: Sub
}
// types
type FormReducerAction = {
    type: 'change_value',
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: 'clear'
}
// reducer
const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch (action.type) {
        case 'change_value':
            const {inputName, inputValue} = action.payload
            return {
                ...state,
                [inputName]: inputValue
            }
        case 'clear':
            return initial_state
         
    }
}

const useNewSubForm = () => {
    return useReducer(formReducer, initial_state)
}

export default useNewSubForm