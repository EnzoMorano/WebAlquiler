import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/api";

function CanchaCard({ cancha }) {
  const [indice, setIndice] = useState(0);
  const imagenes =
    cancha.images && cancha.images.length > 0
      ? cancha.images
      : ["https://placehold.co/600x400/f0f0f0/94a3b8?text=🏟️+Sin+Imagen"];
  const total = imagenes.length;

  const anterior = () => setIndice((i) => (i === 0 ? total - 1 : i - 1));
  const siguiente = () => setIndice((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="relative">
        <img
          src={imagenes[indice]}
          alt={cancha.name}
          className="w-full h-48 object-cover"
        />
        {total > 1 && (
          <>
            <button
              onClick={anterior}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              onClick={siguiente}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ›
            </button>
          </>
        )}
        {total > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imagenes.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === indice ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-1">{cancha.name}</h2>
          <p className="text-gray-600 text-sm mb-1">{cancha.type}</p>
          <p className="text-green-700 font-semibold">
            ${cancha.price.toFixed(2)}
          </p>
        </div>
        <div className="p-4">
          <Link to={`/reservar/${cancha.id}`} className="bg-green-600 text-white font-bold rounded-xl p-2 hover:bg-green-700 cursor-pointer inline-block">
            RESERVAR
          </Link>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [canchas, setCanchas] = useState([]);
  useEffect(() => {
    get("canchas").then((data) => setCanchas(data));
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Canchas</h1>
      {canchas.map((cancha) => (
        <CanchaCard key={cancha.id} cancha={cancha} />
      ))}
    </div>
  );
}

export default Home;
