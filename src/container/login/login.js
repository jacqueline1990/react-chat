import React from 'react'
import Logo from '../../components/logo/logo'
import { WhiteSpace, WingBlank, List, InputItem, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import hyWrapper from '../../components/hyWrapper/hyWrapper'
@hyWrapper
@connect(state=>state.user,{login})
class Login extends React.Component{
    constructor(){
        super(...arguments)
        this.loginHander = this.loginHander.bind(this)
       
    }
    loginHander(){
        this.props.login(this.props.state)
    }
    render(){
        console.log(this.props,'000login')
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
                    </List>
                    <WhiteSpace/>
                 
                    <Button type='primary' onClick={()=>{
                        this.props.history.push('/register');

                    }}>注册 </Button>
                    <WhiteSpace/>
                    <Button type='primary'
                            onClick={this.loginHander}
                            >登录@ </Button>
                    </WingBlank>
                   
            
            </div>
        )
    }
}
export default Login

