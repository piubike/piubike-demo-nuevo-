"use client";
import { useState } from "react";

export default function Home() {
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState<any>(null);
  const [type, setType] = useState("");
  const [variant, setVariant] = useState("");

  const [height, setHeight] = useState("");
  const [inseam, setInseam] = useState("");

  const [fiatPercent, setFiatPercent] = useState(50);
  const downloadNFT = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px Arial";
ctx.fillText("ALA • Resilience Certificate", canvas.width / 2, 60);

  ctx.font = "18px Arial";
  ctx.fillText(`Modelo: ${selected?.name}`, 50, 140);
  ctx.fillText(`Talla: ${getSize()}`, 50, 180);
  ctx.fillText(`Fecha: ${new Date().toLocaleDateString()}`, 50, 220);

  ctx.fillStyle = "#1A3A7A";
  ctx.fillText("Alvarez Bicycle", 50, 300);

  const link = document.createElement("a");
  link.download = "nft-certificado.png";
  link.href = canvas.toDataURL();
  link.click();
};

  const bikes = [
    {
      name: "Mountain Bike",
      desc: "Potencia y control en terrenos exigentes",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    },
    {
      name: "Gravel",
      desc: "Versatilidad total en ruta y off-road",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    },
    {
      name: "Resilience",
      desc: "Tecnología avanzada con chip integrado",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    },
  ];

  const experiences = [
    { name: "Dolomitas", desc: "Rutas épicas en Italia", image: "https://via.placeholder.com/300x180", price: 1200 },
    { name: "Santiago Compostela", desc: "Una travesía única", image: "https://via.placeholder.com/300x180", price: 900 },
    { name: "Atacama", desc: "Aventura en el desierto", image: "https://via.placeholder.com/300x180", price: 1000 },
  ];

  const getPrice = () => {
    if (variant === "Race") return 3000;
    if (variant === "Team") return 4000;
    return 5000;
  };

  const total = getPrice();
  const fiatAmount = (total * fiatPercent) / 100;
  const cryptoAmount = total - fiatAmount;

  // 🚴 BIKE FITTING REAL (aproximación estándar industria)
  const getSize = () => {
    const h = Number(height);
    const i = Number(inseam);

    const score = h * 0.4 + i * 0.6;

    if (score >= 165) return "L";
    if (score >= 155) return "M";
    return "S";
  };

  return (
    <main className="p-6 pb-24 text-white bg-black min-h-screen">

      {/* HOME */}
      {view === "home" && (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center">

          <h1 className="text-4xl font-bold mb-2">ALA</h1>
          <p className="text-zinc-500 mb-10">by Alvarez Bicycle</p>

          <div className="grid gap-4 w-full max-w-sm">

            <button onClick={() => setView("shop")} className="bg-zinc-900 py-5 rounded-2xl">
              🚴 Bicicletas
            </button>

            <button onClick={() => setView("experiences")} className="bg-zinc-900 py-5 rounded-2xl">
              🌍 Experiencias
            </button>

            <button onClick={() => setView("resApp")} className="bg-[#A44A3F] py-5 rounded-2xl">
              📱 Mi App Resilience
            </button>

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
              className="bg-zinc-900 p-4 rounded-2xl mb-4"
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

          {experiences.map((exp) => (
            <div
              key={exp.name}
              onClick={() => {
                setSelected(exp);
                setType("exp");
                setView("detail");
              }}
              className="bg-zinc-900 p-4 rounded-2xl mb-4"
            >
              <img src={exp.image} className="rounded mb-2" />
              <h3>{exp.name}</h3>
              <p>{exp.desc}</p>
              <p className="text-sm font-bold">€{exp.price}</p>
            </div>
          ))}
        </>
      )}

      {/* DETAIL */}
      {view === "detail" && (
        <div className="text-center">

          <img src={selected?.image} className="rounded mb-4" />

          <h2 className="text-2xl mb-2">{selected?.name}</h2>
          <p className="text-zinc-400 mb-4">{selected?.desc}</p>

          {/* RESILIENCE ENTRY */}
          {selected?.name === "Resilience" && (
            <button
              onClick={() => setView("resData")}
              className="bg-[#A44A3F] w-full py-3 rounded-2xl"
            >
              TU ALA BICYCLE
            </button>
          )}

          {/* EXPERIENCE */}
          {type === "exp" && (
            <button
              onClick={() => setView("register")}
              className="bg-[#A44A3F] w-full py-3 rounded-2xl"
            >
              Reservar
            </button>
          )}

          {/* BIKE VARIANTS */}
          {type === "bike" && selected?.name !== "Resilience" && (
            <div className="flex gap-2 justify-center mt-4">
              <button onClick={() => { setVariant("Race"); setView("variantDetail"); }}>Race</button>
              <button onClick={() => { setVariant("Team"); setView("variantDetail"); }}>Team</button>
            </div>
          )}
        </div>
      )}

      {/* RES DATA */}
      {view === "resData" && (
        <div className="text-center">

          <h2 className="text-xl mb-4">Bike Fitting Inteligente</h2>

          <input
            placeholder="Estatura (cm)"
            onChange={(e) => setHeight(e.target.value)}
            className="w-full mb-2 p-2 bg-zinc-900"
          />

          <input
            placeholder="Largo de pierna (cm)"
            onChange={(e) => setInseam(e.target.value)}
            className="w-full mb-4 p-2 bg-zinc-900"
          />

          <p className="mb-3">
            Talla sugerida:
            <span className="font-bold ml-2">{getSize()}</span>
          </p>

          <button
            onClick={() => setView("bikeCatalog")}
            className="bg-[#A44A3F] w-full py-3 rounded-2xl"
          >
            Ver bicicletas 
          </button>

        </div>
      )}

      {/* CATALOG */}
      {view === "bikeCatalog" && (
        <div>

          <h2 className="mb-4">Bicicletas para talla {getSize()}</h2>

          {[
  {
    name: "ALA MTB Pro",
    price: 3200,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
  },
  {
    name: "ALA Gravel X",
    price: 3800,
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8",
  },
  {
    name: "ALA Resilience AI",
    price: 5000,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
  },
].map((bike) => (
  <div key={bike.name} className="bg-zinc-900 p-4 rounded-2xl mb-3">

    <img
      src={bike.image}
      className="rounded-xl mb-3 h-40 w-full object-cover"
    />

    <h3 className="font-bold">{bike.name}</h3>

    <p className="text-sm text-zinc-400">
      Ajustada a talla {getSize()}
    </p>

    <p className="font-bold">€{bike.price}</p>

    <button
      onClick={() => setView("payment")}
      className="bg-white text-black w-full py-2 rounded-xl mt-2"
    >
      Comprar
    </button>

  </div>
))}
        </div>
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

      {/* FINAL NFT */}
      {view === "experience" && (
        <div className="text-center">
          <h2 className="text-3xl mb-4">🚴 Experiencia activada</h2>

          <div className="text-center">
  <h2 className="text-3xl mb-4">🚴 Compra realizada</h2>

  {type === "bike" && (
    <div className="bg-zinc-900 p-4 rounded-2xl mt-4">

      <div className="bg-black text-white p-4 rounded-xl mb-4 text-left">
        <p className="text-lg font-bold mb-2">🎟 Certificado NFT</p>

        <p><b>Modelo:</b> {selected?.name}</p>
        <p><b>Talla:</b> {getSize()}</p>
        <p><b>Fecha:</b> {new Date().toLocaleDateString()}</p>

        <div className="mt-3 text-center text-sm text-zinc-400">
          NFT generado (preview)
        </div>
      </div>

      <button
        onClick={downloadNFT}
        className="bg-white text-black w-full py-2 rounded-xl"
      >
        Descargar certificado NFT
      </button>

    </div>
  )}
</div>

  </div>
)}
{/* RESILIENCE APP */}
{view === "resApp" ? (
  <div className="text-center">

    <h2 className="text-2xl mb-4">🚴 Mi App Resilience</h2>

    <div className="bg-black text-white p-4 rounded-xl mb-4 text-left">
      <p className="text-lg font-bold mb-2">🎟 Tu NFT</p>

      <p><b>Modelo:</b> {selected?.name || "ALA Bike"}</p>
      <p><b>Talla:</b> {getSize()}</p>
      <p><b>Fecha:</b> {new Date().toLocaleDateString()}</p>
    </div>

    <div className="grid gap-3">

      <button className="bg-zinc-900 py-3 rounded-2xl">
        🔗 Conectar chip
      </button>

      <button className="bg-zinc-900 py-3 rounded-2xl">
        📍 Mi recorrido
      </button>

      <button
        onClick={() => setView("resStats")}
        className="bg-[#A44A3F] py-3 rounded-2xl"
      >
        📊 Resilience
      </button>

    </div>

  </div>
) : null}

{/* RESILIENCE STATS */}
{view === "resStats" && (
  <div className="text-center">

    <h2 className="text-2xl mb-4">📊 Datos Resilience</h2>

    <div className="bg-zinc-900 p-4 rounded-2xl text-left">
      <p>🚴 Velocidad: 32 km/h</p>
      <p>🔄 Cadencia: 85 rpm</p>
      <p>📏 Altura sillín: 74 cm</p>

      <div className="mt-3 text-sm text-zinc-400">
        👉 Recomendación:
        <br />
        Subir sillín +1 cm para mejor eficiencia
      </div>
    </div>

    <button
      onClick={() => setView("resApp")}
      className="bg-white text-black w-full py-3 rounded-2xl mt-4"
    >
      Volver
    </button>

  </div>
)}
    </main>
  );
}