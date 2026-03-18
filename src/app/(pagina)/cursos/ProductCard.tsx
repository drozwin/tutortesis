import React, { useEffect } from "react";
import {
  Eye,
  Heart,
  ShoppingCart,
  Search,
  Filter,
  Download,
  Star,
} from "lucide-react";
import Link from "next/link";
import { ProductResponse } from "@/types/productDetail";

export const ProductCard = ({ product }: { product: ProductResponse }) => {
  const price = product.discount_price ?? product.price ?? "Gratis";

  return (
    <div className="rounded-2xl shadow-lg shadow-black/40 overflow-hidden">
      {/* Imagen */}
      <Link href={`/cursos/${product.slug}`}>
        <div className="relative overflow-hidden group rounded-2xl">
          {/* imagen real */}
          <img
            src={product.thumbnail}
            className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/80 dark:bg-black/60 text-[10px] uppercase font-bold px-2 py-1 rounded-md">
              {product.category.name || "Digital"}
            </span>
          </div>

          {/* acciones hover */}
          <div className="absolute top-3 right-4 flex gap-3 transition">
            <button className="bg-white/80 dark:bg-black/60 p-2 rounded-full shadow-lg">
              <Heart size={18} className="hover:text-red-600" />
            </button>
          </div>
        </div>

        {/* info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-500 transition">
            {product.title}
          </h3>

          <div className="flex flex-col gap-2 border-slate-500">
            <div className="flex gap-1 items-center justify-between">
              <div>
                <div className="text-2xl font-black">{price > 0 ? `Bs. ${(price)}` :"Gratis"}</div>
                <div className="line-through text-slate-500">
                  
                  {product.price == price ? "" : <div>Bs {product.price}</div>}
                </div>
              </div>
              <div className="flex gap-3 justify-center items-center">
                {product.price == price ? (
                  ""
                ) : (
                  <div className="bg-red-600 p-2">
                    -{product.discount_percentage}%
                  </div>
                )}

                <div className="bg-green-600 p-2">
                  <ShoppingCart />
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="flex items-center justify-between mt-auto text-xs text-gray-400">
              <div className="flex gap-3">
                <span className="flex items-center gap-1">
                  <Download size={14} /> {product.downloads}
                </span>

                <span className="flex items-center gap-1">
                  <Eye size={14} /> {product.views}
                </span>

                <span className="flex items-center gap-1">
                  <Heart size={14} /> {product.likes}
                </span>
              </div>

              <div className="flex text-lg items-center gap-1 ">
                <Star size={20} className="text-yellow-400" />
                {product.rating ?? 0}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
