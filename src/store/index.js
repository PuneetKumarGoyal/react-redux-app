import C from './../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessage = store => next => action => {

    let result

    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log('ski days', store.getState().allSkiDays.length)
    result = next(action)

    let { allSkiDays, goal, errors, resortNames } = store.getState()

    console.log(`
    
        ski Days: ${allSkiDays.length}
        goad: ${goal},
        fetching: ${resortNames.fetching},
        suggestions: ${resortNames.suggestions},
        errors: ${errors.length}

    `)

    console.groupEnd()
    return result
}

export default (initialState = {}) => {
    return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}