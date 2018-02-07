import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { userlist } from './redux/userchat.redux'
import { chat } from './redux/chat.redux'
export default combineReducers({ user, userlist, chat })