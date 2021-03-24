import React from 'react'
import {  DialogTitle, DialogContent,  Typography, makeStyles, IconButton } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function SuccessDialog(props) {

    const { title, subTitle } = props;
    const classes = useStyles()

    return (
        <div classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <CheckCircleIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Typography variant="subtitle2">
                    {subTitle}
                </Typography>
            </DialogContent>
            
        </div>
    )
}
