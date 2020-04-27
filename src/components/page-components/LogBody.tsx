import React,{useState,useContext,useEffect} from 'react'
import styled from 'styled-components'
import BodyHeading from '../base/BodyHeading'
import BodyItem from '../base/BodyItem'
import {firebaseItem} from '../Types'
import {useHistory} from 'react-router-dom'
import {parseDuration} from '../TimeUtils'
import { AuthContext } from '../../Contexts/AuthContext'

const StyledLogBody = styled.div`
    min-width:100%;
    padding: 0 3rem;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
`
interface LogBodyProps {
  className?:string;
}
const LogBody = (props:LogBodyProps)=>{
  const history = useHistory()

  const [logs,setLogs] = useState<firebaseItem[]|undefined>(undefined)
  const authC = useContext(AuthContext)

  const db = authC.state.db
  const uid = authC.state.uid
  const toEntries= <T extends unknown>(id:T)=>{
    history.push(`/entries/${id}`)
  }

  const deleteLog = async <T extends unknown>(id:T)=>{
    try {
      if(db){
       await db.collection('logs').doc(id as string).delete()
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
  useEffect(()=>{

    if(uid && db) 
    {
      const query = db.collection('logs').where("userID","==",uid).orderBy("lastActive",'desc')
        .onSnapshot((querySnapshot)=>{
          let temp:firebaseItem[]= [];
          querySnapshot.forEach((doc)=>{
            //console.log(doc.id)
            temp.push({id:doc.id,data:doc.data()})
          })
          setLogs(temp)
        })
      return ()=>{
        query()
      }
    }
    
  },[])
  
  

  
  
  
  return(
    <StyledLogBody className={props.className}>
        <BodyHeading title="My Logs" subtitle="Last Viewed"/>
        {logs?.map(doc=><BodyItem
          key={doc.id}  
          title={doc.data.name} 
          id={doc.id} 
          subtitle={parseDuration(doc.data.lastActive as string)}
          enterCB={toEntries}
          optionCB={deleteLog}
        />)}
        
       
    </StyledLogBody>
  )
}

export default LogBody
