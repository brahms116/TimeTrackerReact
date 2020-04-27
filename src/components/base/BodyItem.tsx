import React,{useState,useRef, MouseEvent} from 'react'
import styled from 'styled-components'
import {animated, useSpring} from 'react-spring'
import {useDrag} from 'react-use-gesture'
import useClickOutside from './useClickOutside'
import {color} from '../Styles'

const StyledBodyItem = styled(animated.div)`
  position:relative;
  right:0rem;
  max-width:100%;
  min-width:100%;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  color:${color.lightGrey};
  font-weight:300;
  margin-bottom:${35/16}rem;
  cursor:pointer;
`
const Item =styled.div`
    
    min-width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const ItemTitle =styled.div`
    font-size:1.25rem;

`
const ItemDetail = styled.div`
    font-size:0.75rem;
`

const Option = styled.div`
    color:${color.error};
    text-transform:uppercase;
    font-size:0.75rem;
    margin-left:5rem;
`

interface BodyItemProps {
  className?:string;
  title:string;
  subtitle:string;
  id:string;
  optionCB?:<T>(params?:T)=>void;
  enterCB?:<T>(params?:T)=>void;
}
const BodyItem = (props:BodyItemProps)=>{
   // console.log(props.key)
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen,setOpen] = useState(false)
  const currentFs = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const [{x},set] = useSpring(()=>({x:0}))
  const offset = 7
  const bind= useDrag(({down,movement:[x],tap,event})=>{
    if(!tap){
        if(!isOpen){ 
            if (x<0&&x>(currentFs*-offset)){
                set({x: down? x:0})
            }
            else if (x<0&&down&&x<=(currentFs*-offset)){
                set({x:-offset*currentFs})
                setOpen(true)
            }
        }
        else{
            if(x>0&&down){
                set({x:0})
                setOpen(false)
            }
        }

    }else{
        handleClick(event as MouseEvent)
    }
    
  })

  useClickOutside(ref,()=>{
      if(isOpen){
          set({x:0})
          setOpen(false)
      }
  })
  
  const deleteOption = useRef<HTMLDivElement>(null)
  const handleClick = (e:MouseEvent)=>{
      if(deleteOption){
          if(e.target===deleteOption.current){
              if(props.optionCB) props.optionCB(props.id)
          }
          else{
              
              if(props.enterCB) props.enterCB(props.id)
          }

      }
      
    

  }
  
  return(
    <StyledBodyItem className={props.className} {...bind()} style={{

        transform:x.interpolate((x)=>`translate(${x/16}rem,0)`)
    }} ref={ref}>
        <Item>
            <ItemTitle>
                {props.title}
            </ItemTitle>
            <ItemDetail>
                {props.subtitle}
            </ItemDetail>
        </Item>
        <Option ref={deleteOption}>
            Delete
        </Option>
    </StyledBodyItem>
  )
}

export default BodyItem
