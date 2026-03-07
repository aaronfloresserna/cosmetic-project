import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mock-products";

// TODO: reemplazar mock con consulta a Prisma cuando haya proveedor definido
// import { prisma } from "@/lib/db/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get("categoria");

  const products = categoria
    ? mockProducts.filter((p) => p.category === categoria)
    : mockProducts;

  return NextResponse.json({ products, total: products.length });
}
