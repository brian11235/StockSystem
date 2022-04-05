import React, {Component} from 'react'
import userService from "../services/UserService";

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fullName: '',
            userName: '',
            password: '',
            email: ''
        }
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    componentDidMount() {

        // if (this.state.id === '_add') {
        //     return
        // } else {
        //     // EmployeeService.getEmployeeById(this.state.id).then((res) => {
        //     //     let employee = res.data;
        //     //     this.setState({
        //     //         firstName: employee.firstName,
        //     //         lastName: employee.lastName,
        //     //         emailId: employee.emailId
        //     //     });
        //     // });
        // }
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {
            fullName: this.state.fullName,
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email
        }
        userService.createUser(user).then(() => {
            this.props.history.push('/')
        });
    }

    changeFullNameHandler = (event) => {
        this.setState({fullName: event.target.value});
    }

    changeUserNameHandler = (event) => {
        this.setState({userName: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    cancel() {
        this.props.history.push('/');
    }

    getTitle() {
        return <h3 className="text-center">Create User</h3>
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Full Name: </label>
                                        <input placeholder="Full Name" name="fullName" className="form-control"
                                               value={this.state.fullName} onChange={this.changeFullNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> User Name: </label>
                                        <input placeholder="User Name" name="userName" className="form-control"
                                               value={this.state.userName} onChange={this.changeUserNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control"
                                               value={this.state.password} onChange={this.changePasswordHandler}
                                               type="password"/>
                                    </div>
                                    <div className="form-group">
                                        <label> Email: </label>
                                        <input placeholder="Email" name="email" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveUser}>Save
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateUserComponent
