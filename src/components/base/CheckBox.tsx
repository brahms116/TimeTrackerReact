import React from 'react'
import styled from 'styled-components'

const StyledCheckBox = styled.div`
    display:flex;
    align-items:center;
    color:#FBFEFF;
    cursor:pointer;
  
`

const Box = styled.div`
    height:${10/16}rem;
    width:${10/16}rem;
    box-sizing:border-box;
    background:none;
    border: 1px #FBFEFF solid;
`

const FilledBox =styled.div`
    background:#FBFEFF;
`

const Label=styled.div`
    font-weight:500;
    font-size:0.75rem;
    text-transform:uppercase;
    margin-left:0.6rem;
`

interface CheckBoxProps {
  className?:string;
  text:string;
  isTicked:boolean;
}


const CheckBox = (props:CheckBoxProps)=>{
  return(
    <StyledCheckBox className={props.className}>
        {props.isTicked?
        <FilledBox/>:<Box/>
        }
        <Label>{props.text}</Label>
    </StyledCheckBox>
  )
}

export default CheckBox
