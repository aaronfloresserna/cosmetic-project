"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { useState } from "react";

interface ShippingForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  colonia: string;
  city: string;
  state: string;
  zip: string;
}

const ESTADOS_MX = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas",
  "Chihuahua","Ciudad de México","Coahuila","Colima","Durango","Guanajuato",
  "Guerrero","Hidalgo","Jalisco","México","Michoacán","Morelos","Nayarit",
  "Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí",
  "Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas",
];

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const [form, setForm] = useState<ShippingForm>({
    name: "", email: "", phone: "", address: "",
    colonia: "", city: "", state: "", zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-400">No hay productos en el carrito.</p>
        <Link href="/shop" className="mt-4 inline-block text-sm underline text-neutral-700">
          Ver productos
        </Link>
      </div>
    );
  }

  const isFormComplete = Object.values(form).every((v) => v.trim() !== "");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Formulario */}
        <div className="lg:col-span-3 space-y-6">
          <section>
            <h2 className="font-medium mb-4 text-sm uppercase tracking-wide text-neutral-400">
              Datos de contacto
            </h2>
            <div className="space-y-3">
              <Field label="Nombre completo" name="name" value={form.name} onChange={handleChange} />
              <Field label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} />
              <Field label="Teléfono" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10 dígitos" />
            </div>
          </section>

          <section>
            <h2 className="font-medium mb-4 text-sm uppercase tracking-wide text-neutral-400">
              Dirección de envío
            </h2>
            <div className="space-y-3">
              <Field label="Calle y número" name="address" value={form.address} onChange={handleChange} />
              <Field label="Colonia" name="colonia" value={form.colonia} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Ciudad / Municipio" name="city" value={form.city} onChange={handleChange} />
                <Field label="Código postal" name="zip" value={form.zip} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Estado</label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                >
                  <option value="">Selecciona un estado</option>
                  {ESTADOS_MX.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-2">
          <div className="border border-neutral-100 rounded-2xl p-6 sticky top-20">
            <h2 className="font-semibold mb-4">Tu orden</h2>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-600 line-clamp-1 flex-1 mr-2">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium flex-shrink-0">
                    ${(item.sellingPrice * item.quantity).toLocaleString("es-MX")}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-100 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Envío</span>
                <span>Por confirmar</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${total().toLocaleString("es-MX")} MXN</span>
              </div>
            </div>

            {/* Pago — bloqueado hasta Conekta */}
            <div className="mt-6">
              <button
                disabled
                title="Integración de pago pendiente — RFC/SAT en proceso"
                className="w-full bg-neutral-900 text-white py-3 rounded-full text-sm font-medium opacity-40 cursor-not-allowed"
              >
                Pagar con tarjeta
              </button>
              <p className="mt-2 text-center text-xs text-neutral-400">
                Pago con Conekta próximamente disponible
              </p>
            </div>

            {!isFormComplete && (
              <p className="mt-3 text-xs text-amber-500 text-center">
                Completa todos los campos para continuar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, name, value, onChange, type = "text", placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-neutral-500 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
      />
    </div>
  );
}
