import React,{useState,useContext,useEffect} from 'react'
import styled from 'styled-components'
import NavHeader from '../base/NavHeader'
import BottomButton from '../base/BottomButton'
import {useHistory,useParams} from 'react-router-dom'
import moment from "moment"
import { AuthContext } from '../../Contexts/AuthContext'
import {color} from '../Styles'
import {formatSeconds} from '../TimeUtils'
import useCheckAuth from '../useCheckAuth'




const StyledTimer = styled.div`
    width:100%;
    min-height:100%;
    padding:0 3rem;
    background:  ${color.bg};
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;

`

const Time = styled.div`
    margin-top:35%;
    color:  ${color.darkGrey};
    font-size:4rem;
    font-weight:300;

`


const Timer  =()=>{

    useCheckAuth()


    const history = useHistory()
    const {id} = useParams()
    const [startTime,setStart] = useState<moment.Moment|undefined>(undefined)
    const [seconds,setSeconds] = useState(0)
    const authC = useContext(AuthContext)
    const db = authC.state.db!

    const toEntries = ()=>{
        history.push(`/entries/${id}`)
    }

    

    useEffect(()=>{
        setStart(moment)
        const interval = setInterval(updateTime,1000)
        return ()=>clearInterval(interval)
    },[])
    

    const updateTime = ()=>{
        setSeconds(moment.duration(moment().diff(startTime)).asSeconds())
    }
   
    const handleSubmit = async()=>{
        try {
            await db.collection('entries').add({
                startTime:startTime?.format(),
                duration:seconds,
                log:`/logs/${id}`
            })
            toEntries()
        } catch (error) {
            console.log(error)
        }
        

    }
   



    return(
        <StyledTimer>
            <NavHeader>
                <div onClick={toEntries}>
                    Cancel
                </div>
            </NavHeader>
            <Time>{formatSeconds(seconds)}</Time>
            <BottomButton text="stop" variant="Timer" clickfunction={handleSubmit}/>
        </StyledTimer>
    )
}

export default Timer