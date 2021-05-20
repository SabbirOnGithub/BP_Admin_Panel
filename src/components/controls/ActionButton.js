import React from 'react'
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        // backgroundColor: 'none',
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
            // color:'rgb(220, 0, 78)'
        },
        // "&:hover": {
        //     backgroundColor: theme.palette.primary.main,
        //     color: "rgba(255, 255, 255, 0.35)",
        //   },
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}
