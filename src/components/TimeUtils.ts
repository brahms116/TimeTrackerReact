import moment from 'moment'

const parseDuration = (date:string):string=>{
    let inputDate = moment(date)
    let diff = moment.duration(moment().diff(inputDate)).asHours()
    if (!diff){
      return ''
    }else if(diff<24){
      if( moment().format('a')===inputDate.format('a')&& moment().date()!==inputDate.date()){
        return `Yesterday ${inputDate.format('h:m a')}`  
      }
      else{
        return inputDate.format('h:m a')
      }      

    }else if(diff<144){
      return inputDate.format('dddd')
    }
    return inputDate.format('MMM Do')
  }


const formatSeconds = (timeInSeconds:number)=>{
    let time = [''];
    time[0] = (timeInSeconds%60).toString()
    time[1] = Math.floor((timeInSeconds%3600)/60).toString()
    time[2] = Math.floor(timeInSeconds/3600).toString()
    //console.log(time[0].length)
    let formatted = time.map(doc=>doc.length===1? `0${doc}` : doc)
    return `${formatted[2]}:${formatted[1]}:${formatted[0]}`
}

export  {formatSeconds,parseDuration}