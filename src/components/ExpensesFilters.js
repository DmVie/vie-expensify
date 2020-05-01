import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';


class ExpensesFilters extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      focusedInput: null,
    }

    this.onTextChange = this.onTextChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);

  }

  onTextChange(e) {
    const text = e.target.value
    this.props.setTextFilter(text)
  }

  onSortChange(e) {
    const sortBy = e.target.value;
    if(sortBy === 'date') {
      this.props.sortByDate();
    }else if(sortBy === 'amount') {
      this.props.sortByAmount();
    }
  }
  
  onDatesChange({startDate, endDate}) {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate);
  }

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input 
              type="text"
              className="text-input"
              placeholder="Search Expenses"
              value={this.state.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.state.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
              startDateId="filter-start-date" // PropTypes.string.isRequired,
              endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
              endDateId="filter-enddate" // PropTypes.string.isRequired,
              onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTextFilter: (text) => {dispatch(setTextFilter(text))},
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesFilters);