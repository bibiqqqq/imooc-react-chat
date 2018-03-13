import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form'
// function hello () {
//     console.log('hello imooc i love react')
// }
// function WrapperHello(fn){
//     return function () {
//         console.log('before')
//         fn()
//         console.log('after')
//     } 
// }
// hello = WrapperHello(hello)
// hello()

// 属性代理 反向继承

// function WrapperHello(Comp) {
//     class WrapComp extends Comp{
//         componentDidMount() {
//             console.log('hhahahha')
//         }
//         render(){
//             return(<Comp></Comp>)
//         }
//     }

    // class WrapComp extends React.Component {
    //     render() {
    //         return(
    //             <div>
    //                 <p>这是高阶组件特有的元素</p>
    //                 <Comp {...this.props}></Comp>
    //             </div>
    //         )
    //     }
    // }
//     return WrapComp
// }
// @WrapperHello
// class Hello extends React.Component {
//     render() {
//         return <h2>hello imooc i love react</h2>
//     }
// }



@connect(
    state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component{
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register() {
        console.log(this.props)
        this.props.history.push('./register')
    }
    handleLogin() {
        this.props.login(this.props.state)
    }
    render() {
        return(
            <div>
                {/* <Hello /> */}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    <List>
                    {this.props.msg? <p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=> this.props.handleChange('user',v)} >用户</InputItem>
                        <InputItem onChange={v=> this.props.handleChange('pwd',v)} type='password'>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login