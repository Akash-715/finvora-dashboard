import { FiTrash2 } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import "../styles/transaction.css";

const Transaction = () => {
  const {
    transactions,
    searchTerm,
    setSearchTerm,
    role,
    deleteTransaction,
    theme,
  } = useAppContext();

  const filteredTransactions = [...transactions]
    .filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const exportCSV = () => {
    const headers = ["Date,Description,Category,Type,Amount"];
    const rows = filteredTransactions.map(
      (item) =>
        `${item.date},${item.description},${item.category},${item.type},${item.amount}`
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute("download", "transactions.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`tx-card tx-${theme}`}>
      {/* Top Bar */}
      <div className="tx-top">
        <button className="tx-export-btn" onClick={exportCSV}>
          ⬇ Export CSV
        </button>

        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="tx-search"
        />
      </div>

      {/* Table */}
      <div className="tx-table-wrapper">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => (
                <tr key={item.id} className="tx-row">
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>

                  <td>
                    <span
                      className={`tx-badge ${
                        item.type === "income" ? "income" : "expense"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className={`tx-amount ${item.type}`}>
                    ₹{item.amount.toLocaleString()}
                  </td>

                  {role === "admin" && (
                    <td>
                      <button
                        className="tx-delete-btn"
                        onClick={() => deleteTransaction(item.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={role === "admin" ? 6 : 5}
                  className="tx-no-data"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;