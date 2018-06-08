import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { login, logout } from './actions/auth'
import AppRouter, { history } from './routers/AppRouter'
import configStore from './store/configStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'


const store = configStore()

const hoc = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(hoc, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<LoadingPage/>, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user) { // logged in
        store.dispatch(login(user.uid))
        renderApp()
        if (history.location.pathname === '/') {
            history.push('/dashboard')
        }
    } else { // logged out
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})

