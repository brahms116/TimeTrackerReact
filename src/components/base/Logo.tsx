import React from 'react'
import styled from 'styled-components'

const StyledLogo = styled.div`
    text-align:center;
    letter-spacing: 0.02em;
    color: #FBFEFF;
    line-height: ${75/16}rem;
    font-weight: 300;
    font-size:3rem;
    margin-top:4rem;
`

const Logo = ()=>{
    return(
        <StyledLogo>
            Time<br/>
            Tracker
        </StyledLogo>
    )
}

export default Logo