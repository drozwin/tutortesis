"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useAddCart } from "@/hooks/useCart";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useProductDetail(id);
  //adcart
  const addCart = useAddCart();
  //----
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const handleAddCart = () => {
    if (!data?.id) return;

    addCart.mutate({
      product_id: data.id,
      quantity: quantity,
    });
  };
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        CARGANDO...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ERROR PRODUCTO
      </div>
    );

  const images = [data?.thumbnail, data?.thumbnail, data?.thumbnail];
  const price = data?.discount_price ?? data?.price ?? "Gratis";
  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* GALERIA */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-zinc-950 overflow-hidden"
          >
            <img
              src={images[activeImage]}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* thumbnails */}
          <div className="flex gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 object-cover cursor-pointer border ${
                  activeImage === i ? "border-red-500" : "border-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* INFO PRODUCTO */}
        <div className="flex flex-col">
          {/* categoria */}
          <span className="text-red-600 text-xs tracking-widest">
            // {data?.category.name}
          </span>

          {/* titulo */}
          <h1 className="text-4xl font-black mt-2 mb-4">{data?.title}</h1>
          {/* PRECIO */}
          <div className="mb-8">
            {data?.has_discount ? (
              <div className="flex flex-col gap-4">
                <span className="text-3xl text-green-600 font-bold">
                  Bs {data.discount_price}
                </span>
                <div className="flex items-center gap-4">
                  <span className="line-through text-lg text-zinc-400">
                    Bs {data.price}
                  </span>

                  <span className="bg-red-600/50 text-lg rounded-full border px-4 py-1">
                    -{data.discount_percentage}%
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-4xl text-white font-bold">
                ${data?.price}
              </span>
            )}
          </div>
          {/* descripcion */}

          <h2 className="text-xl mb-3">Descripción</h2>
          <div className="border-t py-6 h-96 overflow-auto border-zinc-800 pt-6">
            <p className="text-zinc-400 text-sm leading-relaxed">
              {data?.description}
            </p>
          </div>
          {/* cantidad */}

          <div className="flex hidden items-center gap-4 mb-8">
            <span className="text-xs text-zinc-500">CANTIDAD</span>

            <div className="flex border border-zinc-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4"
              >
                -
              </button>

              <span className="px-6 border-x border-zinc-800">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4"
              >
                +
              </button>
            </div>
          </div>

          {/* botones */}

          <div className="grid grid-cols-2 mt-8 gap-4 mb-10">
            <button
              onClick={handleAddCart}
              disabled={addCart.isPending}
              className="border border-red-600 py-3 text-red-500 hover:bg-red-600 hover:text-white transition"
            >
              {addCart.isPending ? "AGREGANDO..." : "AÑADIR AL CARRITO"}
            </button>

            <button className="bg-red-600 py-3 hover:bg-red-700">
              COMPRAR AHORA
            </button>
          </div>
        </div>
      </div>

      {/* COMENTARIOS */}

      <div className="max-w-7xl mx-auto mt-6">
        {/* rating */}
        <div className="flex items-center gap-4 text-lg text-zinc-400 mb-6">
          <div>
            <div className="flex justify-center items-center gap-4">
              <span className="text-2xl font-black">
                Reseña | {data?.rating ?? 4.5}{" "}
              </span>
              ⭐ <span className="text-sm">55 calificaciones</span>
            </div>
          </div>
        </div>
        <h2 className="text-2xl mb-8">Comentarios</h2>

        <div className="space-y-6">
          {/* comentario ejemplo */}

          <div className="border border-zinc-800 p-4">
            <div className="flex justify-between mb-2">
              <span className="text-red-500">Usuario</span>
              <span className="text-xs text-zinc-500">⭐ 5</span>
            </div>
            <p className="text-zinc-400 text-sm">
              Muy buen producto, recomendado.
            </p>
          </div>
          <div className="border border-zinc-800 p-4">
            <div className="flex justify-between mb-2">
              <span className="text-red-500">Usuario</span>
              <span className="text-xs text-zinc-500">⭐ 5</span>
            </div>
            <p className="text-zinc-400 text-sm">
              Muy buen producto, recomendado.
            </p>
          </div>
          <div className="border border-zinc-800 p-4">
            <div className="flex justify-between mb-2">
              <span className="text-red-500">Usuario</span>
              <span className="text-xs text-zinc-500">⭐ 5</span>
            </div>
            <p className="text-zinc-400 text-sm">
              Muy buen producto, recomendado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
