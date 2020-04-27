import React from 'react'
import styled from 'styled-components'
import CheckBox from '../base/CheckBox'

const StyledLoginSettings = styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  
`

const Question = styled.div`
    color:#FBFEFF;
    font-weight:300;
    font-size:1.25rem;
    text-align:center;
    width:30%;
`

const RadioMenu = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:2.4rem;
    width:20%;
`


interface LoginSettingsProps {
  className?:string;
}
const LoginSettings = (props:LoginSettingsProps)=>{
  return(
    <StyledLoginSettings className={props.className}>
        <Question>Would you like us to remember your login details?</Question>
        <RadioMenu>
          <CheckBox isTicked={false} text="yes"/>
          <CheckBox isTicked={false} text="no"/>

        </RadioMenu>
    </StyledLoginSettings>
  )
}

export default LoginSettings
