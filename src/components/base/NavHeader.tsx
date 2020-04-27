import React from 'react'
import styled from 'styled-components'
import {color} from '../Styles'

const StyledNavHeader = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    margin-top:${52/16}rem;    
    font-size:1rem;
    font-weight:300;

    & > div{
        cursor:pointer;
    }
`

const MainHeader = styled(StyledNavHeader)`
    color:${color.bg}
`
const NormalHeader = styled(StyledNavHeader)`
    color:${color.lightGrey}
`

interface NavHeaderProps {
    className?:string;
    children:React.ReactNode;
    main?:boolean;
}
const NavHeader = (props:NavHeaderProps)=>{
    if (props.main)return(
        <MainHeader className={props.className}>
            {props.children}
        </MainHeader>
    )
    else
    return(
        <NormalHeader className={props.className}>
            {props.children}
        </NormalHeader>
    ) 
}

export default NavHeader
