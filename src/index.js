import C from './constants'
import React from 'React'
import { render } from 'react-dom'
import routes from './routes'
import sampleData from './initialState'
import storeFactory from './store'
import { Provider } from 'react-redux' //This will make state available in all child components
import { addError } from './actions'

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState())

const handleError = (error) => {
    store.dispatch(addError(error.messsage))
}

const store = storeFactory(initialState)
store.subscribe(saveState)

window.React = React
window.store = store

window.addEventListener("error", handleError)

render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById("react-container")
)