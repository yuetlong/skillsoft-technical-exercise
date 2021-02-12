import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
});

export default function PersonCard(props) {
    const classes = useStyles();
    const {name, homeworld, height, mass, birth_year} = props.data;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography>
                    Name: {name}
                </Typography>
                <Typography>
                    Origin: {homeworld == null ? "Unknown" : homeworld?.name}
                </Typography>
                <Typography>
                    Height: {height}
                </Typography>
                <Typography>
                    Mass: {mass}
                </Typography>
                <Typography>
                    Birth year: {birth_year}
                </Typography>
            </CardContent>
        </Card>
    );
}