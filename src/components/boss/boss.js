import React from 'react'
import UserList from '../userlist/userlist'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/userchat.redux'
@connect(state=>state,{getUserList})
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList('genius');
    }
    render(){
        return (
            <UserList data={this.props.userlist}/>
        )
    }
}
export default Boss

