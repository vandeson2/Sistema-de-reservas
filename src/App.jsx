import { useState } from 'react'
import './App.css'
import ServiceSelector from './components/ServiceSelector'
import CalendarPicker from './components/CalendarPicker'
import TimeSelector from './components/TimeSelector'
import BookingForm from './components/BookingForm'
import ConfirmationModal from './components/ConfirmationModal'

function App() {
  const [service, setService] = useState(null)
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  return (
   <div>
      <div>
        <h1>Reserva tu sesión en Estudio Vatalis</h1>

        <ServiceSelector onSelect={setService} selectedService={service} />

        {service && (
          <CalendarPicker onDateSelect={setDate} />
        )}

        {date && (
          <TimeSelector selectedDate={date} onTimeSelect={setTime} />
        )}

        {time  && (
          <BookingForm onSubmit={(data) => {
            setFormData({
              ...data,
              service,
              date,
              time
            });
            setShowModal(true);
          }} />
        )}
      </div>

      {formData && showModal && (
        <ConfirmationModal
          bookingData={formData}
          onConfirm={(data) => {
            console.log('Reserva confirmada:', data);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />  
      )}
   </div>
  )
};

export default App
