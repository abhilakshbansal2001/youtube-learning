import React,{createContext, useReducer} from 'react'
import { InitialState, reducer,userReducer } from '../Reducers/Reducer';

export const userContext = React.createContext();

export const UserProvider = (props) => {

    const [state,dispatch] = useReducer(reducer,InitialState)
    const [user,detail] = useReducer(userReducer,InitialState)

    return (
        <userContext.Provider value={[state,dispatch,user,detail]} >
            {props.children}
        </userContext.Provider>
    )
}


