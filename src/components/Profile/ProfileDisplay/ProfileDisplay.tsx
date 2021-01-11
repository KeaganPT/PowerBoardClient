import React from 'react'
// import './ProfileDisplay.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UpdatePower from '../CreateUpdateDelete/UpdatePower';
import UpdateCharacter from '../CreateUpdateDelete/UpdateCharacter'

//styles
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

//power, character, props interfaces
type powerInterface = {
    powerName: string,
    description: string,
    id: number
}

type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
    id: number
}

type PropsInterface = {
    user: {userName: string}
    userPowers: Array<powerInterface>,
    userCharacters: Array<characterInterface>,
    viewConductor: number,
    deletePower(id: number, token: string | null): void,
    deleteCharacter(id: number, token: string | null): void,
    token: string | null
}

// FUNCTIONAL COMPONENT

const ProfileDisplay = (props: PropsInterface) => {
    const classes = useStyles();


    return(
        <div className="container">
            <div className="powerMap">
                {props.userPowers.length > 0 && props.userPowers.map((power: powerInterface, index: number) => {
                    if(props.viewConductor === 0) {
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
                                        {props.user.userName}
                                    </Typography>
                                    <UpdatePower token={props.token} id={power.id}/>
                                    <Button type="submit" onClick={() => props.deletePower(power.id, props.token)}>DELETE</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                })}
            </div>
            <div className="characterMap">
                {props.userCharacters.length > 0 && props.userCharacters.map((character: characterInterface, index: number) => {
                    if(props.viewConductor === 1) { 
                    return(
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
                                        {props.user.userName}
                                    </Typography>
                                    <UpdateCharacter token={props.token} id={character.id}/>
                                    <Button type="submit" onClick={() => props.deleteCharacter(character.id, props.token)}>DELETE</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                })}
            </div>
        </div>
    )
}

export default ProfileDisplay