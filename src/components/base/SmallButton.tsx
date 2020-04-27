import React from 'react'
import styled from 'styled-components'
import {color} from '../Styles'

const StyledSmallButton = styled.div`
  display:inline-block;
  padding: 0.6rem 1.25rem;
  background:#5AD0D0;
  border-radius:${5/16}rem;
  box-shadow: 0px 20px 20px rgba(137, 137, 137, 0.25);
  color:${color.bg};
  font-size:0.75rem;
  width:auto;
  cursor:pointer;
  text-transform:uppercase;

  &:active{
    box-shadow:none;
    opacity:0.8;
  }
  
`
interface SmallButtonProps {
  className?:string;
  text:string;
  clickfunction?:()=>void
}
const SmallButton = (props:SmallButtonProps)=>{
  return(
    <StyledSmallButton className={props.className} onClick={props.clickfunction}>
        {props.text}
    </StyledSmallButton>
  )
}

export default SmallButton
