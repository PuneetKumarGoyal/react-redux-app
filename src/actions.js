import C from './constants'
import fetch from 'isomorphic-fetch'
import { suggestions } from './store/reducers'

export function addDay(resort, date, powder = false, backCountry = false) {
    return {
        type: C.ADD_DAY,
        payload: { resort, date, powder, backCountry }
    }
}

export const removeDay = function (date) {
    return {
        type: C.REMOVE_DAY,
        payload: date
    }
}

export const setGoal = goal => ({
    type: C.SET_GOAL,
    payload: goal
})

export const addError = message => ({
    type: C.ADD_ERROR,
    payload: message
})

export const clearError = index => ({
    type: C.CLEAR_ERROR,
    payload: index
})

export const changeSuggestion = suggestions => ({
    type: C.CHANGE_SUGGESTIONS,
    payload: suggestions
})

export const clearSuggestions = () => ({
    type: C.CLEAR_SUGGESTIONS
})

export const suggestResortNames = value => dispatch => {
    dispatch({
        type: C.FETCH_RESORT_NAMES
    })

    fetch('http://localhost:3333/resorts/' + value)
        .then(response => response.json())
        .then(suggestions => {
            dispatch({
                type: C.CHANGE_SUGGESTIONS,
                payload: suggestions
            })
        })
        .catch(error => {
            dispatch(
                addError(error.message)
            )
            dispatch({
                type: C.CANCEL_FETCHING
            })
        })
}