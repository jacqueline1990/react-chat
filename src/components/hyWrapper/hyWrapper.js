import React from 'react';
export default function hyWrapper(Comp){
    return class WrapRL extends React.Component{
        constructor(){
            super(...arguments)
            this.state={}
            this.changeV=this.changeV.bind(this)
        }
        changeV(key,v){
          this.setState({
              [key]:v
          })
        }

        render(){
            return <Comp {...this.props} state={this.state} changeV={this.changeV}/>
        }


     }
}