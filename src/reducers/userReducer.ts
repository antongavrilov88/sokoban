import {Actions} from '../store/actions'

type Nullable<T> = T | null

type UserReducer = {
    user: Nullable<any>
    authStatus: boolean
}

const defaultReducer: UserReducer = {
    user: null,
    authStatus: false
}

export function userReducer(state: UserReducer = defaultReducer,
    action: { type: Actions, payload: any }): UserReducer {
    switch (action.type) {
        case Actions.SIGNUP:
        case Actions.SIGNIN:
            return {
                ...state,
                authStatus: action.payload.status === 200
            }
        case Actions.APPLOAD:
            return {
                ...state,
                user: action.payload.reason ? false : action.payload,
                authStatus: !action.payload.reason
            }
        case Actions.LOGOUT:
            return {
                ...state,
                authStatus: false
            }
        default:
            return state
    }
}
