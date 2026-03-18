"use client";

import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export default function CheckoutPage() {
  const { data, isLoading } = useCart();

  const items = data?.cart || [];

  const [card, setCard] = useState({
    number: "",
    name: "",
    exp: "",
    cvv: "",
  });

  const subtotal = items.reduce(
    (acc: number, item: any) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  const total = subtotal;

  const handlePay = () => {
    alert("Pago procesado (demo)");
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando checkout...
      </div>
    );

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* PRODUCTOS */}
        <div className="border border-zinc-800 p-6">
          <h2 className="text-2xl mb-6">Detalle de compra</h2>

          <div className="space-y-4">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-zinc-800 pb-4"
              >
                <img
                  src={item.product.thumbnail}
                  className="w-16 h-16 object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm">{item.product.title}</p>
                  <p className="text-xs text-zinc-400">
                    Cantidad: {item.quantity}
                  </p>
                </div>

                <span>
                  Bs {Number(item.price) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-8 border-t border-zinc-800 pt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Bs {subtotal}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>Bs {total}</span>
            </div>
          </div>
        </div>

        {/* FORMULARIO PAGO */}
        <div className="border border-zinc-800 p-6">
          <h2 className="text-2xl mb-6">Pago con tarjeta</h2>

          <div className="space-y-4">

            <input
              placeholder="Número de tarjeta"
              className="w-full p-3 bg-black border border-zinc-800"
              value={card.number}
              onChange={(e) =>
                setCard({ ...card, number: e.target.value })
              }
            />

            <input
              placeholder="Nombre en tarjeta"
              className="w-full p-3 bg-black border border-zinc-800"
              value={card.name}
              onChange={(e) =>
                setCard({ ...card, name: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="MM/YY"
                className="p-3 bg-black border border-zinc-800"
                value={card.exp}
                onChange={(e) =>
                  setCard({ ...card, exp: e.target.value })
                }
              />

              <input
                placeholder="CVV"
                className="p-3 bg-black border border-zinc-800"
                value={card.cvv}
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />
            </div>

            <button
              onClick={handlePay}
              className="w-full bg-red-600 py-4 mt-6 hover:bg-red-700"
            >
              PAGAR Bs {total}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}