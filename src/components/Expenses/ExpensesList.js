import React, { useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('expenseItemData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        setData(parsedData);
      }
    }
  }, []);

  const deleteExpense = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem('expenseItemData', JSON.stringify(updatedData));
  };

  const sortDataAscending = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    setData(sortedData);
  };

  const sortDataDescending = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    setData(sortedData);
  };

  const handleYearFilter = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredData = selectedYear
    ? data.filter((expense) => new Date(expense.date).getFullYear().toString() === selectedYear)
    : data;

  return (
    <div>
      <div className='filter-data'>
        <div className="sort-buttons">
          <button onClick={sortDataAscending} className='sort-button'>Sort Ascending</button>
          <button onClick={sortDataDescending} className='sort-button'>Sort Descending</button>
        </div>
        <div>
          <select class="filter-by-year" onChange={handleYearFilter}>
            <option value="">Filter by year</option>
            {Array.from(new Set(data.map((item) => new Date(item.date).getFullYear()))).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      
      <ul className="expenses-list">
        {filteredData.map((expense, index) => (
          <ExpenseItem
            key={index}
            indexOf={index}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            onDelete={() => deleteExpense(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
