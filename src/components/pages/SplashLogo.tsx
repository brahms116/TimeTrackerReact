import React,{useEffect} from 'react'
import styled from 'styled-components'
import {animated,useSpring} from 'react-spring'
import {ReactComponent as LogoImg} from '../../resource/LogoSvg.svg'
import {useHistory} from 'react-router-dom'

const PosLogo = styled(LogoImg)`
    margin-top:2rem;
    height:26rem;
    width:26rem;
    position:absolute;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
`


const StyledSplashLogo = styled(animated.div)`
  
`
interface SplashLogoProps {
  className?:string;
}
const SplashLogo = (props:SplashLogoProps)=>{
    

    let history= useHistory()

    const [aprops,set]= useSpring(()=>({
        from:{
            opacity:1
        },
        to:{
            opacity:1
        }
    }))

    const loadSignup =()=>{
        set({
            to:{
                opacity:0
            },
            from:{
                opacity:1
            },           
            config:{
                duration:800
            },
            onRest:()=>{
                history.push('/signup')
            }
        })
    }

    useEffect(()=>{
        setTimeout(loadSignup,1000)        
    },[])

  return(
    <StyledSplashLogo style={aprops} className={props.className} >
        <PosLogo></PosLogo>
    </StyledSplashLogo>
  )
}

export default SplashLogo
