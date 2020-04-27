import React, {useContext, useEffect,useState, useRef} from 'react'
import styled from 'styled-components'
import BodyHeading from '../base/BodyHeading'
import NavHeader from '../base/NavHeader'
import BodyItem from '../base/BodyItem'
import BottomButton from '../base/BottomButton'
import {useParams, useHistory} from 'react-router-dom'
import {AuthContext} from '../../Contexts/AuthContext'
import {firebaseItem} from '../Types'
import LogEdit from '../page-components/LogEdit'
import {color} from '../Styles'
import {formatSeconds} from '../TimeUtils'
import moment from 'moment'



const StyledEntries = styled.div`
    width:100%;
    min-height:100%;
    padding:0 3rem;
    background: ${color.bg};
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
`

const PosNavHeader = styled(NavHeader)`
    margin-bottom:3.8rem;
`

const Loading = styled.div`
    font-size:1rem;
    color:${color.lightGrey};
    margin-bottom:3.8rem;
    text-align:center;
`

const Entries  =()=>{
    let {id} = useParams()
    const history = useHistory()
    const authC = useContext(AuthContext)
    const db  = authC.state.db
    const [currentLog, setCurrentLog] = useState<firebaseItem|undefined>(undefined)
    const [entries,setEntries] = useState<firebaseItem[]|undefined>([])
    const [fetchSize, setFetchSize]=useState(10)
    const [isMenu,setMenu] = useState(false)
    const [isOnScreen,setOnScreen]=useState(false)
    const [toFetch,setToFetch] = useState(true)
    const fetchIncrease = 10
    

    

    

    const closeMenu = ()=>setMenu(false)
    const openMenu = ()=>setMenu(true)


    
    
    // init fetch log data
    useEffect(()=>{
        if(db){
            const logQuery = db.collection('logs').doc(id).onSnapshot(doc=>{
                if(doc.data()){
                    setCurrentLog({
                        id:doc.id,
                        data:doc.data()!
                    })
                }
            })
            db.collection('logs').doc(id).update({
                lastActive:moment().format()
            })
            return ()=>logQuery()  
        }    
    },[])

    const loadingRef = useRef<HTMLDivElement>(null)

    const options = {
        root:document.getElementById("AppScreen")
    }

    

    const handleObserver =(entries:IntersectionObserverEntry[])=>{
        //console.log(entries[0].isIntersecting)
        if(entries[0].isIntersecting && isOnScreen===false){
            setOnScreen(true)
        }
        else if (!entries[0].isIntersecting && isOnScreen===true){
            setOnScreen(false)
        }
        
    }

    

    const observer = new IntersectionObserver(handleObserver,options)

    //sets up ref for observer
    useEffect(()=>{
        if (loadingRef.current) observer.observe(loadingRef.current)    
    },[])

    //delcaring it here so I can unsubscribe to it to clean up

    

    const fetchCollection = ()=>{
        let entryQuery:()=>void
        //console.log(fetchSize)
        if(db && toFetch){
             entryQuery = db.collection('entries').where('log','==',`/logs/${id}`).orderBy("startTime",'desc').limit(fetchSize)
            .onSnapshot((querySnapsot)=>{
                let temp:firebaseItem[] = [];
                querySnapsot.forEach((doc)=>{
                        temp.push({
                            id:doc.id,
                            data:doc.data()
                        })
                    })
                    setEntries(temp)
                    if (temp.length<fetchSize) setToFetch(false)
                })
                return entryQuery       
            }
    }
    
    


    useEffect(()=>{
        const cleanUp = fetchCollection()!
        
        //if (isOnScreen) setFetchSize(fetchSize=>fetchSize+1) I can't fix it, it'll break if the new Logs 
        //don't push the loading div off the screen
        return ()=>cleanUp()
    },[fetchSize])

    useEffect(()=>{
        if (isOnScreen) setFetchSize(fetchSize=>fetchSize+fetchIncrease)
    },[isOnScreen])


    
    const backToLogs=()=>{
        history.push('/logs')
    }
    



    const deleteEntry = async <T extends unknown>(id:T)=>{
        if(db) await db.collection('entries').doc(id as string).delete()
    }
    return(
        <StyledEntries>
            {isMenu && <LogEdit isRename logName={currentLog?.data.name} togglefunction={closeMenu} logId={currentLog?.id}/>}
            <PosNavHeader>
                <div onClick={backToLogs}>
                    Back
                </div>
            </PosNavHeader>
            <BodyHeading title={currentLog?.data.name} subtitle = "Edit Name" withPointer clickfunction={openMenu}/>
            {entries?.map((doc)=>{
                return (<BodyItem 
                title={formatSeconds(doc.data.duration)}
                subtitle={moment(doc.data.startTime).format('DD/MM hh:mm a')}
                key={doc.id}
                id={doc.id}
                optionCB={deleteEntry}
                />)
            })

            }
            <Loading ref={loadingRef}>{toFetch? "Loading..." : ''}</Loading>
            
            <BottomButton text="Start" 
                clickfunction={()=>{
                    history.push(`/timer/${currentLog?.id}`)                   
                }}/>
        </StyledEntries>
    )
}

export default Entries