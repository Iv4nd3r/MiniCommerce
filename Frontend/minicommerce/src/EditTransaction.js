import React, { useState, useEffect } from "react";
import { viewTransaction, editTransaction } from "./Api";
import "./form.css"; // Import the CSS file

const TransactionForm = ({ transactionId, onClose }) => {
  const [transaction, setTransaction] = useState({
    productID: "",
    productName: "",
    amount: "",
    customerName: "",
    status: "",
    transactionDate: "",
    createBy: "",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      if (transactionId) {
        const data = await viewTransaction(transactionId);
        if (data) {
          setTransaction(data);
        }
      }
    };
    fetchTransaction();
  }, [transactionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const mapStatusToNumber = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return 0;
      case "complete":
        return 1;
      case "failed":
        return 2;
      default:
        return status;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTransaction = {
      ...transaction,
      status: mapStatusToNumber(transaction.status),
    };
    const response = await editTransaction(transactionId, updatedTransaction);
    if (response.message === "Transaction updated successfully") {
      alert("Transaction updated successfully");
      window.location.reload();
    } else {
      alert("Failed to update transaction with response: " + response);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h2>Edit Transaction</h2>
          <div className="form-group">
            <label htmlFor="productID">Product ID:</label>
            <input
              type="text"
              id="productID"
              name="productID"
              value={transaction.productID}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={transaction.productName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={transaction.customerName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={transaction.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="transactionDate">Transaction Date:</label>
            <input
              type="datetime-local"
              id="transactionDate"
              name="transactionDate"
              value={transaction.transactionDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="createBy">Created By:</label>
            <input
              type="text"
              id="createBy"
              name="createBy"
              value={transaction.createBy}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              Save Transaction
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
