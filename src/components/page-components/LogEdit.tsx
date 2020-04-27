import React,{useState, ChangeEvent,useRef, useContext} from 'react'
import styled from 'styled-components'
import BodyHeading from '../base/BodyHeading'
import TextInput from '../base/TextInput'
import SmallButton from '../base/SmallButton'
import useClickOutside from '../base/useClickOutside'
import Validator from '../../Validation'
import { AuthContext } from '../../Contexts/AuthContext'
import {color} from '../Styles'
import moment from 'moment'

const PosTextInput = styled(TextInput)`
  margin-bottom:1.7rem;
`

const PosSmallButton = styled(SmallButton)`
  margin-bottom:3rem;
`

const StyledLogEdit = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  background: rgba(26, 25, 25, 0.87);
  z-index:1;
  display:flex;
  flex-direction:column-reverse;

  @media(min-width:1400px){
    width:${800/16}rem;
    height:${736/16}rem;
  }

`
const StyledCard = styled.div`
    width:100%;
    background:  ${color.bg};
    height:auto;
    padding: 0 3rem;
    box-sizing:border-box;

`
interface LogEditProps {
  className?:string;
  togglefunction:()=>void;
  isRename?:boolean;
  logName?:string;
  logId?:string;
}
const LogEdit = (props:LogEditProps)=>{

  const authC = useContext(AuthContext)
  const db = authC.state.db!
  const userID = authC.state.uid

  const [formTitle,setTitle] = useState('')
  const [titleErr,setTitleErr] = useState('')

  const onChangeTitle = (event:ChangeEvent<HTMLInputElement>)=>{
    const val =  Validator.validateLogTitle(formTitle)
    if(val){
      setTitleErr(val[0])
    }else{
      setTitleErr('')
    }
    setTitle(event.currentTarget.value)
  }
  
  const handleClick = async()=>{
    if(formTitle===''){
      setTitleErr('Cannot be Blank')
    }else if(titleErr==='' && db && userID){
      if(!props.isRename){
        try {
          await db.collection('logs').add({
            name:formTitle,
            userID,
            lastActive:moment().format()
          })
          setTitle('')
          props.togglefunction()
        } catch (error) {
          console.log(error)
        }
      }
      else{
        try {
          await db.collection('logs').doc(props.logId).update({
            name:formTitle
          })
          setTitle('')
          props.togglefunction()
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  //close menu
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref,props.togglefunction)

  return(
    <StyledLogEdit className={props.className}>
        <StyledCard ref={ref}>
            <BodyHeading title={props.isRename? `Edit ${props.logName}`:"Create New Log"} 
              withPointer 
              subtitle="Cancel" 
              clickfunction={props.togglefunction}
            />
            <PosTextInput alt text="Title" errorMsg={titleErr} handleChange={onChangeTitle}/>
            <PosSmallButton text={props.isRename? "Rename":"Create"} clickfunction={handleClick}/>
        </StyledCard>
    </StyledLogEdit>
  )
}

export default LogEdit
