export type ValuesSesion = {
    email: string,
    password: string
}

export type ResPedidos = {
    id: number;
    nombre: string;
    email: string;
    picture?: string;
    pedidos: Pedido[];
}

export type Pedido = {
    id: string;
    pago_total: number;
    detalles_pedido: DetallesPedido[];
}

export type DetallesPedido = {
    id: number;
    createdAt: Date;
}
