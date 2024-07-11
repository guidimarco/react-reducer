import './App.css';
import './styles.css';
import { useReducer } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import ticketReducer from './reducers/ticketReducer';
import {sortTicket} from "./utilities/sortingUtilities";

function App() {

  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: "High to Low"
  }

  const [state, dispatch] = useReducer(ticketReducer, initialState)

  const sortedTickets = sortTicket(state.tickets, state.sortPreference)

  return (
    <div className="App">
      <div className='container'>
        <h1>Bug Blaster</h1>

        <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />

        {state.tickets.length > 0 && (
          <div className='results'>
            <h2>All tickets</h2>

            <select value={state.sortPreference} onChange={ev => dispatch({type: "SET_SORTING", payload: ev.target.value})}>
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>

            <TicketList tickets={sortedTickets} dispatch={dispatch} />
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
