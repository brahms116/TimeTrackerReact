import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledVerifyEmail = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Text = styled.div`
    color:#FBFEFF;
    font-weight:300;
    font-size:1.25rem;
    text-align:center;
    width:30%;
`

interface VerifyEmailProps {
  className?:string;
}
const VerifyEmail = (props:VerifyEmailProps)=>{
  return(
    <StyledVerifyEmail className={props.className}>
        <Text>A verification link has been sent to your email. When your email is verified, 
          please click here to <Link to="/login">login</Link></Text>
    </StyledVerifyEmail>
  )
}

export default VerifyEmail
