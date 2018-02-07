import React from 'react'

class Logo extends React.Component{
    render(){
        return (
            <div id="logo-wrapper">
                <img src={require(`./logo.png`)} alt=""/>
            </div>
        )
    }
}
export default Logo

