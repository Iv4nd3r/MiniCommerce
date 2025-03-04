const API_URL = "http://127.0.0.1:5000"; //For development purposes only, in real situation use dotenv to secure the backend location

export const getTransactions = async () => {
  const response = await fetch(`${API_URL}/get_transactions`);
  return response.json();
};

export const addTransaction = async (transaction) => {
  const response = await fetch(`${API_URL}/add_transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  return response.json();
};

export const editTransaction = async (id, transaction) => {
  const response = await fetch(`${API_URL}/edit_transaction/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  return response.json();
};

export const deleteTransaction = async (id) => {
  // To be implemented later in the backend
  // const response = await fetch(`${API_URL}/delete_transaction/${id}`, {
  //   method: "DELETE",
  // });
  // return response.json();
};

export const viewTransaction = async (id) => {
  const response = await fetch(`${API_URL}/get_transactions`);
  const transactions = await response.json();
  let foundTransaction = null;
  for (let i = 0; i < transactions.data.length; i++) {
    if (transactions.data[i].id === id) {
      foundTransaction = transactions.data[i];
      break;
    }
  }
  return foundTransaction;
};
