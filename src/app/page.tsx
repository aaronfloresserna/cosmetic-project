import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="py-24 text-center">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
          K-Beauty · Cosméticos Coreanos
        </span>
        <h1 className="mt-4 text-5xl font-bold tracking-tight leading-tight">
          Tu piel merece <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600">
            lo mejor de Corea
          </span>
        </h1>
        <p className="mt-5 text-neutral-500 max-w-md mx-auto text-lg">
          Productos auténticos de las mejores marcas coreanas, entregados directo a tu puerta en México.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/shop"
            className="bg-neutral-900 text-white px-6 py-3 rounded-full font-medium hover:bg-neutral-700 transition-colors"
          >
            Ver catálogo
          </Link>
          <Link
            href="/shop"
            className="border border-neutral-200 text-neutral-700 px-6 py-3 rounded-full font-medium hover:border-neutral-400 transition-colors"
          >
            Conoce las marcas
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-20 border-t border-neutral-100 pt-16">
        {[
          { icon: "✦", title: "100% Auténtico", desc: "Productos originales directamente de proveedores certificados en Corea." },
          { icon: "⚡", title: "Envío directo", desc: "Tu pedido va del proveedor a tu puerta sin intermediarios." },
          { icon: "💳", title: "Pago seguro MX", desc: "Paga con tarjeta mexicana. Próximamente con Conekta." },
        ].map((f) => (
          <div key={f.title} className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50">
            <span className="text-2xl">{f.icon}</span>
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
