import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import SendPage from './pages/SendPage'
import GroupsPage from './pages/GroupsPage'
import ReportsPage from './pages/ReportsPage'
import HistoryPage from './pages/HistoryPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/send" exact>
          <SendPage />
        </Route>
        <Route path="/groups" exact>
          <GroupsPage />
        </Route>
        <Route path="/reports" exact>
          <ReportsPage />
        </Route>
        <Route path="/history" exact>
          <HistoryPage />
        </Route>
        <Redirect to="/send" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
