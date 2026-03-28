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
  const originalPrice = Number(product.price) || 0;
  const discountPercentage = Number(product.discount_percentage) || 0;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = Math.max(originalPrice - discountAmount, 0);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") return urlObj.pathname.slice(1);
      if (urlObj.hostname.includes("youtube.com"))
        return urlObj.searchParams.get("v");
      return null;
    } catch {
      return null;
    }
  };
  const youtubeId = getYouTubeId(product.video_preview_url);
  return (
    <div className="cardBG border border-zinc-500/15  shadow-md shadow-black/30 rounded-2xl overflow-hidden">
      {/* Imagen */}
      <Link href={`/cursos/${product.slug}`}>
        <div className="relative overflow-hidden group rounded-2xl">
          {/* imagen real */}
          {youtubeId ? (
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={product.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-t-lg"
            />
          ) : (
            <div className="h-48 dark:bg-gray-800 bg-slate-100 flex items-center justify-center text-gray-400">
              Sin vista previa
            </div>
          )}

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
                <div className="text-2xl font-black">
                  {finalPrice > 0 ? formatPrice(finalPrice) : "Gratis"}
                </div>
                {discountAmount > 0 && (
                  <div className="text-slate-500 text-sm">
                    <div className="line-through">{formatPrice(originalPrice)}</div>
                  
                  </div>
                )}
              </div>
              <div className="flex gap-3 justify-center items-center">
                {discountPercentage > 0 ? (
                  <div className="bg-red-600 text-white p-2 rounded-md italic">
                    -{discountPercentage}%
                  </div>
                ) : (
                  ""
                )}

                <div className="border border-green-500 p-2 rounded-md">
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
