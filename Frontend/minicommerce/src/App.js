import React, { useState, useEffect } from "react";
import logo from "./app logo.png";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import EditTransaction from "./EditTransaction";
import TransactionDetails from "./TransactionDetails";
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  viewTransaction,
} from "./Api";

function App() {
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [activeTab, setActiveTab] = useState("All Transactions");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    groupTransactionsByDate();
  }, [transactions]);

  const fetchTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data.data);
  };

  const handleAddTransaction = async () => {
    setOverlayContent("add");
    setShowOverlay(true);
  };

  const handleEditTransaction = async (transactionId) => {
    setSelectedTransactionId(transactionId);
    setOverlayContent("edit");
    setShowOverlay(true);
  };

  const handleTransactionDetails = async (transactionId) => {
    setSelectedTransactionId(transactionId);
    setOverlayContent("details");
    setShowOverlay(true);
  };

  // const handleDeleteTransaction = async (id) => {
  //   To be implemented later, currently just a placeholder for the delete function
  //    await deleteTransaction(id);
  //    fetchTransactions();
  //   alert("Delete function is not implemented yet");
  // };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setOverlayContent(null);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setTransactions((prevTransactions) =>
      [...prevTransactions].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      })
    );
  };

  const groupTransactionsByDate = () => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.transactionDate);
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(transaction);
      return acc;
    }, {});

    const sortedGrouped = Object.keys(grouped)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {});

    setGroupedTransactions(sortedGrouped);
    setActiveTab("All Transactions");
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-header-text">MiniCommerce</div>
          <button className="Add-button" onClick={handleAddTransaction}>
            + Add new transaction
          </button>
        </header>
        {showOverlay && overlayContent === "details" && (
          <TransactionDetails
            transactionId={selectedTransactionId}
            onClose={handleCloseOverlay}
          />
        )}
        {showOverlay && overlayContent === "edit" && (
          <EditTransaction
            transactionId={selectedTransactionId}
            onClose={handleCloseOverlay}
          />
        )}
        {showOverlay && overlayContent === "add" && (
          <AddTransaction onClose={handleCloseOverlay} />
        )}
        <div className="App-content">
          <div className="tabs">
            <button
              className={`tab-button ${
                activeTab === "All Transactions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("All Transactions")}
            >
              All Transactions
            </button>
            {Object.keys(groupedTransactions).map((yearMonth) => (
              <button
                key={yearMonth}
                className={`tab-button ${
                  activeTab === yearMonth ? "active" : ""
                }`}
                onClick={() => setActiveTab(yearMonth)}
              >
                {yearMonth}
              </button>
            ))}
          </div>
          <h2>Transaction List</h2>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>ID</th>
                <th onClick={() => handleSort("productID")}>Product ID</th>
                <th onClick={() => handleSort("productName")}>Product Name</th>
                <th onClick={() => handleSort("amount")}>Amount</th>
                <th onClick={() => handleSort("customerName")}>
                  Customer Name
                </th>
                <th onClick={() => handleSort("transactionDate")}>
                  Transaction Date
                </th>
                <th onClick={() => handleSort("createOn")}>Create On</th>
                <th onClick={() => handleSort("createBy")}>Create By</th>
                <th onClick={() => handleSort("status")}>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "All Transactions"
                ? transactions
                : groupedTransactions[activeTab]
              )?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productID}</td>
                  <td>{item.productName}</td>
                  <td>{item.amount}</td>
                  <td>{item.customerName}</td>
                  <td>{item.transactionDate}</td>
                  <td>{item.createOn}</td>
                  <td>{item.createBy}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="More-button"
                      onClick={() => handleTransactionDetails(item.id)}
                    >
                      More Details
                    </button>
                    <button
                      className="Edit-button"
                      onClick={() => handleEditTransaction(item.id)}
                    >
                      Edit
                    </button>
                    {/* <button
                      className="Delete-button"
                      onClick={() => handleDeleteTransaction(item.id)}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Router>
  );
}

export default App;
