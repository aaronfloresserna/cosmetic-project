import { mockProducts } from "@/lib/mock-products";

// Mock de órdenes — reemplazar con Prisma cuando haya pagos activos
const mockOrders = [
  {
    id: "ORD-001", customerName: "María García", customerEmail: "maria@example.com",
    status: "DELIVERED", totalAmount: 1100, createdAt: "2026-03-01",
    items: [{ productId: "1", quantity: 1, unitPrice: 420 }, { productId: "4", quantity: 1, unitPrice: 480 }, { productId: "6", quantity: 1, unitPrice: 350 }],
  },
  {
    id: "ORD-002", customerName: "Carlos López", customerEmail: "carlos@example.com",
    status: "SHIPPED", totalAmount: 680, createdAt: "2026-03-03",
    items: [{ productId: "2", quantity: 1, unitPrice: 680 }],
  },
  {
    id: "ORD-003", customerName: "Ana Martínez", customerEmail: "ana@example.com",
    status: "PAID", totalAmount: 950, createdAt: "2026-03-05",
    items: [{ productId: "3", quantity: 1, unitPrice: 560 }, { productId: "5", quantity: 1, unitPrice: 390 }],
  },
  {
    id: "ORD-004", customerName: "Roberto Sánchez", customerEmail: "roberto@example.com",
    status: "PENDING", totalAmount: 560, createdAt: "2026-03-07",
    items: [{ productId: "3", quantity: 1, unitPrice: 560 }],
  },
];

const STATUS_LABEL: Record<string, { label: string; class: string }> = {
  PENDING:           { label: "Pendiente",          class: "bg-amber-50 text-amber-700 border-amber-200" },
  PAID:              { label: "Pagado",              class: "bg-blue-50 text-blue-700 border-blue-200" },
  SUPPLIER_NOTIFIED: { label: "Proveedor notificado",class: "bg-purple-50 text-purple-700 border-purple-200" },
  SHIPPED:           { label: "Enviado",             class: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  DELIVERED:         { label: "Entregado",           class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  CANCELLED:         { label: "Cancelado",           class: "bg-red-50 text-red-700 border-red-200" },
};

function calcOrderMargin(order: typeof mockOrders[0]) {
  return order.items.reduce((sum, item) => {
    const product = mockProducts.find((p) => p.id === item.productId);
    if (!product) return sum;
    const margin = (product.sellingPrice - product.supplierPrice - product.importCost) * item.quantity;
    return sum + margin;
  }, 0);
}

export default function AdminPage() {
  const totalRevenue = mockOrders.reduce((s, o) => s + o.totalAmount, 0);
  const totalMargin = mockOrders.reduce((s, o) => s + calcOrderMargin(o), 0);
  const totalOrders = mockOrders.length;
  const productMargins = mockProducts.map((p) => ({
    ...p,
    margin: p.sellingPrice - p.supplierPrice - p.importCost,
    marginPct: Math.round(((p.sellingPrice - p.supplierPrice - p.importCost) / p.sellingPrice) * 100),
  })).sort((a, b) => b.margin - a.margin);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-1">Panel Admin</h1>
      <p className="text-sm text-neutral-400 mb-8">Datos de ejemplo — se conectará a Prisma con órdenes reales</p>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Órdenes totales", value: totalOrders, format: (v: number) => v.toString() },
          { label: "Ingresos totales", value: totalRevenue, format: (v: number) => `$${v.toLocaleString("es-MX")} MXN` },
          { label: "Margen neto total", value: totalMargin, format: (v: number) => `$${v.toLocaleString("es-MX")} MXN`, highlight: true },
        ].map((kpi) => (
          <div key={kpi.label} className={`rounded-2xl border p-6 ${kpi.highlight ? "border-emerald-200 bg-emerald-50" : "border-neutral-100 bg-neutral-50"}`}>
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.highlight ? "text-emerald-700" : "text-neutral-900"}`}>
              {kpi.format(kpi.value)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Órdenes */}
        <section>
          <h2 className="font-semibold mb-4">Órdenes recientes</h2>
          <div className="space-y-3">
            {mockOrders.map((order) => {
              const margin = calcOrderMargin(order);
              const badge = STATUS_LABEL[order.status];
              return (
                <div key={order.id} className="border border-neutral-100 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{order.customerName}</p>
                      <p className="text-xs text-neutral-400">{order.id} · {order.createdAt}</p>
                    </div>
                    <span className={`text-xs border px-2 py-0.5 rounded-full ${badge.class}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-neutral-500">Total: <strong className="text-neutral-900">${order.totalAmount.toLocaleString("es-MX")} MXN</strong></span>
                    <span className="text-emerald-600 font-medium">+${margin.toLocaleString("es-MX")} margen</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Márgenes por producto */}
        <section>
          <h2 className="font-semibold mb-4">Márgenes por producto</h2>
          <div className="space-y-2">
            {productMargins.map((p) => (
              <div key={p.id} className="border border-neutral-100 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                  <p className="text-xs text-neutral-400">{p.category} · ${p.sellingPrice.toLocaleString("es-MX")} MXN</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-emerald-600">+${p.margin.toLocaleString("es-MX")}</p>
                  <p className="text-xs text-neutral-400">{p.marginPct}% margen</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
