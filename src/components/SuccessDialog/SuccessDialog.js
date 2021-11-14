import { DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';


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
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.light,
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
            <DialogContent className={`dialog-content ${classes.dialogContent}`}>
                <Typography variant="h6" className="title">
                    {title}
                </Typography>
                <Typography variant="subtitle2" className="subtitle">
                    {subTitle}
                </Typography>
            </DialogContent>
            
        </div>
    )
}
