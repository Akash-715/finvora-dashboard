import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import "../styles/modal.css";

const AddTransactionModal = ({ close }) => {
  const { setTransactions, transactions, theme } = useAppContext();

  const [form, setForm] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      date: form.date,
      description: form.description,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    close();
  };

  return (
    <div className="modal-overlay">
      <div className={`modal ${theme}`}>
        <h2>Add Transaction</h2>

        <input
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Amount"
          type="number"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="modal-actions">
          <button className="modal-add-btn" onClick={handleSubmit}>
            Add
          </button>
          <button className="modal-cancel-btn" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;