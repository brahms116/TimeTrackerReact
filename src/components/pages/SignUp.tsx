import React, {useState,ChangeEvent,useContext,useEffect} from 'react'
import styled from 'styled-components'
import TextInput from '../base/TextInput'
import {Link,useHistory} from 'react-router-dom'
import {AuthContext} from '../../Contexts/AuthContext'
import {color} from '../Styles'

import Validator from '../../Validation'
import BottomButton from '../base/BottomButton'


import * as firebase from 'firebase/app'




const StyledSignUp = styled.div`
    min-width:100%;
    min-height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    box-sizing:border-box;
    padding: 0 4rem;
`
const PosTextInput = styled(TextInput)`
    margin-bottom:${54/16}rem
`

const InputArea = styled.div`
    margin-top:4.2rem;
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
    margin-bottom:2.1rem;
`

const Loading = styled.div`
    display:flex;
    height:100%;
    align-items:center;
    color:${color.bg};
    font-size:2rem;
    justify-content:center;
`

interface SignUpProps {
  className?:string;
}

const SignUp = (props:SignUpProps)=>{


   

    
    
    const history = useHistory()
    const authC = useContext(AuthContext)

    //states
    const [isLoading, setLoading] = useState(true)

    const [formEmail,setEmail] = useState('')
    const [emailErr,setEmailErr] = useState('')
    
    const [formPassword,setPassword] = useState('')
    const [passwordErr,setPasswordErr] = useState('')

    const [formConfirmPassword,setConfirmPassword]= useState('')
    const [confirmPasswordErr,setConfirmPasswordErr]= useState('')


    //callback handling input
    const emailChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const email=event.currentTarget.value
        setEmail(email)
        const val = Validator.validateEmail(email)
        if(val){
            setEmailErr(val[0])
        }else{
            setEmailErr('')
        }
    }

    const passwordChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const password = event.currentTarget.value
        setPassword(password)
        const val = Validator.validatePassword(password)
        if(val){
            setPasswordErr(val[0])
        }
        else{
            setPasswordErr('')
            if (formConfirmPassword!==formPassword){
                setConfirmPasswordErr('Passwords do not match')
            }
            else{
                setConfirmPasswordErr('')
            }
        }
    }
    const confirmPasswordChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const confirmPass = event.currentTarget.value
        
        if (confirmPass!==formPassword){
            setConfirmPasswordErr('Passwords do not match')
        }
        else{
            setConfirmPasswordErr('')
        }
        setConfirmPassword(confirmPass)
    }

    


    //Sign Up?
    const handleClick = async()=>{
        const isFormComplete = !! (formPassword && formEmail && formConfirmPassword)
        if(!formPassword){
            setPasswordErr("Required Field")
        }
        if(!formEmail){
            setEmailErr("Required Field")
        }
        if(!formConfirmPassword){
            setConfirmPasswordErr("Required Field")
        }

        const areErrors = !!!(!!!passwordErr && !!!emailErr && !!!confirmPasswordErr)
        if((!areErrors)&&isFormComplete){
            try{
                await firebase.auth().createUserWithEmailAndPassword(formEmail,formPassword)
            }catch(err){
                console.log(err)
                if(err.code==="auth/email-already-in-use"){
                    setEmailErr("Email already in use")
                }
            }
        }    
        
    }


    const handleAuthChange = async(user:firebase.User|null)=>{
        //console.log(user)
        if(user){
            if(!user.emailVerified){
                try {
                    await user.sendEmailVerification()
                    await firebase.auth().signOut()
                    setLoading(false)
                    history.push('/verify')
                } catch (err) {
                    console.log(err)
                }
            }else{
                if(!authC.state.isAuth){
                    authC.dispatch({type:"LOGIN",uid:user.uid,db:firebase.firestore()})
                    setLoading(false)
                    history.push("/logs")
                }

            }

        }else{

            setLoading(false)

        }
    }

    //check firebase login status
    useEffect(()=>{
        const listener = firebase.auth().onAuthStateChanged(handleAuthChange)
        return ()=>listener()
    },[])


    if (!isLoading) return(
    <StyledSignUp className={props.className}>                          
        <InputArea>
            <Title >Sign Up</Title>  
            <PosTextInput errorMsg={emailErr} text='email' handleChange={emailChange}/>
            <PosTextInput isPassword errorMsg={passwordErr} text='password' handleChange={passwordChange}/>
            <PosTextInput isPassword errorMsg={confirmPasswordErr} text='confirm password' handleChange={confirmPasswordChange}/>                
        </InputArea>
        <Linkline>Already have an Account? <Underline><Link to="/login">Click here to log in</Link></Underline></Linkline>
        <BottomButton clickfunction={handleClick} text="GO" variant="Login"/>
    </StyledSignUp>
  )
  else return(
      <Loading>
          Loading...
      </Loading>
  )
}

export default SignUp
