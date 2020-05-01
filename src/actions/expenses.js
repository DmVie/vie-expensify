import { uuid } from 'uuidv4';
import database from '../firebase/firebase';

export const addExpense = (expenseData = {}) => {

  const id = uuid();
  const {
    description = '',
    note = '',
    createdAt = 0,
    amount = 0
  } = expenseData;

  return  {
    type: 'ADD_EXPENSE',
    expense: { id, description, note, createdAt, amount}
  }
}

export const startAddExpense = (expense) => {
  return (dispatch) => {
    database.ref('expenses').push(expense).then(() => {
      dispatch(addExpense(expense));
    })
  }
}

export const editExpense = (id, updates)   => {  
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  }
}

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    database.ref(`expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
    })
    .catch(e => console.log(e.message))
  }
}

export const removeExpense = (id) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  }
}

export const startRemoveExpense = (id) => {
  console.log(id)
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense(id))
    })
  }
}

export const setExpenses = (expenses)  => {
  return {
    type: 'SET_EXPENSES',
    expenses
  }
}


export const startSetExpenses = () => {
    return (dispatch, getState) => {
      return database.ref('expenses').once('value').then((snapshot) => {
        const expenses  = [];
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        dispatch(setExpenses(expenses))   
      })
    }
}