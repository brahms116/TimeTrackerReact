import React from 'react'
import styled from 'styled-components'
import {color} from '../Styles'

const StyledBodyHeading = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    width:100%;
    margin-top:${46/16}rem;
    margin-bottom:${49/16}rem;
`

const Title = styled.div`
    color: ${color.darkGrey};
    font-size:1.25rem;
    font-weight:300;
`
const Subtitle =styled.div`
    color:${color.lightGrey};
    font-size:0.75rem;
`
    
const SubWithPointer = styled(Subtitle)`
    cursor:pointer;

`


interface BodyHeadingProps {
  className?:string;
  title:string;
  subtitle:string;
  clickfunction?:()=>void
  withPointer?:boolean
}
const BodyHeading = (props:BodyHeadingProps)=>{
  return(
    <StyledBodyHeading className={props.className}>
        <Title>{props.title}</Title>
        {props.withPointer ?
        <SubWithPointer onClick={props.clickfunction}>{props.subtitle}</SubWithPointer>:
        <Subtitle>{props.subtitle}</Subtitle>     
      }
    </StyledBodyHeading>
  )
}

export default BodyHeading
