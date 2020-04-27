import * as validate from 'validate.js'

class Validator { 
    static validateEmail=(email:string)=>{
        const val = validate.single(email,{
            presence:true,
            email:{
                message:"Please enter a valid email"
            }
        })
        return val
    }

    static validatePassword=(password:string)=>{
        const val = validate.single(password,{
            presence:true,
            length:{
                minimum:6,
                message:'Must be at least 6 charachters'
            },
            format:{
                pattern:"[a-zA-Z0-9]+",
                message:'Must not contain symbols or spaces'
            }
        })
        return val
    }

    static validateLogTitle=(title:string)=>{
        const val = validate.single(title,{
            presence:true,
            format:{
                pattern:/[a-zA-Z0-9_-\s]*/,
                message:'Must not contain punctuation or symbols'
            }
        })

        return val
    }
    
}


export default Validator