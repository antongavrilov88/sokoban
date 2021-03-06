import {FormFieldPayload, FormAction} from '../../../../types/actionTypes'
import {Actions} from './actions'
import {initialState, State} from './state'

export const reducer = (state: State, action: FormAction): State => {
    switch (action.type) {
        case Actions.SET_FIELD: {
            const {name, field} = action.payload as FormFieldPayload
            return {
                ...state,
                fields:
                {
                    ...state.fields,
                    [String(name)]: field
                }
            }
        }
        case Actions.OPEN_FORM:
            return {...state, open: true}
        case Actions.CLOSE_FORM:
            return {...initialState, open: false}
        default:
            return state
    }
}
