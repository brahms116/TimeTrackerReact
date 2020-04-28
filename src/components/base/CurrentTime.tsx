import React from 'react'
import styled from 'styled-components'
import {color} from '../Styles'
import moment from 'moment'

const StyledCurrentTime = styled.div`
    font-weight:300;
    color:${color.bg};
    display:flex;
    flex-direction:column;
    align-items:center; 
`

const Time=styled.div`
    text-align:center;
    font-size:4rem;
    margin-top:${56/16}rem;    
      
`

const AMPM=styled.div`
    text-transform:uppercase;    
`

const Month=styled.div`
    margin-top:${25/16}rem;
    margin-bottom:${56/16}rem;
`


interface CurrentTimeProps {
  className?:string;
}
const CurrentTime = (props:CurrentTimeProps)=>{
  return(
    <StyledCurrentTime className={props.className}>
        <Time>{moment().format('hh:mm')}</Time>
        <AMPM>{moment().format('a')}</AMPM>
        <Month>{moment().format('Mo MMMM')}</Month>
    </StyledCurrentTime>
  )
}

export default CurrentTime
