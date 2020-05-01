import React from 'react'

import ExpensesSummary from './ExpensesSummary';
import ExpensesFilters from './ExpensesFilters';
import ExpensesList from './ExpensesList';

const DashboardPage = () => {
  return (
    <div>
       <ExpensesSummary />
       <ExpensesFilters />
       <ExpensesList />
    </div>
  )
}

export default DashboardPage
