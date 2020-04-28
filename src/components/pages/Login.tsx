import React, {useState,ChangeEvent,useContext,useEffect} from 'react'
import styled from 'styled-components'
import TextInput from '../base/TextInput'
import {Link, useHistory} from 'react-router-dom'
import BottomButton from '../base/BottomButton'
import 'firebase/auth'
import * as firebase from 'firebase/app'
import { AuthContext } from '../../Contexts/AuthContext'
import {color} from '../Styles'



const StyledLogin = styled.div`
    min-width:100%;
    min-height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    box-sizing:border-box;
    padding: 0 4rem;
    margin-top:4.2rem;
    
`

const PosTextInput = styled(TextInput)`
    margin-bottom:${54/16}rem
`

const InputArea = styled.div`
    margin-top:${58/16}rem;
    width:100%
`

const Linkline = styled.div`
    font-weight: 500;
    font-size: ${12/16}rem;
    line-height: ${15/16}rem;
    color:  ${color.bg};
    align-self:start;
    margin-bottom:4.5rem;
`

const Underline = styled.span`
    text-decoration:underline;
    cursor:pointer;
`

const Title = styled.div`
    color: #FBFEFF;
    font-size:1.25rem;
    font-weight:300;
    align-self:start;
    
`

const StyledForm = styled.form`
    width:100%;
`


const Login = ()=>{
    const history = useHistory()
    const authC = useContext(AuthContext)

    const [formEmail,setEmail] = useState('')
    const [emailErr,setEmailErr] = useState('')
    
    const [formPassword,setPassword] = useState('')
    const [passwordErr,setPasswordErr] = useState('')

    const emailChange = (event:ChangeEvent<HTMLInputElement>)=>{
        setEmail(event.currentTarget.value)
        setEmailErr('')
    }

    const passwordChange = (event:ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.currentTarget.value)
        setPasswordErr('')
    }
    const handleClick= async()=>{
        const isFormComplete = !! (formPassword && formEmail)
        if(!formPassword){
            setPasswordErr("Required Field")
        }
        if(!formEmail){
            setEmailErr("Required Field")
        }
        if(isFormComplete){
            try {
                await firebase.auth().signInWithEmailAndPassword(formEmail,formPassword)
            } catch (err) {
                console.log(err)
                if(err.code==="auth/invalid-email" || err.code==="auth/user-disabled" || err.code==="auth/user-not-found"){
                    setEmailErr("Incorrect Email")
                }else if (err.code==="auth/wrong-password"){
                    setPasswordErr("Incorrect Password")
                }
            }
        }        
    }
    

    const handleAuthChange = async(user:firebase.User|null)=>{
        console.log(user)
            if(user){
                if(!user.emailVerified){
                    try {
                        await user.sendEmailVerification()
                        await firebase.auth().signOut()
                        history.push('/verify')
                    } catch (err) {
                        console.log(err)
                    }
                }else{
                    if(!authC.state.isAuth){
                        authC.dispatch({type:"LOGIN",uid:user.uid,db:firebase.firestore()})
                        history.push("/logs")
                    }
    
                }
    
            }
            else{
    
            }
    }

    //check firebase login status
    useEffect(()=>{
        const listener = firebase.auth().onAuthStateChanged(handleAuthChange)
        return()=>listener()
    },[])
    return(
        <StyledLogin>
            <StyledForm>
            <Title>Log In</Title>
            <InputArea>
                <PosTextInput errorMsg={emailErr} text='email' handleChange={emailChange}/>
                <PosTextInput  isPassword errorMsg={passwordErr} text='password' handleChange={passwordChange}/>                
            </InputArea>
            <Linkline>Don't Have an Account? <Underline><Link to="/signup">Click here to sign up</Link></Underline></Linkline>
            <BottomButton clickfunction={handleClick} text="GO" variant="Login"/>
            </StyledForm>
        </StyledLogin>
    )
}

export default Login