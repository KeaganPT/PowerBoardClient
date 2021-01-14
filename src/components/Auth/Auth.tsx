import React from 'react'
import { Button } from '@material-ui/core'
import APIURL from '../../helpers/enviorment'
import './Auth.css'
import { Alert } from '@material-ui/lab';

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
            body: JSON.stringify({ email: this.state.email, userName: this.state.userNameSignup, password: this.state.passwordSignup }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('fetchSuccess');
                this.setState({
                    user: data
                });
                this.props.updateToken(data.sessionToken);
                // console.log(this.state.user);
            })
            .catch(err => console.log(err))
    }

    fetchLogin = () => {
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ userName: this.state.userNameLogin, password: this.state.passwordLogin }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.user);
                console.log('successful fetch');
                this.setState({
                    user: data
                });
                this.props.updateToken(data.sessionToken);
                this.props.setUser(data.user.role);
                
            })
            .catch(err => {
                console.log('error:', err);
                //make a state change for local storage for login success and failure?
            })
    }

    handleSubmitRegister = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        console.log('helloWorld!')
        this.fetchSignUp();
    }

    handleSubmitLogin = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        console.log('sumbitLogin Success')
        this.fetchLogin()
    }

    render() {
        return (
            <div className="container">
                <div className="introSpeech">
                    <h3>
                        Hello and Welcome.
                        <br />
                        This is a site for those who are looking for ideas for
                        <br></br>
                        creative characters and super powers for stories or table top rpgs.
                        <br />
                        Please feel free to look at the powers and characters without signing up
                        <br />
                        but if you want to create one you will need to sign up or log in.
                        <br />
                        <br />
                        Thank you for checking this place out!
                    </h3>
                </div>
                <div className="authContainer">
                    <form className="signUp" >
                        <div>
                            <h2>Sign Up</h2>
                            <label >Email:</label>
                            <br />
                            <input onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email}></input>
                            <br />
                        </div>
                        <div>
                            <label>Username:</label>
                            <br />
                            <input type="text" onChange={(e) => this.setState({ userNameSignup: e.target.value })} value={this.state.userNameSignup}></input>
                            <br />
                        </div>
                        <div>
                            <label>Password:</label>
                            <br />
                            <input type="text" onChange={(e) => this.setState({ passwordSignup: e.target.value })} value={this.state.passwordSignup}></input>
                            <br />
                        </div>
                        <br />
                        <Button style={{ backgroundColor: 'lightGray' }} onClick={(e) => this.handleSubmitRegister(e)}>Submit</Button>
                    </form>



                    <form className="logIn">
                        <div>
                            <h2>Login</h2>
                            <label>Username:</label>
                            <br />
                            <input onChange={(e) => this.setState({ userNameLogin: e.target.value })} value={this.state.userNameLogin} />
                            <br />
                        </div>
                        <div>
                            <label>Password:</label>
                            <br />
                            <input onChange={(e) => this.setState({ passwordLogin: e.target.value })} value={this.state.passwordLogin} />
                            <br />
                        </div>
                        <br />
                        <Button style={{ backgroundColor: 'lightGray' }} onClick={(e) => { return this.handleSubmitLogin(e) }}>Submit</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth