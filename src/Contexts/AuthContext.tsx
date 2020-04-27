import * as firebase from 'firebase/app'
import React, { Dispatch, createContext, useReducer } from 'react'

type IActions ={
    type:'LOGIN',
    db:firebase.firestore.Firestore,
    uid:string

}|{
    type:'LOGOUT'
}

interface IState{
    isAuth:boolean,
    uid:string | null,
    db:firebase.firestore.Firestore | null
    
}

interface IContextProps{
    state:IState,
    dispatch:Dispatch<IActions>
}

const reducer = (state:IState,actions:IActions)=>{
    switch(actions.type){
        case 'LOGIN':
            return {
                db:actions.db,
                uid:actions.uid,
                isAuth:true
            }
        case 'LOGOUT':
            return {
                db:null,
                uid:null,
                isAuth:false
            }
        default:
            return state

    }
}

const inital ={
    isAuth:false,
    uid:null,
    db:null
    
}

export const AuthContext = createContext({} as IContextProps)

interface ProviderProps {
    children:React.ReactNode,

}

const AuthContextProvider = (props:ProviderProps)=>{
    const [state,dispatch] = useReducer(reducer,inital)
    return(
        <AuthContext.Provider value={{state,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider