// Mock data — reemplazar con llamadas a Prisma cuando haya proveedor definido
export interface MockProduct {
  id: string;
  supplierSku: string;
  name: string;
  description: string;
  images: string[];
  sellingPrice: number;
  supplierPrice: number;
  importCost: number;
  stock: number;
  category: string;
}

export const mockProducts: MockProduct[] = [
  {
    id: "1",
    supplierSku: "COSRX-AHA-120",
    name: "COSRX AHA/BHA Clarifying Treatment Toner",
    description: "Tónico exfoliante con AHA y BHA para piel brillante y sin imperfecciones. Formulado con agua de centella asiática y extracto de sauce.",
    images: ["https://placehold.co/400x400/f5e6d3/8b5e3c?text=COSRX+Toner"],
    sellingPrice: 420,
    supplierPrice: 180,
    importCost: 60,
    stock: 25,
    category: "Tónicos",
  },
  {
    id: "2",
    supplierSku: "INNISFREE-GTC-50",
    name: "Innisfree Green Tea Seed Serum",
    description: "Sérum hidratante con extracto de té verde de la isla Jeju. Proporciona hidratación profunda y antioxidantes naturales.",
    images: ["https://placehold.co/400x400/d4edda/2d6a4f?text=Innisfree+Serum"],
    sellingPrice: 680,
    supplierPrice: 290,
    importCost: 80,
    stock: 18,
    category: "Sérums",
  },
  {
    id: "3",
    supplierSku: "MISSHA-BBCREAM-50",
    name: "Missha M Perfect Cover BB Cream SPF42",
    description: "BB cream de cobertura perfecta con SPF42 y PA+++. Unifica el tono, hidrata y protege del sol en un solo paso.",
    images: ["https://placehold.co/400x400/fde8d8/c1666b?text=Missha+BB"],
    sellingPrice: 560,
    supplierPrice: 240,
    importCost: 70,
    stock: 30,
    category: "Maquillaje",
  },
  {
    id: "4",
    supplierSku: "LANEIGE-LSMC-70",
    name: "Laneige Lip Sleeping Mask",
    description: "Mascarilla nocturna para labios con tecnología de hidratación intensiva. Despertarás con labios suaves y nutridos.",
    images: ["https://placehold.co/400x400/fce4ec/ad1457?text=Laneige+Lip"],
    sellingPrice: 480,
    supplierPrice: 200,
    importCost: 65,
    stock: 40,
    category: "Labios",
  },
  {
    id: "5",
    supplierSku: "SOME-BYME-TONER-150",
    name: "Some By Mi AHA BHA PHA 30 Days Miracle Toner",
    description: "Tónico con triple ácido (AHA, BHA, PHA) para renovar la piel en 30 días. Reduce poros y manchas.",
    images: ["https://placehold.co/400x400/e8f4f8/1a6985?text=Some+By+Mi"],
    sellingPrice: 390,
    supplierPrice: 160,
    importCost: 55,
    stock: 22,
    category: "Tónicos",
  },
  {
    id: "6",
    supplierSku: "SKINFOOD-PEACH-45",
    name: "Skinfood Peach Cotton Multi Finish Powder",
    description: "Polvo translúcido con extracto de durazno para un acabado mate y sedoso. Controla el brillo todo el día.",
    images: ["https://placehold.co/400x400/fef3e2/c77b3d?text=Skinfood+Powder"],
    sellingPrice: 350,
    supplierPrice: 140,
    importCost: 50,
    stock: 15,
    category: "Maquillaje",
  },
];

export function getProductById(id: string): MockProduct | undefined {
  return mockProducts.find((p) => p.id === id);
}
