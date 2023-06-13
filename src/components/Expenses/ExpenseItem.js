import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";


function ExpenseItem(props) {
  const [editItemState, setEditItemState] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [editAmount, setEditAmount] = useState(props.amount); 
  const [editDate, setEditDate] = useState(props.date);
  // // const [data, setData] = useState([]);
  
  // // useEffect(() => {
  // //   const storedData = localStorage.getItem('expenseItemData');
  // //   if (storedData) {
  // //     const parsedData = JSON.parse(storedData);
  // //     setData(parsedData);
  // //   }
  // // }, []);
  
  const handleUpdate = () => {
    const updatedItem = {
      title: editTitle,
      amount: editAmount,
      date: new Date(editDate).toISOString().split('T')[0]
     
    };

    const storedData = localStorage.getItem('expenseItemData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        parsedData[props.indexOf] = updatedItem; // Modify the desired object in the array
        localStorage.setItem('expenseItemData', JSON.stringify(parsedData)); // Store the updated array in localStorage
      }
    }
    
    setEditItemState(false);
    window.location.reload();
  };
  const handleDelete = () => {
    props.onDelete();
  };
  
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">₹{props.amount}</div>
        <button className="editItem" onClick={()=>setEditItemState(true)}>Edit</button>
        {
          editItemState && (<div className="edit-popup">
            <div className="edit-container">
              <input 
              type="text" 
              placeholder="Title"
              value={editTitle}
              onChange={(e)=>setEditTitle(e.target.value)}
              />
              <input 
              type="number"
              placeholder="Amount"
              value={editAmount}
              onChange={(e)=>setEditAmount(e.target.value)}
              />
              <input 
              type="date"
              value={editDate}
              onChange={(e)=>setEditDate(e.target.value)}
              />
            <div className="edit-buttons">
            <button onClick={()=>handleUpdate(props.indexOf)}>Confirm</button>
            <button onClick={()=>setEditItemState(false)}>Close</button>
            </div>
            
            </div>
            
          </div>)
        }
        <button className="deleteItem" onClick={handleDelete}>Delete</button>
      </div>
    </Card>
  );
}

export default ExpenseItem;

