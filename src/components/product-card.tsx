import Link from "next/link";
import Image from "next/image";
import type { MockProduct } from "@/lib/mock-products";

export default function ProductCard({ product }: { product: MockProduct }) {
  const margin = product.sellingPrice - product.supplierPrice - product.importCost;

  return (
    <Link href={`/shop/${product.id}`} className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock <= 10 && (
          <span className="absolute top-2 left-2 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
            Pocas unidades
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <span className="text-xs text-neutral-400">{product.category}</span>
        <h3 className="text-sm font-medium leading-snug group-hover:text-neutral-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="font-semibold text-neutral-900">
            ${product.sellingPrice.toLocaleString("es-MX")} MXN
          </span>
          <span className="text-xs text-emerald-600 font-medium">
            +${margin.toLocaleString("es-MX")} margen
          </span>
        </div>
      </div>
    </Link>
  );
}
