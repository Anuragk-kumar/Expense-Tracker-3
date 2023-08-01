import React, { useEffect, useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, updateExpense, expenseToEdit }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setEditMode(true);
      expenseTextInput.current.value = expenseToEdit.text;
      expenseAmountInput.current.value = expenseToEdit.amount;
    } else {
      setEditMode(false);
      clearInput();
    }
  }, [expenseToEdit]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      return;
    }

    if (editMode) {
      const updatedExpense = {
        ...expenseToEdit,
        text: expenseText,
        amount: expenseAmount,
      };
      updateExpense(updatedExpense);
    } else {
      const expense = {
        text: expenseText,
        amount: expenseAmount,
        id: new Date().getTime(),
      };
      addExpense(expense);
    }

    clearInput();
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{editMode ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {editMode ? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
