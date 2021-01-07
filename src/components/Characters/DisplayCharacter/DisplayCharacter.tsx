import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
});

//PROPS AND TYPEALIAS
type characterInterface = {
    characterName: string,
    tags: Array<string>,
    description: string,
    user: {userName: string}
}

type characterProps = {
    characterResults: Array<characterInterface>
}

const DisplayCharacter = (props: characterProps) => {
    const classes = useStyles()

    return(
        <div>
            {props.characterResults.map((character: characterInterface, index: number) => {
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
                                    {character.user.userName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default DisplayCharacter