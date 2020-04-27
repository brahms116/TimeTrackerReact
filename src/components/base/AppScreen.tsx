import React,{ReactNode} from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import {color} from '../Styles'

const StyledAppScreen = styled(animated.div)`
    width:${800/16}rem;
    background:${color.primary};
    
    height:${736/16}rem;
    border-radius:0.25rem;
    box-shadow: 0px 20px 20px rgba(137, 137, 137, 0.25);
    overflow-x:hidden;
    overflow-y:scroll;
    scrollbar-width:none;
    position:fixed;

    @media(max-width:1400px){
        width:100%;
        height:100%;
        position:fixed;
        box-shadow:none;
        border-radius:0;
        
    }
`

interface AppScreenProps {
    children:ReactNode
}

const AppScreen = (props:AppScreenProps)=>{
    return(
        <StyledAppScreen id="AppScreen">
            {props.children}
        </StyledAppScreen>
    )
}

export default AppScreen