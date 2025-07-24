import { useState } from 'react'
import './App.css'
import ServiceSelector from './components/ServiceSelector'
import CalendarPicker from './components/CalendarPicker'

function App() {
  const [selectedService, setSelectedService] = useState(null)

  return (
   <>
 <div>
     {!selectedService ? (
       <ServiceSelector onSelect={setSelectedService} />
     ) :(
      <div>
        <h2>Has selecionado: {selectedService.name}</h2>
        <button onClick={() => setSelectedService(null)}>
          Volver
        </button>
      </div>
     )}
 </div>
 <CalendarPicker onDateSelect={(date) => console.log("Fecha elegida",date)} />
</>
  )
}

export default App
