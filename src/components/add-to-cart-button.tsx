"use client";

import { useCartStore } from "@/store/cart";
import type { MockProduct } from "@/lib/mock-products";

export default function AddToCartButton({ product }: { product: MockProduct }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          image: product.images[0],
          sellingPrice: product.sellingPrice,
          supplierPrice: product.supplierPrice,
          importCost: product.importCost,
        })
      }
      className="mt-6 w-full bg-neutral-900 text-white py-3 rounded-full font-medium hover:bg-neutral-700 transition-colors text-sm"
    >
      Agregar al carrito
    </button>
  );
}
