# Cosmetic Project — K-Beauty Dropshipping MX

## Concepto
Tienda e-commerce de dropshipping de productos K-Beauty (cosméticos coreanos) para mercado mexicano.
- El cliente compra en la tienda con tarjeta
- El sistema notifica automáticamente al proveedor
- El proveedor envía directo al cliente final
- La ganancia = precio venta - costo proveedor - importación

## Flujo del sistema
```
Cliente en México → tienda → pago con tarjeta
        ↓
Webhook de pago exitoso
        ↓
API del proveedor (Q-Depot / UMMA) crea la orden
        ↓
Proveedor envía directo al cliente
        ↓
Ganancia = precio venta - costo proveedor - importación
```

## Stack Tecnológico
| Capa | Tecnología |
|---|---|
| Frontend | Next.js |
| Backend | Node.js (Next.js API Routes) |
| Base de datos | PostgreSQL o PlanetScale |
| Pagos México | Conekta o Stripe |
| Deploy | Vercel |

## Proveedores Candidatos
| Proveedor | Sitio | Notas |
|---|---|---|
| Q-Depot | wholesale.q-depot.com | 4.8/5 Trustpilot, 258 reseñas, mejor calificado |
| UMMA | umma.io | Certificado de autenticidad (COA), útil para marketplaces |
| YESBEE | yesbee.com | MOQ bajo, bueno para empezar |

## Módulos a desarrollar
1. **Catálogo** — sincronización de productos con API del proveedor
2. **Carrito y Checkout** — flujo de compra con cálculo de comisión e importación
3. **Pagos** — integración Conekta o Stripe (tarjetas MX)
4. **Webhook de orden** — al confirmar pago, crear orden automática en proveedor
5. **Panel admin** — órdenes, márgenes, estado de envíos
6. **Envío / Importación** — lógica de costos de importación a México (pendiente definir)

## Pendientes
- [ ] Verificar si Q-Depot o UMMA tienen API pública para crear órdenes automáticas
- [ ] Definir proveedor principal
- [ ] Definir pasarela de pago (Conekta vs Stripe)
- [ ] Definir estrategia de importación / envío a México
- [ ] Estructura inicial del proyecto Next.js
