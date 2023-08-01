import { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses],
        expenseToEdit: null,
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
        expenseToEdit: null,
      };
    }
    case "SET_EXPENSE_TO_UPDATE": {
      return {
        ...state,
        expenseToEdit: payload.expense,
      };
    }
    case "UPDATE_EXPENSE": {
      const updatedExpenses = state.expenses.map((expense) =>
        expense.id === payload.expense.id ? payload.expense : expense
      );
      return {
        expenses: updatedExpenses,
        expenseToEdit: null,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [], expenseToEdit: null });

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const updateExpense = (expense) => {
    dispatch({ type: "UPDATE_EXPENSE", payload: { expense } });
  };

  const changeExpenseToUpdate = (expense) => {
    dispatch({ type: "SET_EXPENSE_TO_UPDATE", payload: { expense } });
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          updateExpense={updateExpense}
          expenseToEdit={state.expenseToEdit}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={changeExpenseToUpdate}
            editExpense={changeExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
