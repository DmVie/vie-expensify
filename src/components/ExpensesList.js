import React from 'react'

import ExpenseListItem from './ExpenseListItem';
import { connect } from 'react-redux';

import getVisibleExpenses from '../selectors/expenses';

const ExpensesList = (props) => {
  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">
          Expenses
        </div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      <div className="list-body">
        {
          props.expenses.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No expenses to view</span>
            </div>
          ) : (
            props.expenses.map((expense) => {
              return <ExpenseListItem key={expense.id} {...expense} />
            })
          )
        }
      </div>
    
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('expenses list state ', state)
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpensesList)
