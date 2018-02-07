import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import Navlist from '../navlist/navlist'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Me from '../me/me'
import Msg from '../msg/msg'
import { Route } from 'react-router-dom'
import { recvMsg, getMsgList } from '../../redux/chat.redux'
import { Redirect } from 'react-router-dom'

@connect(state=>state,{recvMsg,getMsgList})

class Info extends React.Component{
   componentDidMount(){
       if(!this.props.chat.chatList.length){
           this.props.recvMsg()
           this.props.getMsgList()
       }
       
   }
    render(){
        const user = this.props.user
        const listData = [
            {
                path:'/boss',
                text:'genius',
                icon:'boss',
                title:'genius列表',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'boss列表',
                component:Genius,
                hide:user.type==='boss'
            },
            {
                path:'/msg',
                text:'msg',
                icon:'msg',
                title:'msg列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'user',
                icon:'user',
                title:'个人信息',
                component:Me,
            }
        ]
        const pathname = this.props.location.pathname
        const path = listData.find(v=>v.path===pathname)
        
        if(!path){
            return null
        }
      
        return (
            <div>
                <NavBar type="dark">{path.title}</NavBar>
                <Route path={path.path} component={path.component} />
                <Navlist data={listData}/>

            </div>
        )
    }
}
export default Info

