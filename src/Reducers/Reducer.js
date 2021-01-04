export const InitialState = 'NULL';


export const reducer = (state,action) => {

    if(action.type === 'USER'){
        return action.payload
    }
    else if(action.type === 'UPDATE'){
        return {
            ...state,
            subscribe : action.payload.subscription,
        }
    }
    else if(action.type === 'CLEAR' ){
        return InitialState
    }

    return state
}
export const userReducer = (state,action) => {

    if(action.type === 'USER'){
        return action.payload
    }
    else if(action.type === 'UPDATE'){
        return {
            ...state,
            subscribe : action.payload.subscription,
        }
    }
    else if(action.type === 'CLEAR' ){
        return InitialState
    }

    return state
}