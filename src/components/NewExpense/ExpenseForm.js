import React, { useEffect, useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [allItems, setAllItems] = useState(() => {
    const storedData = localStorage.getItem("expenseItemData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [isDataAdded, setIsDataAdded] = useState(false);


  const submitHandler = () => {
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    console.log(expenseData);
    setAllItems((prev) => [...prev, expenseData]);
    setIsDataAdded(true);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  useEffect(() => {
    if (isDataAdded) {
      localStorage.setItem("expenseItemData", JSON.stringify(allItems));
      console.log(allItems);
      setIsDataAdded(false);
      window.location.reload();
      
    }
  }, [allItems, isDataAdded]);

  return (
    <div>
      <div className="new-expense_controls">
        <div className="new-expense_control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={(e) => setEnteredTitle(e.target.value)}
          />
        </div>
        <div className="new-expense_control">
          <label>Amount</label>
          <input
            type="number"
            value={enteredAmount}
            min="0.01"
            step="0.01"
            onChange={(e) => setEnteredAmount(e.target.value)}
          />
        </div>
        <div className="new-expense_control">
          <label>Date</label>
          <input
            type="date"
            value={enteredDate}
            min="2018-01-01"
            max="2023-12-31"
            onChange={(e) => setEnteredDate(e.target.value)}
          />
        </div>
      </div>
      <div className="new-expense_actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" onClick={() => submitHandler()}>
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
