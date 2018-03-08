import axios from 'axios'
import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
}
const LOAD_DATA= 'LOAD_DATA'

export function user(state=initState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '',redirectTo:getRedirectPath(action.payload),isAuth: true, ...action.payload}
        case LOGIN_SUCCESS:
            return {...state, msg: '',redirectTo:getRedirectPath(action.payload),isAuth: true, ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}
function registerSuccess(data) {
    return {type:REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
  }

function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data}
  }
export function userinfo() {
    return dispatch=> {
        // 获取用户信息
        axios.get('/user/info')
        .then(res=>{
            if(res.status === 200) {
                if(res.data.code === 0) {
                    // 有登录信息的
                } else {
                    this.props.history.push('/login')
                }
            }
        })
        // 是否登录
        // 现在的url地址 login是不需要跳转的
        

        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息 （选择头像 个人简介）
    }
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload:userinfo}
}

export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('用户密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
        .then(res=>{
            if(res.status==200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data))
            }else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
  }


export function register({user, pwd, type, repeatpwd}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入')
    }
    if(pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不通')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
        .then(res=>{
            if(res.status==200 && res.data.code === 0) {
                dispatch(registerSuccess({user,pwd,type}))
            }else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}