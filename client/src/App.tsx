import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoutes } from './routes'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { IRootState } from './interfaces/reducer.interface'

const App: FC = () => {
  const isAuthenticated: boolean = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  )
  const theme: string = useSelector((state: IRootState) => state.app.theme)
  const routes: JSX.Element = useRoutes(isAuthenticated)

  if (theme === 'light') {
    document.body.classList.remove('bg-dark', 'text-light')
    document.body.classList.add('bg-light', 'text-dark')
  } else {
    document.body.classList.remove('bg-light', 'text-dark')
    document.body.classList.add('bg-dark', 'text-light')
  }

  return (
    <Router>
      <Navbar />
      {routes}
      <Footer />
    </Router>
  )
}

export default App
