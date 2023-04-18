import { Sub } from '../types';
// definimos Props para que el parametro subs sea de tipo Array y no sea de tipo any.
// de esta forma definimos tipos en los parametros de una funcion
// NameFunction( { param }: TDU ) {}

interface Props {
    subs: Array< Sub >
}

export default function List({ subs }: Props) {
    return (
        <ul>
        {subs.map((sub) => (
          <li key={sub.nick}>
            <img src={sub.avatar} alt={sub.nick} />
            <h2>{sub.nick}</h2>
            <p>{sub.description?.substring(0,100)}</p>
            <p>Subscrito hace {sub.subMonths} meses</p>
          </li>

        ))}

      </ul>

    )
}