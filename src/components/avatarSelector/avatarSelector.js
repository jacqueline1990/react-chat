import React from 'react'
import { Grid, WhiteSpace, WingBlank } from 'antd-mobile'
class AvatarSelector extends React.Component{
    constructor(){
        super(...arguments)
        this.state = {
            text:''
        }

    }
 
    render(){
        const avatarInfo = 'a,b,c,d,e,f,g,h,i,j,k,l'.split(',').map(v=>{
            return {
                    icon:require(`../imgs/${v}.jpg`),
                    text:v
                }
        })

        return (
            <div>
                <WingBlank>
                    {this.state.text? <div><span>已经选择头像:</span><img style={{width:40,height:40,verticalAlign:'middle'}} src={require(`../imgs/${this.state.text}.jpg`)}/> </div> :<span>尚未选择头像</span>}
                    <Grid data={avatarInfo}
                          onClick={(obj)=>{
                            //   this.setAva()
                            this.props.avatarState(obj.text)
                            this.setState({text:obj.text})
                          }}></Grid>
                </WingBlank>
            </div>
        )
    }
}
export default AvatarSelector

