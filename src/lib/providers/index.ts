// Supplier provider interface — to be implemented when provider is chosen
// Candidates: Q-Depot, UMMA, YESBEE

export interface SupplierOrder {
  supplierSku: string;
  quantity: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
}

export interface SupplierOrderResult {
  supplierOrderId: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface SupplierProvider {
  createOrder(order: SupplierOrder): Promise<SupplierOrderResult>;
  getOrderStatus(supplierOrderId: string): Promise<string>;
}

// TODO: Implement when supplier is chosen
export function getSupplierProvider(): SupplierProvider {
  throw new Error("No supplier provider configured. Define one in src/lib/providers/");
}
