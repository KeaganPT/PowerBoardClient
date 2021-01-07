import React from 'react'
import ProfileDisplay from './ProfileDisplay/ProfileDisplay'
import Button from '@material-ui/core/Button'

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
    power: powerInterface,
    list: number,
}

class Profile extends React.Component<propTypes, userTypes>{
    constructor(props: propTypes){
        super(props)
        this.state = {
            user: {userName: 'dave'},
            userPowers: [],
            userCharacters: [],
            power: {powerName: '', description: ''},
            list: 0
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
                <div>
                    <Button onClick={() => this.setState({list: 0})}>My Powers</Button>
                    <Button onClick={() => this.setState({list: 1})}>My Characters</Button>
                </div>
                <ProfileDisplay userPowers={this.state.userPowers} userCharacters={this.state.userCharacters} user={this.state.user} viewConductor={this.state.list} />
            </div>
        )
    }
}

export default Profile;