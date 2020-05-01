export default (expenses) => {
  return expenses
    .map(expense =>  expense.amount)
    .reduce((sum, el) => sum + el, 0)
}