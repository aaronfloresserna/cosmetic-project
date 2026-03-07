"use client";

import { useCartStore } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-400 text-lg">Tu carrito está vacío</p>
        <Link
          href="/shop"
          className="mt-4 inline-block bg-neutral-900 text-white px-6 py-2.5 rounded-full text-sm hover:bg-neutral-700 transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8">Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border border-neutral-100 rounded-2xl p-4">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug line-clamp-2">{item.name}</p>
                <p className="text-sm text-neutral-500 mt-1">
                  ${item.sellingPrice.toLocaleString("es-MX")} MXN
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 transition-colors text-lg leading-none"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 transition-colors text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="text-sm font-semibold text-right flex-shrink-0">
                ${(item.sellingPrice * item.quantity).toLocaleString("es-MX")}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="border border-neutral-100 rounded-2xl p-6 sticky top-20">
            <h2 className="font-semibold mb-4">Resumen</h2>
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} productos)</span>
                <span>${total().toLocaleString("es-MX")} MXN</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Envío</span>
                <span>Calculado en checkout</span>
              </div>
            </div>
            <div className="border-t border-neutral-100 mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${total().toLocaleString("es-MX")} MXN</span>
            </div>
            <Link
              href="/checkout"
              className="mt-4 block w-full bg-neutral-900 text-white py-3 rounded-full text-sm font-medium text-center hover:bg-neutral-700 transition-colors"
            >
              Proceder al pago
            </Link>
            <Link
              href="/shop"
              className="mt-2 block w-full text-center text-sm text-neutral-400 hover:text-neutral-700 transition-colors py-2"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
