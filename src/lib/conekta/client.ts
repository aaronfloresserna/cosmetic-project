import ConektaSDK from "conekta";

const conekta = new ConektaSDK.default();
conekta.api_key = process.env.CONEKTA_PRIVATE_KEY ?? "";
conekta.locale = "es";

export { conekta };
