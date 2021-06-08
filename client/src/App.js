import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoutes } from './routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FetchedPosts from './components/FetchedPosts'
import PostForm from './components/PostForm'
import Posts from './components/Posts'

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const theme = useSelector((state) => state.app.theme)
  const routes = useRoutes(isAuthenticated)

  if (theme === 'light') {
    document.body.classList.remove('bg-dark')
    document.body.classList.remove('text-light')

    document.body.classList.add('bg-light')
    document.body.classList.add('text-dark')
  } else {
    document.body.classList.remove('bg-light')
    document.body.classList.remove('text-dark')

    document.body.classList.add('bg-dark')
    document.body.classList.add('text-light')
  }

  return (
    <Router>
      <Navbar />
      {routes}
      <Footer />
    </Router>

    // <div className="container pt-3">
    //   <div className="row">
    //     <div className="col">
    //       <PostForm />
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col">
    //       <h2>Синхронные посты</h2>
    //       <Posts />
    //     </div>
    //     <div className="col">
    //       <h2>Асинхронные посты</h2>
    //       <FetchedPosts />
    //     </div>
    //   </div>
    // </div>
  )
}

export default App
