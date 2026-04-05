import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAppContext } from "../../context/AppContext";
import "../../styles/chart.css";

const BalanceChart = () => {
  const { transactions, theme } = useAppContext();

  let balance = 0;

  const data = transactions.map((item) => {
    if (item.type === "income") balance += item.amount;
    else balance -= item.amount;

    return {
      date: item.date,
      balance,
    };
  });

  return (
    <div className={`chart-card ${theme}`}>
      <h3 className="chart-title">Balance Trend</h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#d1d5db"} />
          <XAxis dataKey="date" stroke={theme === "dark" ? "#f9fafb" : "#111827"} />
          <YAxis stroke={theme === "dark" ? "#f9fafb" : "#111827"} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#0d9488"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;