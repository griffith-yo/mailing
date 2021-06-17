import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoutes } from './routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToastContainer from './components/ToastContainer'
import Toast from './components/Toast'
// import FetchedPosts from './components/FetchedPosts'
// import PostForm from './components/PostForm'
// import Posts from './components/Posts'

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const theme = useSelector((state) => state.app.theme)
  const routes = useRoutes(isAuthenticated)

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
      <ToastContainer>
        <Toast />
      </ToastContainer>
      <Footer />
    </Router>
  )
}

export default App
