import React from 'react'
import styled from 'styled-components'
import {color} from '../Styles'

const StyledBottomButton = styled.div`
    box-shadow: 0 ${20/16}rem ${20/16}rem rgba(137, 137, 137, 0.25);
    min-height:${103/16}rem;
    min-width:${103/16}rem;
    border-radius:500rem;
    text-transform:uppercase;
    text-align:center;
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    left:50%;
    transform:translateX(-50%);
    top:80%;
    cursor:pointer;

    @media(min-width:1400px){
        top:38rem
      }

    &:active{
        box-shadow:none;
        opacity:0.8;
    }
`

const NormalButton = styled(StyledBottomButton)`
    color:${color.bg};
    background:${color.primary}
`
const LoginButton = styled(StyledBottomButton)`
    color:${color.primary};
    background:${color.bg}
`

const TimerButton = styled(StyledBottomButton)`
    color:${color.bg};
    background:${color.secondary}
`

interface ButtonProps{
    text:string;
    variant?:"Login"|"Timer"
    clickfunction?:()=>void
}

const BottomButton = (props:ButtonProps)=>{    
    // if (!props.variant) return(        
    //     <NormalButton onClick={props.clickfunction}>
    //         <div>
    //         {props.text}
    //         </div>
    //     </NormalButton>        
    // )
    if (props.variant==="Timer") return(        
        <TimerButton onClick={props.clickfunction}>
            <div>
            {props.text}
            </div>
        </TimerButton>        
    )
    else if (props.variant==="Login") return(        
        <LoginButton onClick={props.clickfunction}>
            <div>
            {props.text}
            </div>
        </LoginButton>        
    )
    else return(        
            <NormalButton onClick={props.clickfunction}>
                <div>
                    {props.text}
                </div>
            </NormalButton>        
        )
}

export default BottomButton