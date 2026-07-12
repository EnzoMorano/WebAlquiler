import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Reserva() {
  const { id } = useParams();
  const [cancha, setCancha] = useState(null);
  const [fecha, setFecha] = useState("");
  const [disponibles, setDisponibles] = useState([]);

  useEffect(() => {
    get(`canchas/${id}`).then((data) => setCancha(data));
  }, [id]);

  useEffect(() => {
    if (fecha) {
      get(`reservas/disponibles?fecha=${fecha}&canchaId=${id}`).then((data) =>
        setDisponibles(data),
      );
    }
  }, [fecha, id]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {cancha && (
        <>
          <h1 className="text-3xl font-bold mb-2">{cancha.name}</h1>
          <p className="text-gray-600 mb-4">
            {cancha.type} - ${cancha.price.toFixed(2)}
          </p>
        </>
      )}
      <label className="block mb-2 font-semibold">Seleccioná una fecha:</label>
      <Calendar
        onChange={(date) => {
          const año = date.getFullYear();
          const mes = String(date.getMonth() + 1).padStart(2, "0");
          const dia = String(date.getDate()).padStart(2, "0");
          setFecha(`${año}-${mes}-${dia}`);
        }}
        value={fecha ? new Date(fecha + "T12:00:00") : new Date()}
        tileDisabled={({ date }) => date < new Date(new Date().toDateString())}
      />
      {disponibles.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Horarios disponibles</h2>
          <div className="flex flex-wrap gap-2">
            {disponibles.map((slot, i) => (
              <button
                key={i}
                className="bg-green-100 border border-green-400 text-green-800 rounded px-4 py-2 hover:bg-green-200"
              >
                {slot.timeSlot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reserva;
