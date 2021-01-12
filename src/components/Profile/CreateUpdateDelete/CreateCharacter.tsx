import React from 'react'
import { Dialog, Input } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import APIURL from '../../../helpers/enviorment'

type propTypes ={
    token: string | null
}

type createCharacterTypes ={
    modalOpen: boolean,
    characterName: string,
    tags: Array<string>,
    characterDescription: string
}

class CreateCharacter extends React.Component<propTypes, createCharacterTypes> {
    constructor(props: propTypes) {
        super(props)
        this.state = {
            modalOpen: false,
            characterName: '',
            tags: [],
            characterDescription: ''
        }
    }

    createCharacterFetch() {
        fetch(`${APIURL}/characters/`, {
            method: 'POST',
            body: JSON.stringify({
                characterName: this.state.characterName,
                tags: this.state.tags,
                description: this.state.characterDescription
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        
        this.createCharacterFetch()
    }

    handleOpen() {
        this.setState({modalOpen: true})
    }

    handleClose() {
        this.setState({modalOpen: false})
    }

    render(){
        return(
            <div>
                <button type="button" onClick={() => this.handleOpen()}>
                    Create Character
                </button>
                <Dialog
                    open={this.state.modalOpen}
                    onClose={() => this.handleClose()}
                >
                    <div style={{padding: '10px'}}>
                        <h2>Create a Character</h2>
                        <p>
                            Fill in the fields to create a character
                        </p>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <label>Name of Character: </label>
                            <br />
                            <Input type="text" onChange={(e) => this.setState({characterName: e.target.value})} />
                            <br />
                            {/* <label>Tags that relate: </label>
                            <br />
                            <Input type="text" onChange={(e) => this.setState({tags: [e.target.value]})} />
                            <br /> */}
                            <label>Give a quick description about your character</label>
                            <br />
                            <Input type="text" onChange={(e) => this.setState({characterDescription: e.target.value})} />
                            <br />
                            <Button type='submit'>Submit Character</Button>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default CreateCharacter