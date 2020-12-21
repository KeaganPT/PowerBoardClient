import React from 'react'

type UserTypes = {
    user : {}
}

class Auth extends React.Component<{}, UserTypes>{
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }

    fetchSignUp = () => {
        fetch('http://localhost:3000/user/register') 
        .then(res => res.json())
        .then(data => { 
            console.log(data)
            this.setState({
                user: data
            });
        })
    }

    fetchLogin = () => {

    }

    handleSubmitRegister = () => {

    }

    handleSubmitLogin = () => {
        
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}

export default Auth