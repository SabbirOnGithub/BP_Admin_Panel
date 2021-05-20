import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5),
        padding: '5px 40px',
        fontSize: '1.5rem',
        border:0,
        borderRadius:0,
        // textTransform: 'capitalize',
        [theme.breakpoints.down("sm")]: {
            padding: '5px 30px',
            fontSize: '1rem',
        },
    },
    label: {
        // textTransform: 'none'
        // textTransform: 'capitalize',
    },
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}
        >
            
            {text}
        </MuiButton>
    )
}
