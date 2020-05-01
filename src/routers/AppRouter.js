import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AddExpensesPage from '../components/AddExpensesPage';
import DashboardPage from '../components/DashboardPage';
import EditExpensesPage from '../components/EditExpensesPage';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'
import PageNotFound from '../components/PageNotFound';

export const history = createBrowserHistory();

const AppRouter = () => {

  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/create" component={AddExpensesPage} />
        <PrivateRoute path="/edit/:id" component={EditExpensesPage} />
        <Route component={PageNotFound} />
        <Footer />
      </Switch>
    </Router>
  )
}

export default AppRouter
