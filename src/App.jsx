import { useState } from 'react'
import './App.css'
import ServiceSelector from './components/ServiceSelector'
import CalendarPicker from './components/CalendarPicker'
import TimeSelector from './components/TimeSelector'
import BookingForm from './components/BookingForm'

function App() {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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
 <CalendarPicker onDateSelect={setSelectedDate} />
 
 {selectedDate && (
 <TimeSelector
    selectedDate={selectedDate}
    onTimeSelect={ setSelectedTime}  
 /> 
 )}

 {selectedService && selectedDate && selectedTime && (
   <BookingForm
        selectedService={selectedService}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onFormSubmit={(bookingData) => {
          console.log('Datos de reserva:', bookingData);
          // Aquí podrías enviar los datos a un servidor o procesarlos como necesites
        }}
      />
 )}
      
</>
  )
}

export default App
