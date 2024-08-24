export const filterByDate = (data, period) => {
  const now = new Date();
  let startDate, endDate;

  if (period === "este-mes") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  } else if (period === "mes-pasado") {
    startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    endDate = new Date(now.getFullYear(), now.getMonth(), 0);
  } else {
    return data;
  }

  return data.filter((user) =>
    user.pedidos.some((pedido) =>
      pedido.detalles_pedido.some((detalle) => {
        const pedidoDate = new Date(detalle.createdAt);
        return pedidoDate >= startDate && pedidoDate <= endDate;
      })
    )
  );
};
