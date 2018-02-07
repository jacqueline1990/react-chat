import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../redux/user.redux'
import { connect } from 'react-redux'
@connect(state=>state.user,{loadData})
@withRouter
class AuthRoute extends React.Component{
    componentDidMount(){
        const pathname = this.props.location.pathname
        const pathInfo = ['/login','/register'];
        if(pathInfo.indexOf(pathname)>-1){
            return null
        }
        console.log('22==')
        axios.get('/user/info').then(res=>{
            console.log(res,'into---')
                if(res.status===200&&res.data.code===0){
                    //有登陆信息
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/login')

                }
        })

    }
    render(){
        return null
    }
}
export default AuthRoute

