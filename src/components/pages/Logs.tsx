import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import CurrentTime from '../base/CurrentTime'
import NavHeader from '../base/NavHeader'
import LogBody from '../page-components/LogBody'
import BottomButton from '../base/BottomButton'
import LogEdit from '../page-components/LogEdit'
import * as  firebase from 'firebase/app'
import {AuthContext} from '../../Contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import {color} from '../Styles'

const StyledLogs = styled.div`
    min-width:100%;
    min-height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    box-sizing:border-box;
    background:  ${color.bg};
    overflow:hidden;
    position:relative;

`
const WelcomeText = styled.div`
    font-size:1.25rem;
    cursor:context-menu !important;
`

const Hero = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background: ${color.primary};
    width:100%;
    padding:0 3rem;
    box-sizing:border-box;
`

const Logs  =()=>{    
    
    const authC = useContext(AuthContext)
    const history = useHistory()


    //menu 
    const [isMenu,setMenu]=useState(false);

    const openMenu= ()=>{
        if(!isMenu){
            setMenu(true)            
        }
    }

    const closeMenu = ()=>{
        if(isMenu){
            setMenu(false)
        }
    }

    //firebase loggout
    const loggout = ()=>{
        authC.dispatch({type:"LOGOUT"})
        history.push('/signup')
    }


    const user = firebase.auth().currentUser
    if(!user){
        loggout()
    }

    const handleLoggoutClick = async()=>{
        await firebase.auth().signOut()
        loggout()
    }

    return(
        <StyledLogs>
            {isMenu && <LogEdit togglefunction={closeMenu}/>}
            <Hero>
                <NavHeader main>
                    <WelcomeText>Hello, David</WelcomeText>
                    <div onClick={handleLoggoutClick}>Logout</div>
                </NavHeader>
                <CurrentTime/>
            </Hero>
            <LogBody/>
            <BottomButton text="ADD" clickfunction={openMenu}/>
        </StyledLogs>
    )
}

export default Logs