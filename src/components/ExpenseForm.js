import React from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';


export default class ExpenseForm extends React.Component{
  constructor(props) {
    super(props) 
    
    this.state = {
      description: this.props.description || '',
      amount: this.props.amount / 100 || '',
      createdAt: moment(this.props.createdAt) || moment(),
      note: this.props.note || '',
      focused: false
    }

    // bind functions
    this.onSubmit = this.onSubmit.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this)
  }

  onDescriptionChange(e) {
    const description = e.target.value;
    this.setState(() => ({ description }))
  }

  onAmountChange(e) {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onNoteChange(e) {
    const note = e.target.value;
    this.setState(() => ({ note }))
  }

  onSubmit(e) {
    e.preventDefault(); 

    if(!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide a description and amount' }))
    }else {
      this.setState(() => ({ error: '' }));

      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }
  }


  render() {
    return (
      <form
        className="form"
        onSubmit={this.onSubmit}        
      >
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input 
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input 
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={ createdAt => this.setState({ createdAt })} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="create-expense" // PropTypes.string.isRequired,
          numberOfMonths= {1}
          isOutsideRange= {() => false}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    )
  }
}