import { getProductById, mockProducts } from "@/lib/mock-products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) notFound();

  const margin = product.sellingPrice - product.supplierPrice - product.importCost;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/shop" className="text-sm text-neutral-400 hover:text-neutral-700 mb-8 inline-block">
        ← Regresar al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        {/* Imagen */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-xs text-neutral-400 uppercase tracking-wide">{product.category}</span>
          <h1 className="text-2xl font-semibold mt-1 leading-snug">{product.name}</h1>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl font-bold">
              ${product.sellingPrice.toLocaleString("es-MX")}
              <span className="text-base font-normal text-neutral-400 ml-1">MXN</span>
            </span>
          </div>

          <p className="mt-4 text-neutral-600 text-sm leading-relaxed">{product.description}</p>

          {/* Desglose de costos (solo visible internamente, útil para admin) */}
          <div className="mt-6 bg-neutral-50 rounded-xl p-4 text-sm space-y-1.5 border border-neutral-100">
            <div className="flex justify-between text-neutral-500">
              <span>Costo proveedor</span>
              <span>${product.supplierPrice.toLocaleString("es-MX")} MXN</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Costo importación</span>
              <span>${product.importCost.toLocaleString("es-MX")} MXN</span>
            </div>
            <div className="flex justify-between font-semibold text-emerald-600 border-t border-neutral-200 pt-1.5 mt-1">
              <span>Margen neto</span>
              <span>+${margin.toLocaleString("es-MX")} MXN</span>
            </div>
          </div>

          <div className="mt-2 text-xs text-neutral-400">
            Stock: {product.stock} unidades · SKU: {product.supplierSku}
          </div>

          <button
            disabled
            className="mt-6 w-full bg-neutral-900 text-white py-3 rounded-full font-medium opacity-50 cursor-not-allowed text-sm"
          >
            Agregar al carrito — Próximamente
          </button>
        </div>
      </div>
    </div>
  );
}
