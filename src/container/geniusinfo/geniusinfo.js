import React from 'react'
import { NavBar } from 'antd-mobile'
import { WingBlank, WhiteSpace, InputItem, Button, TextareaItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import AvatarSelector from '../../components/avatarSelector/avatarSelector'
@connect(state=>state.user,{update})
class GeniusInfo extends React.Component{
    constructor(){
        super(...arguments)
        this.choseAvatar=this.choseAvatar.bind(this)
        this.state={
            avatar:'',
            title:'',
            desc:''
        }
        this.saveInfo = this.saveInfo.bind(this);
    }
    choseAvatar(text){
        this.setState({avatar:text})
    }
    saveInfo(){
        this.props.update(this.state);

    }
    changeState(key,v){
        this.setState({
            [key]:v
        })
    }
    render(){
        const pathname = this.props.match.path;
        return (
            <div>
                 {this.props.redirectTo&&this.props.redirectTo!==pathname?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar type="dark">Genius信息</NavBar>
                <AvatarSelector avatarState={this.choseAvatar}/>
                <WingBlank>
                    <WhiteSpace/>
                    <InputItem onChange={(e)=>{
                        this.changeState('title',e)
                    }}>求职岗位</InputItem>
                    <TextareaItem title="要求" 
                                  rows={4} 
                                  onChange={(e)=>{
                                      this.changeState('desc',e)
                                  }}
                    />
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.saveInfo}>保存</Button>
                </WingBlank>

            </div>
        )
    }
}
export default GeniusInfo

