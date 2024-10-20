import type { Pedido } from "@/types/types";
import formateValue from "./formateValue";


export const pagoTotalDePedidos = (pedidos: Pedido[]) => {
    const totalPago = pedidos.reduce((acc, pedido) => acc + pedido.pago_total, 0);
    let pagoToString = parseInt(totalPago.toString())
    return formateValue(pagoToString);
}