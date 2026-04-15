"use client";
import { useState } from "react";

export default function Home() {
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState<any>(null);
  const [type, setType] = useState("");
  const [variant, setVariant] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fiatPercent, setFiatPercent] = useState(50);

  const bikes = [
  {
    name: "Mountain Bike",
    desc: "Potencia y control en terrenos exigentes",
    image: "https://images.unsplash.com/photo-1518655048521-f130df041f66",
  },
  {
    name: "Gravel",
    desc: "Versatilidad total en ruta y off-road",
    image: "https://images.unsplash.com/photo-1508973379184-7517410fb0c8",
  },
  {
    name: "Resilience",
    desc: "Tecnología avanzada con chip integrado",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
  },
];
  

  const experiences = [
    {
      name: "Dolomitas",
      desc: "Rutas épicas en Italia",
      image: "https://via.placeholder.com/300x180",
      price: 1200,
    },
    {
      name: "Santiago Compostela",
      desc: "Una travesía única",
      image: "https://via.placeholder.com/300x180",
      price: 900,
    },
    {
      name: "Atacama",
      desc: "Aventura en el desierto",
      image: "https://via.placeholder.com/300x180",
      price: 1000,
    },
  ];

  const getPrice = () => {
    if (variant === "Race") return 3000;
    if (variant === "Team") return 4000;
    return 5000;
  };

  const total = getPrice();
  const fiatAmount = (total * fiatPercent) / 100;
  const cryptoAmount = total - fiatAmount;

  const getResilienceSize = () => {
    if (Number(height) > 180) return "L";
    if (Number(height) > 170) return "M";
    return "S";
  };

  return (
    <main className="p-6 pb-24 text-white bg-black min-h-screen">
      <div className="mb-6">
  <h1 className="text-lg font-bold">
    Alvarez Bicycle
  </h1>
  <p className="text-xs text-zinc-500">
    by Piubike
  </p>
</div>
{/* HOME */}
{/* HOME PREMIUM */}
{view === "home" && (
  <div className="relative h-[70vh] flex flex-col justify-end">

    <img
      src="https://images.unsplash.com/photo-1518655048521-f130df041f66"
      className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
    />

    <div className="relative z-10">
      <h1 className="text-3xl font-bold mb-2">
        Alvarez Bicycle
      </h1>

      <p className="text-zinc-300 mb-6">
        by Piubike — Ride Beyond Limits
      </p>

      <div className="flex flex-col gap-3">

  <button
    onClick={() => setView("shop")}
    className="bg-white text-black px-6 py-3 rounded-2xl w-full"
  >
    Explorar bicicletas
  </button>

  <button
    onClick={() => setView("experiences")}
    className="border border-white px-6 py-3 rounded-2xl w-full"
  >
    Ver experiencias
  </button>

</div>
    </div>
  </div>
)}
      {/* SHOP */}
      {view === "shop" && (
        <>
          <h2 className="text-xl mb-4">Bicicletas</h2>

          {bikes.map((bike) => (
            <div
              key={bike.name}
              onClick={() => {
                setSelected(bike);
                setType("bike");
                setView("detail");
              }}
              className="bg-zinc-900 p-4 rounded-2xl mb-4 cursor-pointer"
            >
              <img src={bike.image} className="rounded mb-2" />
              <h3>{bike.name}</h3>
              <p className="text-sm text-zinc-400">{bike.desc}</p>
            </div>
          ))}
        </>
      )}

      {/* EXPERIENCES */}
      {view === "experiences" && (
        <>
          <h2 className="text-xl mb-4">Experiencias</h2>
          <p className="text-zinc-400 mb-4">
  Vive una experiencia única desde la montaña al mar con Piubike y Alvarez Bicycle
</p>

          {experiences.map((exp) => (
            <div
              key={exp.name}
              onClick={() => {
                setSelected(exp);
                setType("exp");
                setView("detail");
              }}
              className="bg-zinc-900 p-4 rounded-2xl mb-4 cursor-pointer"
            >
              <img src={exp.image} className="rounded-2xl mb-2 h-40 w-full object-cover" />
              <h3>{exp.name}</h3>
              <p className="text-sm text-zinc-400">{exp.desc}</p>
              <p className="text-xs text-zinc-500 mt-2">
  🚴‍♂️ 10-15 días | Italia | Todo incluido
</p>
            </div>
          ))}
        </>
      )}

      {/* DETAIL */}
      {view === "detail" && (
        <div className="text-center">
          <img src={selected?.image} className="rounded-2xl mb-4" />

          <h2 className="text-3xl font-bold mb-2">
            {selected?.name}
          </h2>

          <p className="text-zinc-400 mb-4">
            {selected?.desc}
          </p>

          {type === "exp" && (
            <div className="bg-zinc-900 p-5 rounded-2xl mb-4 text-left">
              <p className="mb-3 font-semibold">Incluye:</p>
              <p>✔ Tricota</p>
              <p>✔ Alojamiento</p>
              <p>✔ Cenas</p>
              <p>✔ Van apoyo</p>

              <p className="text-xl font-bold mt-4">
                €{selected?.price}
              </p>

              <button
                onClick={() => setView("register")}
                className="bg-white text-black w-full py-3 rounded-2xl mt-4"
              >
                Reservar
              </button>
            </div>
          )}

          {selected?.name === "Resilience" && (
            <button
              onClick={() => setView("resData")}
              className="bg-white text-black w-full py-3 rounded-2xl"
            >
              Personalizar bicicleta
            </button>
          )}

          {type === "bike" && selected?.name !== "Resilience" && (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => { setVariant("Race"); setView("variantDetail"); }}
                className="bg-zinc-800 px-4 py-2 rounded-2xl"
              >
                Race (€3000)
              </button>

              <button
                onClick={() => { setVariant("Team"); setView("variantDetail"); }}
                className="bg-zinc-800 px-4 py-2 rounded-2xl"
              >
                Team (€4000)
              </button>
            </div>
          )}
        </div>
      )}

      {/* VARIANT */}
      {view === "variantDetail" && (
  <div className="text-center">

    <img src={selected?.image} className="rounded-2xl mb-4" />

    <h2 className="text-2xl mb-4">
      {selected?.name} {variant}
    </h2>
          <h2 className="text-2xl mb-4">
            {selected?.name} {variant}
          </h2>

          <p className="text-xl mb-4">
            €{getPrice()}
          </p>

          <button
            onClick={() => setView("register")}
            className="bg-white text-black w-full py-3 rounded-2xl"
          >
            Continuar
          </button>
        </div>
      )}

      {/* RESILIENCE */}
      {view === "resData" && (
        <>
          <h2 className="mb-4">Configura tu Resilience</h2>

          <input placeholder="Altura" onChange={(e) => setHeight(e.target.value)} className="w-full mb-2 p-2 bg-zinc-900" />
          <input placeholder="Peso" onChange={(e) => setWeight(e.target.value)} className="w-full mb-4 p-2 bg-zinc-900" />

          <button onClick={() => setView("resResult")} className="bg-white text-black w-full py-3 rounded-2xl">
            Analizar
          </button>
        </>
      )}

      {view === "resResult" && (
        <div className="text-center">
          <p>Talla: {getResilienceSize()}</p>
          <p className="mb-4">€5000</p>

          <button onClick={() => setView("register")} className="bg-white text-black w-full py-3 rounded-2xl">
            Comprar
          </button>
        </div>
      )}

      {/* REGISTER */}
      {view === "register" && (
        <>
          <input placeholder="Nombre" className="w-full mb-2 p-2 bg-zinc-900" />
          <input placeholder="Dirección" className="w-full mb-2 p-2 bg-zinc-900" />
          <input placeholder="Wallet" className="w-full mb-4 p-2 bg-zinc-900" />

          <button onClick={() => setView("payment")} className="bg-white text-black w-full py-3 rounded-2xl">
            Ir a pago
          </button>
        </>
      )}

      {/* PAYMENT */}
      {view === "payment" && (
        <>
          <p>Total €{total}</p>

          <p>💳 Tarjeta (Stripe)</p>

          <p>💰 Cripto ALA</p>
          <button className="bg-purple-500 w-full py-2 rounded">
            Conectar Wallet
          </button>

          <p>Pago híbrido</p>
          <p>Fiat: €{fiatAmount}</p>
          <p>Cripto: €{cryptoAmount}</p>

          <input
            type="range"
            min="0"
            max="100"
            value={fiatPercent}
            onChange={(e) => setFiatPercent(Number(e.target.value))}
            className="w-full"
          />

          <button
            onClick={() => setView("experience")}
            className="bg-white text-black w-full py-3 rounded-2xl"
          >
            Confirmar compra
          </button>
        </>
      )}

      {/* FINAL */}
      {view === "experience" && (
        <div className="text-center mt-10">
          <h2 className="text-3xl mb-4">🚴 Experiencia activada</h2>

          <p>{selected?.name}</p>

          {type === "bike" && (
            <div className="bg-purple-600 p-4 rounded-2xl mt-4">
              🎟 NFT generado
            </div>
          )}

          {type === "exp" && (
            <div className="bg-zinc-900 p-4 rounded-2xl mt-4">
              ✔ Reserva confirmada
            </div>
          )}
        </div>
      )}

      {/* MENU */}
<div className="fixed bottom-0 left-0 w-full bg-black flex justify-around py-3 border-t border-zinc-800 text-xs text-center">
  
  <button onClick={() => setView("shop")}>
    🚴<br />BICICLETAS
  </button>

  <button onClick={() => setView("experiences")}>
    🌍<br />EXPERIENCIAS
  </button>

  <button onClick={() => setView("register")}>
    👤<br />PERFIL
  </button>

</div>

    </main>
  );
}