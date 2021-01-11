import React from 'react'
import { Dialog, Input } from '@material-ui/core'
import Button from '@material-ui/core/Button'

type propTypes = {
    token: string | null,
    id: number
}

type updatePowerTypes = {
    modalOpen: boolean,
    powerName: string,
    powerDescription: string
    powerID: number
}

class UpdatePower extends React.Component<propTypes, updatePowerTypes> {
    constructor(props:propTypes){
        super(props)
        this.state = {
            modalOpen: false,
            powerName: '',
            powerDescription: '',
            powerID: 0
        }
    }

    updatePowerFetch(id: number) {
        fetch(`http://localhost:3000/powers/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                powerName: this.state.powerName,
                description: this.state.powerDescription
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }
        })
    }

    handleOpen(id: number) {
        this.setState({modalOpen: true})
        this.setState({powerID: id})
    }

    handleClose() {
        this.setState({modalOpen: false})
    }

    handleClick(id: number) {
        this.setState({powerID: id})
    }

    render(){
        return(
            <div className="updateModal">
                <Button type="button" onClick={() => this.handleOpen(this.props.id)}>
                    Update Power
                </Button>
                <Dialog
                    open={this.state.modalOpen}
                    onClose={() => this.handleClose()}
                >
                    <div style={{padding: '10px'}}>
                        <h2>Update Current Power</h2>
                        <p>
                            Fill in the fields to update the power: 
                        </p>
                        <form className="modalForm" onSubmit={() => this.updatePowerFetch(this.props.id)}>
                            <label>Name of Power</label>
                            <br></br>
                            <Input type="text" onChange={(e) => this.setState({powerName: e.target.value})} />
                            <br />
                            <label>What does the power do?:</label>
                            <br />
                            <Input type="text" onChange={(e) => this.setState({powerDescription: e.target.value})}/>
                            <br />
                            <Button type='submit' style={{margin: '5px', border: '2px solid gray'}}>Submit Updated Power</Button>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default UpdatePower