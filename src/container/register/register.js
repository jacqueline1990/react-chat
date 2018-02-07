import React from 'react'
import Logo from '../../components/logo/logo'
import { WhiteSpace, WingBlank, Radio, List, InputItem, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import hyWrapper from '../../components/hyWrapper/hyWrapper'
@hyWrapper
@connect(state=>state.user,{register})
class Register extends React.Component{
    constructor(){
        super(...arguments)
        this.handleRegister = this.handleRegister.bind(this)
       
    }
    handleRegister(){
        this.props.register(this.props.state)
    }
 
    
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    <p className="error_msg">{this.props.msg?this.props.msg:''}</p>
                   
                    <List>
                      <InputItem 
                            placeholder="输入用户名"
                            onChange={(v)=>{
                                this.props.changeV("username",v)

                            }}
                      > 用户名</InputItem>
                      <InputItem 
                            placeholder="输入密码"
                            onChange={(v)=>{
                                this.props.changeV("pwd",v)
                            }}
                      >密码</InputItem>
                      <InputItem 
                            placeholder="再次输入密码"
                            onChange={(v)=>{
                                this.props.changeV("repwd",v)
                            }}>
                      确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <RadioItem 
                         checked={this.props.state.type==='genius'}
                         onClick={()=>{
                            this.props.changeV("type","genius")
                    }}>牛人</RadioItem>
                    <RadioItem 
                         checked={this.props.state.type==='boss'}
                         onClick={()=>{
                            this.props.changeV("type","boss")
                    }}>BOSS</RadioItem>
                    <WhiteSpace/>
                    </WingBlank>
                    <Button type='primary' onClick={this.handleRegister}>注册 </Button>
               
            
            </div>
        )
    }
}
export default Register

