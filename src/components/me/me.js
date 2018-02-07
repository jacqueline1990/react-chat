import React from 'react'
import { Result, List, WhiteSpace, WingBlank, Modal} from 'antd-mobile'
import { connect } from 'react-redux'
import cookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { logoutSubmit } from '../../redux/user.redux'
@connect(state=>state,{logoutSubmit})
class Me extends React.Component{
    constructor(){
        super(...arguments)
        this.logout=this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert
        alert('退出', '确认退出吗???', [
            { text: '取消'},
            { text: '确认', onPress: () => {
                cookie.erase('userid')
                this.props.logoutSubmit()
            }},
          ])

    }
    render(){
        
        const user = this.props.user
       
        return user.username?(
            <div>
                <Result img={<img style={{width:80,height:80,borderRadius:'50%'}} src={require(`../imgs/${user.avatar}.jpg`)}/>}
                         title={<p style={{marginTop:30}}>{user.username}</p>}
                          />
                <WingBlank>
                    <List renderHeader={()=>'简介'}>
                       <List.Item>
                           {user.title}
                           
                               {user.desc.split('\n').map((v,i)=>(
                                   <List.Item.Brief key={i}>
                                      {v}
                                   </List.Item.Brief>
                               ))}
                           
                       </List.Item>
                       <List.Item onClick={this.logout}>
                           退出登录
                       </List.Item>

                    </List>
                </WingBlank>
            </div>
        ):<Redirect to={user.redirectTo}/>
    }
}
export default Me

