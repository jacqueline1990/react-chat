import React from 'react'
import { connect } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { withRouter} from 'react-router-dom'
@withRouter
@connect(state=>state)
class NavList extends React.Component{
    render(){
        const user = this.props.user
        const listdata = this.props.data.filter(v=>!v.hide)
        const pathname = this.props.location.pathname
        const num = this.props.chat.unread
        return (
            <div style={{position:'fixed',width:'100%',bottom:0}}>
            <TabBar>
                {listdata.map(v=>(
                    <TabBar.Item
                     key={v.path}
                     title={v.text}
                     badge={v.path==='/msg'?num:0}
                     icon={{uri:require(`./img/${v.icon}.png`)}}
                     selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                     selected={pathname === v.path}
                     onPress={()=>{
                         this.props.history.push(v.path)
                     }}
                     >
                     </TabBar.Item>
                ))}

            </TabBar>
            </div>
        )
    }
}
export default NavList

