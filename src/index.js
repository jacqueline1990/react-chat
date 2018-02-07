import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import thunk from 'redux-thunk'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Info from './components/Infos/info'
import Chat from './components/chat/chat'
import './config'
import './index.css'

const store = createStore(reducer,
    compose(applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension():f=>f))
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
renderMethod(
<Provider store={store}>

   <BrowserRouter>
     <div>
     <AuthRoute></AuthRoute>
     <Switch>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/bossinfo' component={BossInfo}></Route>
      <Route path='/geniusinfo' component={GeniusInfo}></Route>
      <Route path='/chat/:id' component={Chat}></Route>
      <Route  component={Info}></Route>
     </Switch>
     </div>
   </BrowserRouter>
</Provider>, 
document.getElementById('root'))

