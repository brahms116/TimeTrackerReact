import React from 'react'
import styled from 'styled-components'
import {color} from '../Styles'

const StyledTextInput = styled.div`
`

const Label = styled.div`
    font-weight: 500;
    color: ${color.bg};
    font-size: ${12/16}rem;
    line-height: ${15/16}rem;
    text-transform:uppercase;
    margin-bottom:1rem;
`
const Input = styled.input`
    background:none;
    border:none;
    color: ${color.bg};
    border-bottom:1px solid  ${color.bg};
    padding-bottom:0.2rem;
    #FBFEFF;
    width:100%;
    font-size:1rem;
    font-weight:300;
`
const ErrorText = styled.div`
    font-weight:300;
    font-size:0.75rem;
    color:${color.error};
    margin-top:0.5rem;
`


const ColoredLabel = styled(Label)`
    color: ${color.inputColor};
`

const ColoredInput = styled(Input)`
    color:${color.inputColor};
    border-bottom:1px solid ${color.inputColor};
`


interface TextInputProps{
    className?:string,
    text:string,
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    errorMsg:string,
    isPassword?:boolean,
    alt?:boolean
}
const TextInput = (props:TextInputProps)=>{    
    if(props.alt){
        return(
            <StyledTextInput className={props.className}>
                
                <ColoredLabel>{props.text}:</ColoredLabel>
                {props.isPassword?
                    <ColoredInput type="password" onChange={props.handleChange}/>:
                    <ColoredInput onChange={props.handleChange}/>
                }
                
                {props.errorMsg!=="" && <ErrorText>{props.errorMsg}</ErrorText>}
            </StyledTextInput>
        )
    }else{
        return(
            <StyledTextInput className={props.className}>
                
                <Label>{props.text}:</Label>
                {props.isPassword?
                    <Input type="password" onChange={props.handleChange}/>:
                    <Input onChange={props.handleChange}/>
                }
                
                {props.errorMsg!=="" && <ErrorText>{props.errorMsg}</ErrorText>}
            </StyledTextInput>
        )
    }   
}

export default TextInput