import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { SendPage } from './pages/SendPage'
import { GroupsPage } from './pages/GroupsPage'
import { HistoryPage } from './pages/HistoryPage'
import { SendersPage } from './pages/SendersPage'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/send">
          <SendPage />
        </Route>
        <Route path="/send/:_id">
          <SendPage />
        </Route>
        <Route path="/groups" exact>
          <GroupsPage />
        </Route>
        <Route path="/history" exact>
          <HistoryPage />
        </Route>
        <Route path="/senders" exact>
          <SendersPage />
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
