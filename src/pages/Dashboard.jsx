import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import Transaction from "../components/Transaction.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

import BalanceChart from "../components/charts/BalanceChart.jsx";
import CategoryPie from "../components/charts/CategoryPie.jsx";
import Insights from "../components/Insights.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";
import RecentTransactions from "../components/RecentTransactions.jsx";

import "../styles/dashboard.css";

const Dashboard = () => {
  const { transactions, role, activePage, theme } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className={`app-shell ${theme}`}>
      <Sidebar />

      <div className="app-main-wrapper">
        <Navbar />

        <main className="dashboard-main-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Akash Dashboard</h1>
          </div>

          {activePage === "overview" && (
            <>
              <div className="summary-cards">
                <div className="summary-card balance-card">
                  <h2>Total Balance</h2>
                  <p>₹{totalBalance.toLocaleString()}</p>
                </div>

                <div className="summary-card income-card">
                  <h2>Income</h2>
                  <p>₹{totalIncome.toLocaleString()}</p>
                </div>

                <div className="summary-card expense-card">
                  <h2>Expenses</h2>
                  <p>₹{totalExpense.toLocaleString()}</p>
                </div>
              </div>

              <div className="dashboard-main-grid">
                <div className="dashboard-transactions">
                  {role === "admin" && (
                    <div className="add-btn-wrapper">
                      <button
                        className="add-transaction-btn"
                        onClick={() => setShowModal(true)}
                      >
                        + Add Transaction
                      </button>
                    </div>
                  )}

                  <Transaction />
                </div>

                <div className="dashboard-charts">
                  <BalanceChart />
                  <CategoryPie />
                </div>
              </div>

              <div className="dashboard-insights">
                <RecentTransactions />
                <Insights />
              </div>
            </>
          )}

          {activePage === "transactions" && (
            <div className="dashboard-section-page">
              <div className="page-header-row">
                <h2 className="section-title">Transactions</h2>
                {role === "admin" && (
                  <button
                    className="add-transaction-btn"
                    onClick={() => setShowModal(true)}
                  >
                    + Add Transaction
                  </button>
                )}
              </div>
              <Transaction />
            </div>
          )}

          {activePage === "insights" && (
            <div className="dashboard-section-page">
              <Insights />
            </div>
          )}

          {activePage === "recent" && (
            <div className="dashboard-section-page">
              <h2 className="section-title">Recent Activity</h2>
              <RecentTransactions />
            </div>
          )}

          {showModal && (
            <AddTransactionModal close={() => setShowModal(false)} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;