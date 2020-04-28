import {useContext} from 'react'
import * as firebase from 'firebase/app'
import {AuthContext} from '../Contexts/AuthContext'
import {useHistory} from 'react-router-dom'

const useCheckAuth = ()=>{
    const history = useHistory()
    const authC = useContext(AuthContext)
    const user = firebase.auth().currentUser
    if(!user){
        authC.dispatch({type:"LOGOUT"})
        history.push('/signup')
    }
}

export default useCheckAuth