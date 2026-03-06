import { mockProducts } from "@/lib/mock-products";
import ProductCard from "@/components/product-card";

const categories = ["Todos", ...Array.from(new Set(mockProducts.map((p) => p.category)))];

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  return (
    <ShopContent searchParamsPromise={searchParams} />
  );
}

async function ShopContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParamsPromise;

  const filtered =
    categoria && categoria !== "Todos"
      ? mockProducts.filter((p) => p.category === categoria)
      : mockProducts;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Catálogo</h1>
      <p className="text-neutral-500 text-sm mb-8">
        {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => {
          const isActive = cat === (categoria ?? "Todos");
          return (
            <a
              key={cat}
              href={cat === "Todos" ? "/shop" : `/shop?categoria=${cat}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                isActive
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {cat}
            </a>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
