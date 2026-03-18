"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart, useDeleteCartItem } from "@/hooks/useCart";

export default function CartMenu() {
  const [open, setOpen] = useState(false);

  const { data } = useCart();
  const deleteItem = useDeleteCartItem();

  const items = data?.cart || [];

  const total = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="relative">

      {/* ICONO */}
      <button
        onClick={() => setOpen(!open)}
        className="relative cursor-pointer hover:bg-green-600 p-1"
      >
        <ShoppingCart size={22} />

        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-[10px] px-1.5 rounded-full">
            {items.length}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-4 w-80 bg-zinc-950 border border-zinc-800 shadow-xl p-4">

          <h3 className="text-xs text-zinc-400 mb-3">
            TU CARRITO
          </h3>

          {items.length === 0 && (
            <p className="text-zinc-500 text-xs">
              No hay productos
            </p>
          )}

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b border-zinc-800 pb-2"
              >
                <img
                  src={item.product.thumbnail}
                  className="w-12 h-12 object-cover"
                />

                <div className="flex-1">
                  <p className="text-xs text-white">
                    {item.product.title}
                  </p>

                  <p className="text-[10px] text-zinc-400">
                    ${item.price} x {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => deleteItem.mutate(item.id)}
                  className="text-red-500 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <>
              <div className="flex justify-between text-sm mt-4">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <button className="mt-4 w-full bg-red-600 text-white py-2 text-xs">
                PAGAR
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}