import React from 'react'
import ProfileDisplay from './ProfileDisplay/ProfileDisplay'

type propTypes = {
    token: string | null
}

type powerInterface = {
    powerName: string,
    description: string,
}

type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
}

type userTypes = {
    user: {userName: string},
    userPowers: Array<powerInterface>,
    userCharacters: Array<characterInterface>,
    power: powerInterface
}

class Profile extends React.Component<propTypes, userTypes>{
    constructor(props: propTypes){
        super(props)
        this.state = {
            user: {userName: 'dave'},
            userPowers: [],
            userCharacters: [],
            power: {powerName: '', description: ''}
        }
    }

    fetchUser() {
        fetch('http://localhost:3000/user/mine', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                user: data,
                userPowers: data.powers,
                userCharacters: data.characters
            });
            // console.log(data);
        })
    }

    createPower() {
        fetch(`http://localhost:3000/powers/`, {
            method: 'POST',
            body: JSON.stringify ({
                powerName: this.state.power.powerName,
                description: this.state.power.description
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }

    handlePowerSubmit(event: React.MouseEvent) {
        event.preventDefault();
        this.createPower();
    }

    componentDidMount() {
        this.fetchUser()
    }

    render(){
        return(
            <div>
                <ProfileDisplay userPowers={this.state.userPowers} userCharacters={this.state.userCharacters} user={this.state.user}/>
            </div>
        )
    }
}

export default Profile;