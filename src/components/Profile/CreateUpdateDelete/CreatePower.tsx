import React from 'react'
import { Dialog, Input } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import APIURL from '../../../helpers/enviorment'


type propTypes = {
    token: string | null
}

type createPowerTypes = {
    modalOpen: boolean,
    powerName: string,
    powerDescription: string
}

class CreatePower extends React.Component<propTypes, createPowerTypes> {
    constructor(props: propTypes){
        super(props)
        this.state = {
            modalOpen: false,
            powerName: '',
            powerDescription: ''
        }
    }

    createPowerFetch() {
        fetch(`${APIURL}/powers/`, {
            method: 'POST',
            body: JSON.stringify({
                powerName: this.state.powerName,
                description: this.state.powerDescription
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }

    handleSubmit(event: any) {
        event.preventDefault()
        this.createPowerFetch()
    }

    //Modal Methods
    handleOpen() {
        this.setState({modalOpen: true})
    }

    handleClose() {
        this.setState({modalOpen: false})
    }
    
    render(){
        return(
            <div>
                <button type="button" style={{marginTop: '5px', border: '1px solid black'}} onClick={() => this.handleOpen()}>
                        Create Power
                </button>
                <Dialog
                        open={this.state.modalOpen}
                        onClose={() => this.handleClose()}
                        
                    >
                        <div style={{padding: '10px'}}>
                            <h2 id="simple-modal-title">Create a Power</h2>
                            <p id="simple-modal-description">
                               Fill in the fields to create a power.
                            </p>
                            <form className='Modal please' onSubmit={(e) => this.handleSubmit(e)}>
                                {/* FIND A WAY TO RE:RENDER PAGE WITHOUT REFRESHING VIA A BUTTON, 
                                HEROKU SERVER IS STOPPED BY REFRESH */}
                                <label>Name of Power:</label>
                                <br />
                                <Input type="text" onChange={(e) => this.setState({powerName: e.target.value})}/>
                                <br />
                                <label>What does the power do?:</label>
                                <br />
                                <textarea style={{width: '80%', border: '1px solid black', paddingBottom: '120px', paddingTop: '10px', fontSize: 14 }} wrap="soft"onChange={(e) => this.setState({powerDescription: e.target.value})}/>
                                <br />
                                <Button type='submit' style={{margin: '5px', border: '2px solid gray'}}>Submit Power</Button>
                            </form>
                        </div>
                    </Dialog>
            </div>
        )
    }
}

export default CreatePower