import React from 'react'
import { Card, WingBlank, WhiteSpace} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class UserList extends React.Component{
    
    render(){
        const data = this.props.data.userlist
        console.log(data,'~~~~#')
        const Header = Card.Header
        const Body = Card.Body
        return (
            <div>
                <WingBlank>
                {data.map(v=>(
                    <div key={v._id} onClick={()=>{
                        this.props.history.push(`/chat/${v._id}`)
                    }}>
                    <WhiteSpace/> 
                    <Card>
                    <Header title={v.username}
                            thumb={require(`../imgs/${v.avatar}.jpg`)}
                            extra={<span> {v.title}</span>}
                     />
                     <Body>
                        {v.type==='boss'?(<p>公司: {v.company}</p>):''}
                        {v.type==='boss'?(<p>薪资: {v.money}</p>):''}
                        {v.desc.split('\n').map((v,i)=>(
                            <p key={i}>{v}</p>
                        ))}

                     </Body>

                </Card>
                
                </div>
                ))}
                </WingBlank>
                
            </div>
        )
    }
}
export default UserList

