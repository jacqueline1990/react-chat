import React from 'react';
import { NavBar, InputItem, Icon, List, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, recvMsg, getMsgList, changeUnread } from '../../redux/chat.redux'
import { getChatId } from '../../utils'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')
@connect(state=>state,{sendMsg,recvMsg,getMsgList,changeUnread})
class Chat extends React.Component{
    constructor(){
        super(...arguments)
        this.state={
            text:''
        }
        this.sendMsg=this.sendMsg.bind(this)
    }
    componentDidMount(){
        
        
        if(!this.props.chat.chatList.length){ 
            this.props.recvMsg()
            this.props.getMsgList()
        }
       
    }
    componentWillUnmount(){
        const from = this.props.match.params.id;
        this.props.changeUnread(from)
    }
    sendMsg(){
        const from =this.props.user._id
        const to = this.props.match.params.id
        const content = this.state.text
        if(!content){
            Toast.info('输入不可为空');
            return null
        }
        this.props.sendMsg({from,to,content})
        this.setState({text:''})
    }
    render(){
        let chatlist = this.props.chat.chatList
        const from =this.props.user._id
        const to = this.props.match.params.id
        const chatid= getChatId(from,to)
        const chat = chatlist.filter(v=>v.chatid===chatid)
        const users = this.props.chat.users;
        if(!users[to]){
            return null
        }
        return (
            <div id="chat-page">
                <NavBar type="dark"
                	icon={<Icon type="left" />}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>
                 {users[to].username}
                </NavBar>
                <List>
                    {chat.map(v=>{
                        const avatar = require(`../imgs/${users[v.from].avatar}.jpg`)
                       return v.from===from?(
                            <List.Item 
                                   className="chat-me"
                                   key={v._id}
                                   extra={<img src={avatar} alt="" />}
                                   >
                                   {v.content}
                            {/* 放在右边 */}

                            </List.Item>

                        ):(
                            <List.Item key={v._id}
                                       thumb={avatar}
                             >{v.content}</List.Item>
                        )

                    })}
                </List>
                <List style={{position:'fixed',bottom:0,width:'100%'}}>
                <InputItem 
                       placeholder="请输入"
                       value={this.state.text}
                       onChange={(e)=>{
                           this.setState({text:e})
                       }}
                       extra={<span onClick={
                           this.sendMsg
                       }>发送</span>}>
                </InputItem>
                </List>
            </div>
        )
    }
}
export default Chat

