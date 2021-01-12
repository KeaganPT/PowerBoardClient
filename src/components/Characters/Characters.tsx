import React from 'react'
import DisplayCharacter from './DisplayCharacter/DisplayCharacter'
import APIURL from '../../helpers/enviorment'

type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
    user: {userName: string,
    role: string}
    id: number
    updatedAt: Date
}

type characterTypes = {
    characters: Array<characterInterface>
    modalOpen: boolean
}

type propTypes = {
    token: string | null,
    user: string | null
}

class Characters extends React.Component<propTypes, characterTypes>{
    constructor(props: propTypes){
        super(props)
        this.state = {
            characters: [],
            modalOpen: false
        }
        this.deleteCharacter = this.deleteCharacter.bind(this)
    }

    getAllCharacters() {
        fetch(`${APIURL}/characters/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                characters: data
            });
            // console.log(data)
        })
    }

    deleteCharacter(id: number) {
        fetch(`${APIURL}/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getAllCharacters()
        // console.log(this.props.user)
    }

    render(){
        return(
            <div>
                <DisplayCharacter 
                    characterResults={this.state.characters} 
                    deleteCharacter={this.deleteCharacter}
                    userRole={this.props.user}
                    token={this.props.token}
                />
            </div>
        )
    }
}

export default Characters