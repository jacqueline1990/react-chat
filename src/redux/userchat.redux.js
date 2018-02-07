import axios from 'axios'
const USER_LIST = 'USER_LIST'
const initState={
    userlist:[]
}
export function userlist(state=initState,action){
    switch(action.type){
        case USER_LIST:
        return {...state,userlist:action.payload}
        default:
        return state
    }
}
function list(data){
    return {type:USER_LIST,payload:data}
}
export function getUserList(type){
    return dispatch=>{
        axios.post('/user/userlist',{type}).then(res=>{
            if(res.status===200&&res.data.code===0){
                console.log(res.data.data,'___')
                dispatch(list(res.data.data))
            }
        })
    }
}