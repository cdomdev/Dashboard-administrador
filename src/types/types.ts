export type ValuesSesion = {
  email: string;
  password: string;
};

export type ResPedidos = {
  id: number;
  nombre: string;
  email: string;
  picture?: string;
  pedidos: Pedido[];
};

export type Pedido = {
  id: string;
  pago_total: number;
  estado_pedido: string;
  metodo_de_pago: string;
  detalles_pedido: DetallesPedido[];
};

export type DetallesPedido = {
  id: number;
  createdAt: Date;
};

export interface DatosUsurio {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  destino?: string;
  detalles?: string;
  ciudad?: string | null;
  departamento?: string | null;
}

export interface Producto {
  id: number;
  marca: string;
  nombre: string;
  valor: string;
  description: string;
  image: string;
  referencia: string;
  discount: number | null;
  subcategoria: any | null;
  quantity?: number;
}
