// TODO: Conekta bloqueado — pendiente RFC/documentación SAT
// El SDK usa API REST con axios. Ejemplo de uso cuando esté listo:
//
// import { OrdersApi, Configuration } from "conekta";
// const config = new Configuration({ accessToken: process.env.CONEKTA_PRIVATE_KEY });
// export const ordersApi = new OrdersApi(config);

export const CONEKTA_PUBLIC_KEY = process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY ?? "";
