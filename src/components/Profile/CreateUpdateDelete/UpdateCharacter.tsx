import React from 'react'
import { Dialog, Input } from '@material-ui/core'
import Button from '@material-ui/core/Button'

type propTypes = {
    token: string | null,
    id: number
}

type updateCharacterTypes = {
    modalOpen: boolean,
    characterName: string,
    tags: Array<string>,
    characterDescription: string,
    characterID: number
}

class UpdateCharacter extends React.Component<propTypes, updateCharacterTypes> {
    constructor(props: propTypes){
        super(props)
        this.state = {
            modalOpen: false,
            characterName: '',
            tags: [''],
            characterDescription: '',
            characterID: 0
        }
    }

    updateCharacterFetch(id: number){
        fetch(`http://localhost:3000/characters/${id}`, {
            method: 'PUT',
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
    }

    handleOpen(id: number) {
        this.setState({modalOpen: true})
        this.setState({characterID: id})
    }

    handleClose(id: number) {
        this.setState({modalOpen: false})
    }

    handleClick(id: number) {
        this.setState({characterID: id})
    }

    render(){
        return(
            <div className="updateModal">
                <Button type="button" onClick={() => this.handleOpen(this.props.id)}>
                    Update Character
                </Button>
                <Dialog
                    open={this.state.modalOpen}
                    onClose={() => this.handleClose(this.props.id)}
                >
                    <div style={{padding: '10px'}}>
                        <h2>Update Current Power</h2>
                        <p>
                            Fill in the fields to update the character: 
                        </p>
                        <form className="modalForm" onSubmit={() => this.updateCharacterFetch(this.props.id)}>
                            <label>Name of Character:</label>
                            <br/>
                            <Input type="text" onChange={(e) => this.setState({characterName: e.target.value})} />
                            <br />
                            <label>Tag for character</label>
                            <br />
                            <Input type="text" onChange={(e) => this.setState({tags: [e.target.value]})} />
                            <br />
                            <label>description for updated character</label>
                            <br />
                            <Input type="text" onChange={(e) => this.setState({characterDescription: e.target.value})}/>
                            <Button type='submit' style={{margin: '5px', border: '2px solid gray'}}>Submit Updated Character</Button>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default UpdateCharacter