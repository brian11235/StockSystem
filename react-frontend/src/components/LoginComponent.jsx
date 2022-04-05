import React, { Component } from 'react'
import authService from "../services/AuthService";
import userService from "../services/UserService";
class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            user: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.signUpClicked = this.signUpClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        userService.getUserByUserName(this.state.userName, this.state.password)
            .then(res => {
                this.setState({user: res.data})
                if(this.state.userName === this.state.user.userName
                    && this.state.password === this.state.user.password) {
                    this.props.history.push({
                        pathname : `/dashboard/`,
                        user: this.state.user
                    })
                } else {
                    throw "Unable to login"
                }
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    signUpClicked() {
        this.props.history.push("/signUp")
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    User Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} />
                    <br />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    &nbsp;
                    <button className="btn btn-success" onClick={this.signUpClicked}>Sign Up</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent