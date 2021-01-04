import React from 'react'

type propTypes = {
    token: string
}

type userTypes = {
    user: Array<any>
}

class Profile extends React.Component<propTypes, userTypes>{
    constructor(props: any){
        super(props)
        this.state = {
            user: []
        }
    }

    fetchUser() {
        fetch('http://localhost:3000/user/mine', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                user: data
            });
            console.log(data);
        })
    }

    componentDidMount() {
        this.fetchUser()
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default Profile;