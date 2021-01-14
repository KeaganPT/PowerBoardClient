import React from 'react'

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
    updatedAt: Date
}

type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
    id: number
    updatedAt: Date
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

    let sortedPowers = props.userPowers.sort((n1, n2) => {
        if(n1.updatedAt < n2.updatedAt){
            return 1;
        }

        if(n1.updatedAt > n2.updatedAt){
            return -1;
        }

        return 0;
    }) 

    let sortedCharacters = props.userCharacters.sort((n1,n2) => {
        if(n1.updatedAt < n2.updatedAt) {
            return 1;
        }

        if(n1.updatedAt > n2.updatedAt) {
            return -1;
        }

        return 0;
    })

    return(
        <div className="container">
            <div className="powerMap">
                {sortedPowers.length > 0 && sortedPowers.map((power: powerInterface, index: number) => {
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
                                    <Button style={{border: '1px solid black'}} type="submit" onClick={() => props.deletePower(power.id, props.token)}>DELETE</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                })}
            </div>
            <div className="characterMap">
                {sortedCharacters.length > 0 && sortedCharacters.map((character: characterInterface, index: number) => {
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
                                    <Button style={{border: '1px solid black'}} type="submit" onClick={() => props.deleteCharacter(character.id, props.token)}>DELETE</Button>
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