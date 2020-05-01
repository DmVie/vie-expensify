import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensesPage extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRemoveExpense = this.onRemoveExpense.bind(this)
  }

  onSubmit(expense) {

    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/')
  }

  onRemoveExpense() {
    this.props.startRemoveExpense(this.props.expense.id)
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <div className="page-header">        
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm 
            {...this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemoveExpense}>Remove</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id )
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesPage)