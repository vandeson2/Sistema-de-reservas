import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useBookingStore } from "../../store/bookingStore";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

//Calendario interactivo. Agrupa reservas individuales por servicio/hora para mostrar "clases" en lugar de citas aisladas
export default function CalendarReservationList(){
    const { bookings, fetchAllBookings, deleteBookingById, loadingBookings } = useBookingStore();

    // Cargar las reservas al montar el componente
    useEffect(() => {
        fetchAllBookings();
    }, [fetchAllBookings]);

    // Agrupar las reservas por clases, hora, fecha atráves de uns clave única.
    const groupedBooking = (bookings) => {
      const grouped = {};
      bookings.forEach((b) => {
        const key= `${b.serviceId}-${b.date}-${b.time}`;
        if(!grouped[key]){
          grouped[key] ={
            service: b.serviceName || "Sin nombre",
            date: b.date,
            time: b.time,
            reservations: [],
          };
        }
        grouped[key].reservations.push({
            name: b.fullName || "",
        });   
     });
        return Object.values(grouped);
    };

    //Genera un color basado en el nombre del servicio
  const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

    //Mapear las resrvas al formato de FullClendar
    const groups = groupedBooking(bookings);

    const events = groups.flatMap((g) => [
      {
        id: `${g.serviceId}-${g.date}-${g.time}`,
        title: g.service,
        start: `${g.date}T${g.time}`,
        extendedProps:{ reservations: g.reservations,},
        color: stringToColor(g.service),
    },
    {
    start: g.date,
    display: "background",
    backgroundColor: stringToColor(g.service),
  }
  ]);


    const handleEventClick = async (info) => {
      const reservations = info.event.extendedProps?.reservations || [];
      if (reservations.length >0)  {
      alert(`${reservations.map((r) => r.name)}`)
      }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
        {loadingBookings && <p>Cargando reservas...</p>}

        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locale={"es"}
        slotMinTime={"07:00:00"}
        slotMaxTime={"21:00:00"}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}

        events={events}
        eventClick={handleEventClick}
        editable={false} // drag & drop 
        selectable={true}
        height="auto"
        eventContent={(arg) => {
          const reservations = arg.event.extendedProps?.reservations || [];
          if(!arg.event.title) return null;
          return (
            <div>
              <strong>{arg.event.title}</strong>
              <div>
                {reservations.map((a, index) => (
                  <div key={index}>{a.name}</div>
                ))}
              </div>
            </div>  
          )
      }}
  
      eventDidMount={(info) => {
          const reservations = info.event.extendedProps?.reservations || [];
          if (!reservations.length) return;
          const html = reservations.map((a) => `${a.name || ""}`)
            .join("<br>");
          tippy(info.el, {
            content: `<strong>Alumnos:</strong><br>${html}`,
            allowHTML: true,
          });
        }}
      />

    </div>
  )

}


