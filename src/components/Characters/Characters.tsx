import React from 'react'
import DisplayCharacter from './DisplayCharacter/DisplayCharacter'

type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
    user: {userName: string}
}

type characterTypes = {
    characters: Array<characterInterface>
}

type propTypes = {
    token: string | null
}

class Characters extends React.Component<propTypes, characterTypes>{
    constructor(props: propTypes){
        super(props)
        this.state = {
            characters: []
        }
    }

    getAllCharacters() {
        fetch('http://localhost:3000/characters/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
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

    componentDidMount() {
        this.getAllCharacters()
    }

    render(){
        return(
            <div>
                <DisplayCharacter characterResults={this.state.characters}/>
            </div>
        )
    }
}

export default Characters