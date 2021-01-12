import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button, Dialog} from '@material-ui/core'
import UpdatePower from '../../Profile/CreateUpdateDelete/UpdatePower'

//STYLES
const useStyles = makeStyles({
    divContain: {
        display: 'flex',
        justifyContent: 'center'
    },
    root: {
        minWidth: 475,
        maxWidth: 476,
        border: '2px solid black',
        marginLeft: '5%',
        marginTop: '20px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
})

//PROP AND POWER TYPES
type powerInterface = {
    powerName: string,
    description: string,
    user: {userName: string}
    id: number
    updatedAt: Date
}

type powerProps = {
    powerResults: Array<powerInterface>
    deletePower(id: number): void
    token: string | null,
    userRole: string | null
}


type modalType = {
    modalOpen: boolean
}

type modalProps = {
    id: number,
    deletePower(id: number): void
}

class Modal extends React.Component<modalProps, modalType> {
    constructor(props: modalProps) {
        super(props)
        this.state = {
            modalOpen: false
        }
    }

    handleOpen() {
        this.setState({ modalOpen: true })
    }

    handleClose() {
        this.setState({ modalOpen: false })
    }

    handleClick() {
        this.props.deletePower(this.props.id)
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.handleOpen()} >Delete Character</Button>
                <Dialog
                    open={this.state.modalOpen}
                    onClose={() => this.handleClose()}
                >
                    <div style={{ padding: '10px' }}>
                        <h2>Are You Sure?</h2>
                        <br />
                        <Button type="submit" onClick={() => this.handleClick()}>Delete</Button>
                    </div>
                </Dialog>
            </div>
        )
    }
}


const DisplayPowers = (props: powerProps) => {
    const classes = useStyles();

    let sortedPowers = props.powerResults.sort((n1, n2) => {
        if(n1.updatedAt < n2.updatedAt){
            return 1;
        }

        if(n1.updatedAt > n2.updatedAt){
            return -1;
        }

        return 0;
    }) 

    return(
        <div>
            {sortedPowers.map((power: powerInterface, index: number) => {

                let isHidden
                
                if(props.userRole !== 'admin'){
                    isHidden = true
                }


                return(
                    <div className={classes.divContain} key={index}>
                        <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                                        Power:
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {power.powerName}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {power.description}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {power.user.userName}
                                    </Typography>
                                    <div className="modalDiv" hidden={isHidden}>
                                        <UpdatePower 
                                            id={power.id}
                                            token={props.token}
                                        />
                                        <Modal
                                            id={power.id}
                                            deletePower={props.deletePower}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                    </div>
                )
            })} 
        </div>
    )
}

export default DisplayPowers