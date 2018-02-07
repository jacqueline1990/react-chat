import React from 'react';
import { List,Badge } from 'antd-mobile'
import { connect } from 'react-redux'
import ListItem from '_antd-mobile@2.1.6@antd-mobile/lib/list/ListItem';
@connect(state=>state)

class Msg extends React.Component{

    render(){
       if(!this.props.chat.chatList.length){
           return null;
       }
       const chatlist = this.props.chat.chatList
       const userid = this.props.user._id
       const users = this.props.chat.users
    //   根据chatid分配每组聊天
        let chatCategory={}
        chatlist.map(v=>{
            chatCategory[v.chatid]=chatCategory[v.chatid]||[]
            chatCategory[v.chatid].push(v)
        })
    const chat_list = Object.values(chatCategory).sort(function(a,b){
        return b[b.length-1].create_time-a[a.length-1].create_time
    })
        return (
            <div>
                <List>
                  {chat_list.map(v=>{
                      const targetId = userid === v[0].from ? v[0].to:v[0].from
                      const username = users[targetId].username
                      const unread = v.filter(va=>!va.read&&va.to===userid).length
                      console.log(unread,'???')
                      
                      const avatar = require(`../imgs/${users[targetId].avatar}.jpg`)
                      const lastMsg = v[v.length-1].content
                      return (
                      <List.Item key={v[0]._id} 
                                 thumb={avatar}
                                 onClick={()=>{
                                     this.props.history.push(`/chat/${targetId}`)
                                 }}
                                 extra={<Badge text={unread}></Badge>}
                                   >
                           {username}
                           <List.Item.Brief >
                               {lastMsg}
                           </List.Item.Brief>
                      </List.Item>)

                  })}
                  </List>

            </div>
        )
    }
}
export default Msg

