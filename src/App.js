import React, { useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import Navbar from "./components/Expenses/Navbar";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: "e2",
    title: "Car Insurance",
    amount: 294.12,
    date: new Date(2021, 7, 16),
  },
  {
    id: "e3",
    title: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 14),
  },
  {
    id: "e4",
    title: "New Desk",
    amount: 451,
    date: new Date(2022, 10, 14),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
 
  const handleDeleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
    setExpenses(updatedExpenses);
  };

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <Navbar/>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} onDeleteExpense={handleDeleteExpense} />
    </div>
  );
};

export default App;