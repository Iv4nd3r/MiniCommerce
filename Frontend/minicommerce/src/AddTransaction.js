import React, { useState } from "react";
import { addTransaction } from "./Api";
import "./form.css"; // Import the CSS file

const AddTransaction = ({ onClose }) => {
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [createBy, setCreateBy] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    console.log(status);
    e.preventDefault();
    const newTransaction = {
      productID: productID,
      productName: productName,
      amount: parseFloat(amount),
      customerName: customerName,
      status: 0, // Convert status to number
      transactionDate: new Date(transactionDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      createBy: createBy,
    };
    const response = await addTransaction(newTransaction);
    if (response.message === "Transaction added successfully") {
      alert("Transaction added successfully");
      window.location.reload();
    } else {
      alert("Failed to add transaction with response: " + response);
      console.log(response);
    }
    onClose();
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <form onSubmit={handleSubmit} className="transaction-form">
          <h2>Add New Transaction</h2>
          <div className="form-group">
            <label>Product ID:</label>
            <input
              type="text"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Transaction Date:</label>
            <input
              type="datetime-local"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Created By:</label>
            <input
              type="text"
              value={createBy}
              onChange={(e) => setCreateBy(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
