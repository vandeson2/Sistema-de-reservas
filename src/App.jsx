import { useState } from 'react'
import './App.css'
import ServiceSelector from './components/ServiceSelector'

function App() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    
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
  )
}

export default App
