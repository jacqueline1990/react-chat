import axios from 'axios'
import { getRedirectTo } from '../utils'
const SUCCESS_AUTH = 'SUCCESS_AUTH'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA ='LOAD_DATA'
const LOGOUT = 'LOGOUT'
const initState = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}
export function user(state=initState,action){
    switch(action.type){
        case SUCCESS_AUTH:
        return {...state,...action.payload,redirectTo:getRedirectTo(action.payload)}
        case ERROR_MSG:
        return {...state,msg:action.msg}
        case LOAD_DATA:
        return {...state,...action.payload}
        case LOGOUT:
        return {...initState,redirectTo:'/login'}
        default:
        return state

    }

}

function errMsg(msg){
    return {type:ERROR_MSG,msg}
}
function success(data){
    return {type:SUCCESS_AUTH,payload:data}
}
export function register(userinfo){
    const {username, pwd, repwd, type} = userinfo;
    if(!username||!pwd||!type){
        return errMsg('信息不能为空')
    }
    if(pwd!==repwd){
        return errMsg('两次密码不一样')
    }
  return dispatch=>{
    axios.post('/user/register',userinfo).then(res=>{
        if(res.status===200&&res.data.code===0){
            
            dispatch(success(res.data.data));
        }else{
            dispatch(errMsg(res.data.msg))
        }
    })
  }
}

export function login(userinfo){
    console.log('--2',userinfo)
    return dispatch=>{
        axios.post('/user/login',userinfo).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(success(res.data.data));
            }else{
                dispatch(errMsg(res.data.msg))
            }
        })
    }
}
export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}
export function update(userinfo){
    return dispatch=>{
        axios.post('/user/update',userinfo).then(res=>{
            if(res.status===200&&res.data.code===0){
                console.log(res,'---update')
                dispatch(success(res.data.data))

            }else{
                dispatch(errMsg(res.data.msg))
            }
        })
    }
}
export function logoutSubmit(){
    return { type:LOGOUT}
}