import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:9093')
const RECV_MSG = 'RECV_MSG'
const MSG_LIST = 'MSG_LIST'
const CHANGE_READ = 'CHANGE_READ'
const initState = {
    chatList:[],
    users:{},
    unread:0
}
export function chat(state=initState,action){
    switch(action.type){
        case RECV_MSG:
        const num = action.payload.to===action.userid?1:0
        return {...state,chatList:[...state.chatList,action.payload],unread:state.unread+num}
        case MSG_LIST:
        return {...state,chatList:action.payload,users:action.users,unread:action.payload.filter(v=>!v.read&&v.to===action.userid).length}
        case CHANGE_READ:

        const from= action.payload.from
        const readnum = action.payload.readnum
        return {...state,chatList:state.chatList.map(v=>({...v,read:v.from===from?true:v.read})),unread:state.unread-readnum}
        default:
       return state;
    }

}

export function sendMsg({from,to,content}){
    return dispatch=>{
        socket.emit('sendMsg',{from,to,content})
    }
}
function msgRecv(data,userid){
 return { type:RECV_MSG,payload:data,userid}
}
export function recvMsg(){
    return (dispatch,getState)=>{
         socket.on('recvmsg',function(data){
            const userid = getState().user._id
             dispatch(msgRecv(data,userid))
         })
    }
}
function msglist(data,users,userid){
    return {type:MSG_LIST,payload:data,users,userid}
}
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getchatlist').then(res=>{
            if(res.status===200&&res.data.code===0){
                const userid = getState().user._id
                dispatch(msglist(res.data.data,res.data.users,userid))
            }

        })

    }
}
function readChange({from,to,readnum}){
    return {type:CHANGE_READ,payload:{from,to,readnum}}
}
export function changeUnread(from){
    console.log('chat.redux---',from)
    return async(dispatch,getState) => {
        const res = await axios.post('/user/changeRead',{from})
        console.log(res,'-----')
        if(res.status===200&&res.data.code===0){
            const userid = getState().user._id
            dispatch(readChange({from,to:userid,readnum:res.data.num }))
        }
       
    }
}