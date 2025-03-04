import React, { useEffect, useState } from "react";
import { viewTransaction } from "./Api";

const TransactionDetails = ({ transactionId, onClose }) => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const data = await viewTransaction(transactionId);
      setTransaction(data);
      console.log(data);
    };

    fetchTransaction();
  }, [transactionId]);

  if (!transaction) return <div>Loading...</div>;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Transaction Details</h2>
        <p>Name: {transaction.customerName}</p>
        <p>ID: {transaction.id}</p>
        <p>Product purchased: {transaction.productName}</p>
        <p>Product ID: {transaction.productID}</p>
        <p>Amount: {transaction.amount}</p>
        <p>Date: {transaction.transactionDate}</p>
        <p>Handled by: {transaction.createBy}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TransactionDetails;
