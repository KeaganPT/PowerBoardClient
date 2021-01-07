import React from 'react'
// import './ProfileDisplay.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        marginTop: '20px'
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
}

type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
}

type PropsInterface = {
    user: {userName: string}
    userPowers: Array<powerInterface>,
    userCharacters: Array<characterInterface>,
    viewConductor: number,
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