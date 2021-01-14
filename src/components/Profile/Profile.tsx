import React from 'react'
import ProfileDisplay from './ProfileDisplay/ProfileDisplay'
import Button from '@material-ui/core/Button'
import CreatePower from './CreateUpdateDelete/CreatePower'
import CreateCharacter from './CreateUpdateDelete/CreateCharacter'
import APIURL from '../../helpers/enviorment'

//Prop Types
type propTypes = {
    token: string | null
}

//Power and character types
type powerInterface = {
    powerName: string,
    description: string,
    id: number
    updatedAt: Date
}

type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
    id: number
    updatedAt: Date
}

// User types
type userTypes = {
    user: {userName: string},
    userPowers: Array<powerInterface>,
    userCharacters: Array<characterInterface>,
    list: number,
}

class Profile extends React.Component<propTypes, userTypes>{
    constructor(props: propTypes){
        super(props)
        this.state = {
            user: {userName: 'dave'},
            userPowers: [],
            userCharacters: [],
            list: 0,
        }
    }

    //Fetch User request
    fetchUser() {
        fetch(`${APIURL}/user/mine`, {
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
            // console.log(this.props.token);
        })
    }

    //DeletePowerFetch
    deletePower(id: number, token: string ){
        fetch(`${APIURL}/powers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        .catch(err => console.log(err))
    }

    //DeleteCharacterFetch
    deleteCharacter(id: number, token: string) {
        fetch(`${APIURL}/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        .catch(err => console.log(err))
    }

    //auto runs fetch user
    componentDidMount() {
        this.fetchUser()
    }

    render(){
        

        return(
            <div>
                <div className="ModalsDiv">
                    <CreatePower token={this.props.token}/>
                    <CreateCharacter token={this.props.token} />
                </div>
                <div className="viewConductor" style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{border: '1px solid black', marginRight: '2px'}} onClick={() => this.setState({list: 0})}>My Powers</Button>
                    <Button style={{border: '1px solid black'}} onClick={() => this.setState({list: 1})}>My Characters</Button>
                </div>
                <ProfileDisplay 
                    userPowers={this.state.userPowers} 
                    userCharacters={this.state.userCharacters} 
                    user={this.state.user} 
                    viewConductor={this.state.list}
                    deletePower={this.deletePower}
                    deleteCharacter={this.deleteCharacter}
                    token={this.props.token}
                />
            </div>
        )
    }
}

export default Profile;