import { useAppContext } from "../context/AppContext";
import "../styles/insights.css";

const Insights = () => {
  const { transactions, theme } = useAppContext();

  // 🔹 Only expense transactions
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  // 🔹 Total Expenses
  const totalExpense = expenseTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  // 🔹 Category Analysis
  const categoryMap = {};
  expenseTransactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const topCategory =
    Object.keys(categoryMap).length > 0
      ? Object.keys(categoryMap).reduce((a, b) =>
          categoryMap[a] > categoryMap[b] ? a : b
        )
      : "N/A";

  // 🔹 Group expenses by month
  const monthlyMap = {};

  expenseTransactions.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const monthLabel = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        label: monthLabel,
        total: 0,
      };
    }

    monthlyMap[monthKey].total += t.amount;
  });

  // 🔹 Sort months
  const sortedMonths = Object.entries(monthlyMap)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([key, value]) => ({
      key,
      ...value,
    }));

  // 🔹 Compare each month with previous month
  const monthlyComparisons = sortedMonths.map((month, index) => {
    if (index === 0) {
      return {
        ...month,
        change: null,
        prevLabel: null,
      };
    }

    const prev = sortedMonths[index - 1];
    const change =
      prev.total === 0 ? 0 : ((month.total - prev.total) / prev.total) * 100;

    return {
      ...month,
      change,
      prevLabel: prev.label,
    };
  });

  // 🔹 Useful Observation
  let observation = "Spending is fairly stable across recent months.";

  if (monthlyComparisons.length > 1) {
    const latest = monthlyComparisons[monthlyComparisons.length - 1];

    if (latest.change > 15) {
      observation =
        "Your spending has increased significantly in the latest month.";
    } else if (latest.change < -15) {
      observation =
        "Great! Your spending has dropped noticeably in the latest month.";
    } else if (topCategory !== "N/A") {
      observation = `Most of your expenses are concentrated in ${topCategory}.`;
    }
  }

  return (
    <div className={`insights-container ${theme}`}>
      <h2 className="insights-title">Insights</h2>

      <div className="insights-grid">

        <div className="insight-card">
          <p className="label">Top Category</p>
          <h3>{topCategory}</h3>
        </div>


        <div className="insight-card">
          <p className="label">Total Expenses</p>
          <h3>₹{totalExpense.toLocaleString()}</h3>
        </div>


        <div className="insight-card">
          <p className="label">Observation</p>
          <h3>{observation}</h3>
        </div>


        <div className="insight-card highlight monthly-card">
          <p className="label">Monthly Expense Comparison</p>

          <div className="monthly-comparison-list">
            {monthlyComparisons.map((month, index) => (
              <div key={month.key} className="monthly-row">
                <div className="month-left">
                  <h4>{month.label}</h4>
                  <p>₹{month.total.toLocaleString()}</p>
                </div>

                <div className="month-right">
                  {index === 0 ? (
                    <span className="month-neutral">Base Month</span>
                  ) : (
                    <>
                      <span
                        className={`month-change ${
                          month.change > 0
                            ? "increase"
                            : month.change < 0
                            ? "decrease"
                            : "neutral"
                        }`}
                      >
                        {month.change > 0
                          ? `⬆ ${month.change.toFixed(1)}%`
                          : month.change < 0
                          ? `⬇ ${Math.abs(month.change).toFixed(1)}%`
                          : `0.0%`}
                      </span>
                      <small>vs {month.prevLabel}</small>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;