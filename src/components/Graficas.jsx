import { useEffect, useState } from "react";
import axios from "axios";
import API_HOST from "@/config/config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Graficas = () => {
  const [products, setProducts] = useState([]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 flex flex-col items-center justify-center max-w-52">
          <p className="label text-xs text-wrap text-center">{`${payload[0].payload.nombre}`}</p>
          <img
            src={payload[0].payload.image}
            alt="imagen de producto"
            className="w-20 h-19"
          />
          <p className="label text-lg font-semibold text-wrap bg-white text-black flex">{`Ventas: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    axios
      .get(`${API_HOST}/api/see-best-sallers`)
      .then((response) => {
        const productsWithIndex = response.data.data.map((product, index) => ({
          ...product,
          index: index + 1,
        }));
        setProducts(productsWithIndex);
      })
      .catch((error) => {
        console.log("Error al listar los productos más vendidos", error);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={products}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 4" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="sales_count" barSize={40} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
