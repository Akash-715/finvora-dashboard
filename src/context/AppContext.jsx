import { createContext, useContext, useEffect, useState } from "react";
import { mockTransactions } from "../data/mockData.js";

const AppContext = createContext();

const sortTransactionsByDate = (data) => {
  return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    const initialData = savedTransactions
      ? JSON.parse(savedTransactions)
      : mockTransactions;

    return sortTransactionsByDate(initialData);
  });

  const deleteTransaction = (id) => {
  setTransactions((prev) => prev.filter((item) => item.id !== id));
``};

  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("viewer");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Always save sorted transactions
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(sortTransactionsByDate(transactions))
    );
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Custom setter to always keep transactions sorted
  const updateTransactions = (newTransactions) => {
    if (typeof newTransactions === "function") {
      setTransactions((prev) => sortTransactionsByDate(newTransactions(prev)));
    } else {
      setTransactions(sortTransactionsByDate(newTransactions));
    }
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions: updateTransactions,
        searchTerm,
        setSearchTerm,
        role,
        setRole,
        theme,
        setTheme,
        activePage,
        setActivePage,
        sidebarOpen,
        setSidebarOpen,
        deleteTransaction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);