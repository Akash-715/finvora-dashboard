import { useAppContext } from "../context/AppContext";
import "../styles/recentTransactions.css";

const RecentTransactions = () => {
  const { transactions, theme } = useAppContext();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className={`recent-card recent-${theme}`}>
      <div className="recent-header">
        <h2>Recent Transactions</h2>
        <p>Latest activity overview</p>
      </div>

      <div className="recent-list">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((item) => (
            <div key={item.id} className="recent-item">
              <div className="recent-left">
                <div className={`recent-dot ${item.type}`}></div>
                <div>
                  <h4>{item.description}</h4>
                  <span>{item.category}</span>
                </div>
              </div>

              <div className={`recent-amount ${item.type}`}>
                {item.type === "income" ? "+" : "-"}₹
                {item.amount.toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="recent-empty">No recent transactions</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;