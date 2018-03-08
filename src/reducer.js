import {user} from './redux/user.redux'

// 合并所有的reducer，并且返回
import { combineReducers } from 'redux'

export default combineReducers({user})