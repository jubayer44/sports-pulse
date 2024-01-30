import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TSaleProductResponse } from "../types";

type SalesChartProps = {
  data: TSaleProductResponse[];
};

const SalesChart = ({ data }: SalesChartProps) => {
  const newData = data?.slice(0, 5)?.map((item) => ({
    date: item?.saleDate?.split("T")[0],
    quantity: item?.quantity,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={newData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis dataKey="quantity" tick={{ fontSize: 12 }} />
        <Tooltip wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
