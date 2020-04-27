import React, {useContext,ReactNode} from 'react'
import {AuthContext} from '../../Contexts/AuthContext'
import {Route,Redirect,RouteProps} from 'react-router-dom'

interface PrivateRouteProps extends RouteProps{
    children:ReactNode;
}

const PrivateRoute = ({children,...rest}:PrivateRouteProps)=>{
    const auth = useContext(AuthContext)
    // console.log(auth.state)
    return(
        <Route {...rest} render={()=>auth.state.isAuth?(children):(<Redirect to='/signup'/>)}/>
    )
}

export default PrivateRoute