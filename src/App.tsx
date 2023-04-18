import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Form } from './components/Form'
import List from './components/List'
import { Sub, SubsResponseFromAPI } from './types';

// tipo de dato que representa el estado de la aplicación, 
// la lista de subs presentes y cuantos hay existentes
interface AppState {
  subs: Array<Sub>,
  newSubsNumber: number
}


function App() {
  const [subs, setSubs] = useState<AppState['subs']>([])
  /**
   * Cuando definimos el tipo de dato en un useState,
   * indicamos mediante los operadores < >
   * adentro colocamos el tipo, que es una interface o un type.
   * si esta interface tiene mas tipos o campos adentro y queremos que usarlo,
   * ademas del tipo ponemos el subtype que queremos usar ente corchetes.
   */
  const [newSubsNumber, setnewSubsNumber] = useState<AppState['newSubsNumber']>(0)
  // indica que la referencia es solo a un elemento del tipo DIV.
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // nte - fetchSubs es una función que retorna una promesa que resuelve con un array de subs
    const fetchSubs = (): Promise<SubsResponseFromAPI> => {
      // return fetch('http://localhost:3000/subs')
      //   .then(res => res.json())
      // con Axios
      return axios
        .get('http://localhost:3000/subs')
        .then(res => res.data)  
         
    }
    // recibe un Ø que es un arreglo de subscriptores con formato de la API.
    // retorna un arreglo de subscriptores con formato Sub.
    const mapFromApiToSubs = (apiResponse: SubsResponseFromAPI): Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const { months: subMonths, profileUrl: avatar, nick, description } = subFromApi
        return {
          subMonths,
          avatar,
          nick,
          description
        }
      })
    }
    fetchSubs()
      .then(apiSubs => {
          const subs = mapFromApiToSubs(apiSubs)
          setSubs(subs)
        })
  }, [])

  // nte - handleNewSub es una función que recibe un sub y hace la carga en los subs.
  const handleNewSub = (newSub: Sub) => {
    setSubs(subs => ([...subs, newSub]))
    setnewSubsNumber(newSubsNumber + 1)
  }

  return (
    <div className="App" ref= { divRef }>
      <h1>Subscribers</h1>
      <List subs={subs} />
      Nuevos suscriptores: {newSubsNumber}
      <Form onNewSub={ handleNewSub } />
    </div>
  )
}

export default App
