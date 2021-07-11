import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk' // Middleware для асинхронных операций
import App from './App'
import { rootReducer } from './redux/rootReducer'
import 'bootstrap/dist/js/bootstrap.bundle'
import './styles/styles.scss'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))
