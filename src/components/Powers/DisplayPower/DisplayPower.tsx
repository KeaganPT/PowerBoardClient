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
})

//PROP AND POWER TYPES
type powerInterface = {
    powerName: string,
    description: string,
    user: {userName: string}
}

type powerProps = {
    powerResults: Array<powerInterface>
}

const DisplayPowers = (props: powerProps) => {
    const classes = useStyles();

    return(
        <div>
            {props.powerResults.map((power: powerInterface, index: number) => {
                

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
                                </CardContent>
                            </Card>
                    </div>
                )
            })} 
        </div>
    )
}

export default DisplayPowers