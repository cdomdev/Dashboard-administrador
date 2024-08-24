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
import { bestSaller } from "@/services/balances";

export const Graficas = () => {
  const [products, setProducts] = useState([]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 flex flex-col items-center justify-center max-w-44 rounded-lg shadow-md">
          <p className="label text-xs text-wrap text-center font-semibold bg-gray-200 p-2 rounded-md">{`${payload[0].payload.nombre}`}</p>
          <img
            src={payload[0].payload.image}
            alt="imagen de producto"
            className="h-24"
          />
          <p className="label text-lg font-semibold text-wrap bg-white text-black flex">{`Ventas: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await bestSaller();
      if (response) {
        const productsWithIndex = response.data.data.map((product, index) => ({
          ...product,
          index: index + 1,
        }));
        setProducts(productsWithIndex);
      }
    };

    fetchData();
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
