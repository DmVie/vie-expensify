import React from 'react'
import { connect } from 'react-redux';

import { startAddExpense } from '../actions/expenses'
import ExpenseForm from './ExpenseForm';

class AddExpensesPage extends React.Component {
  constructor(props) {
    super(props)

    // bind functions
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(expense) {
    this.props.startAddExpense(expense);
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    )
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    startAddExpense: (expense) => {
      dispatch(startAddExpense(expense))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(AddExpensesPage)
