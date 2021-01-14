import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Dialog } from '@material-ui/core/';
import UpdateCharacter from '../../Profile/CreateUpdateDelete/UpdateCharacter'
import UpdatePower from '../../Profile/CreateUpdateDelete/UpdatePower';

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
        marginTop: '10px',
        marginBottom: '20px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
});

//PROPS AND TYPEALIAS
type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
    user: { userName: string, role: string },
    id: number
    updatedAt: Date
}

type characterProps = {
    characterResults: Array<characterInterface>,
    deleteCharacter(id: number): void,
    userRole: string | null,
    token: string | null
}

type modalType = {
    modalOpen: boolean
}

type modalProps = {
    id: number,
    deleteCharacter(id: number): void
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

    render() {
        return (
            <div>
                <Button style={{border: '1px solid black'}} onClick={() => this.handleOpen()} >Delete Character</Button>
                <Dialog
                    open={this.state.modalOpen}
                    onClose={() => this.handleClose()}
                >
                    <div style={{ padding: '10px' }}>
                        <h2>Are You Sure?</h2>
                        <br />
                        <Button style={{border: '1px solid black'}} onClick={() => this.props.deleteCharacter(this.props.id)}>Delete</Button>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const DisplayCharacter = (props: characterProps) => {
    const classes = useStyles()

    let sortedCharacters = props.characterResults.sort((n1,n2) => {
        if(n1.updatedAt < n2.updatedAt) {
            return 1;
        }

        if(n1.updatedAt > n2.updatedAt) {
            return -1;
        }

        return 0;
    })

    return (
        <>
            <div>
                {props.characterResults.map((character: characterInterface, index: number) => {

                    let isHidden

                    if (props.userRole !== 'admin') {
                        isHidden = true
                    }


                    return (
                        <div className={classes.divContain} key={index}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                                        Character:
                                </Typography>
                                    <Typography variant="h5" component="h2">
                                        {character.characterName}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {character.description}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {character.user.userName}
                                    </Typography>
                                    <div className="modalDiv" hidden={isHidden}>
                                        <UpdateCharacter
                                            token={props.token}
                                            id={character.id}
                                        />
                                        <Modal
                                            id={character.id}
                                            deleteCharacter={props.deleteCharacter}

                                        >
                                        </Modal>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DisplayCharacter