import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAppContext } from "../../context/AppContext";
import "../../styles/CategoryPie.css";

const COLORS = [
  "#8b008b",
  "#008000",
  "#1f9d8f",
  "#64748b",
  "#d291d4",
  "#1111ff",
  "#ef4444",
];

const CategoryPie = () => {
  const { transactions, theme } = useAppContext();

  const expenseData = transactions.filter((item) => item.type === "expense");

  const categoryTotals = expenseData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key],
  }));

  return (
    <div className={`pie-card ${theme}`}>
      <h2 className="pie-title">Spending Breakdown</h2>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPie;