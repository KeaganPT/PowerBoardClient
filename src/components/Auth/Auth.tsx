import React from 'react'
import { Button } from '@material-ui/core'
import APIURL from '../../helpers/enviorment'

type UserTypes = {
    user: {},
    email: string,
    userNameSignup: string,
    userNameLogin: string,
    passwordSignup: string,
    passwordLogin: string
}

type propTypes = {
    updateToken(newToken: String): void,
    setUser(user: String): void
}

class Auth extends React.Component<propTypes, UserTypes>{
    constructor(props: propTypes) {
        super(props)
        this.state = {
            user: {},
            email: '',
            userNameSignup: '',
            userNameLogin: '',
            passwordSignup: '',
            passwordLogin: ''
        }
      
    }

    fetchSignUp() {
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, userName: this.state.userNameSignup, password: this.state.passwordSignup}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.user.role);
                this.setState({
                    user: data
                });
                this.props.updateToken(data.sessionToken);
                console.log(this.state.user);
            })
            .catch(err => console.log(err))
    }

    fetchLogin = () => {
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({userName: this.state.userNameLogin, password: this.state.passwordLogin}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.user.role);
                console.log('successful fetch');
                this.setState({
                    user: data
                });
                this.props.updateToken(data.sessionToken);
                console.log(this.state.user);
                this.props.setUser(data.user.role);
            })
            .catch(err => console.log(err))
    }

    handleSubmitRegister = (event: React.MouseEvent) => {
        event.preventDefault()
        console.log('helloWorld!')
        this.fetchSignUp();
    }

    handleSubmitLogin = (event: React.MouseEvent) => {
        event.preventDefault()
        console.log('sumbitLogin Success')
        this.fetchLogin()
    }

    render() {
        return (
            <div className="container">
                <form className="signUp" >
                    <div>
                        <label >Email:</label>
                        <input onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email}></input>
                    </div>
                    <div>
                        <label>Username:</label>
                        <input type="text" onChange={(e) => this.setState({ userNameSignup: e.target.value })} value={this.state.userNameSignup}></input>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="text" onChange={(e) => this.setState({ passwordSignup: e.target.value })} value={this.state.passwordSignup}></input>
                    </div>
                    <Button style={{backgroundColor: 'lightGray'}} onClick={(e) => this.handleSubmitRegister(e)}>Sign Up</Button>
                </form>                                           

                <form className="logIn">
                    <div>
                        <label>Username:</label>
                        <input onChange={(e) => this.setState({ userNameLogin: e.target.value })} value={this.state.userNameLogin} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input onChange={(e) => this.setState({ passwordLogin: e.target.value })} value={this.state.passwordLogin} />
                    </div>
                    <Button style={{backgroundColor : 'lightGray'}} onClick={(e) => {return this.handleSubmitLogin(e)}}>Log In</Button>
                </form>
            </div>
        )
    }
}

export default Auth