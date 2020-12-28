import React, { useState, useEffect } from 'react'
import HomePageForm from "./HomePageForm";
import Popup from "../../../components/Popup/Popup";
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget";
import { ResponseMessage } from "../../../themes/responseMessage";
// material ui
import { Grid, Paper, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

// react redux
import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listHomePageDatas, saveHomePageData, deleteHomePageData } from '../../../redux/actions/homePageActions';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    },
    expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    },
    expandOpen: {
    transform: 'rotate(180deg)',
    },
    avatar: {
    backgroundColor: red[500],
    },
    customPharagraph:{
        fontSize:'1.5rem',
        "& b": {
            color:'#536DFE'
          }
    },
    
    
}))

export default function HomePageScreen() {

    const homePageDataList = useSelector(state => state.homePageDataList);
    //eslint-disable-next-line
    const { homePageDatas, loading, error } = homePageDataList;
    const homePageDataSave = useSelector(state => state.homePageDataSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = homePageDataSave;
    const homePageDataDelete = useSelector(state => state.homePageDataDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = homePageDataDelete;


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState([])
    //eslint-disable-next-line
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveHomePageData(item));

        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteHomePageData(id));
        resolve();
    })

    const addOrEdit = async (homePageData, resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        saveItem(homePageData)
            .then(() => {
                // resetForm()
                // setRecordForEdit(null)
                // setOpenPopup(false)
                if (successSave) {
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                }

                if (errorSave) {
                    setNotify({
                        isOpen: true,
                        message: 'Submition Failed',
                        type: 'warning'
                    })
                }
            })

    }

    const openInPopup = item => {
        // console.log(subMenus)
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteItem(id)
            .then(() => {
                if (successDelete) {
                    setNotify({
                        isOpen: true,
                        message: 'Deleted Successfully',
                        type: 'success'
                    })
                }
                if (errorDelete) {
                    setNotify({
                        isOpen: true,
                        message:  ResponseMessage.errorDeleteMessage,
                        type: 'warning'
                    })
                }
            })
    }



    useEffect(() => {
        dispatch(listHomePageDatas());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (

        <>
            {
                loading || loadingSave || loadingDelete ? "Loading" :
                    <>
                        <PageTitle title="Basic Info" />
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="Basic Info List"
                                    disableWidgetMenu
                                    addNew = {() => { setOpenPopup(true); setRecordForEdit(null); }}
                                >
                                    <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                    {
                                                    homePageDatas && homePageDatas.map(item =>
                                                        ( <Card className={classes.root} key={item.id}>
                                                            <CardHeader
                                                              avatar={
                                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                                  {item.id}
                                                                </Avatar>
                                                              }
                                                            //   title="Shrimp and Chorizo Paella"
                                                            //   subheader="September 14, 2016"
                                                            />
                                                            <CardContent>
                                                              <Typography variant="body2" color="textSecondary" component="span">
                                                                <Typography paragraph className={classes.customPharagraph}><b>Hero Text:</b> {item.heroText} </Typography>
                                                              </Typography>
                                                            </CardContent>
                                                            <CardActions disableSpacing>
                                                                <Button size="small" 
                                                                        color="primary"
                                                                        onClick={() => { openInPopup(item) }}
                                                                    >
                                                                    Edit
                                                                </Button>
                                                                <Button size="small" 
                                                                        color="primary"
                                                                        onClick={() => {
                                                                            setConfirmDialog({
                                                                                isOpen: true,
                                                                                title: 'Are you sure to delete this record?',
                                                                                subTitle: "You can't undo this operation",
                                                                                onConfirm: () => { onDelete(item.id) }
                                                                            })
                                                                        }}
                                                                        >
                                                                    Delete
                                                                </Button>
                                                                <IconButton
                                                                    className={clsx(classes.expand, {
                                                                        [classes.expandOpen]: expanded,
                                                                    })}
                                                                    onClick={handleExpandClick}
                                                                    aria-expanded={expanded}
                                                                    aria-label="show more"
                                                                    >
                                                                    <ExpandMoreIcon />
                                                                    </IconButton>
                                                            </CardActions>
                                                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                              <CardContent>
                                                              
                                                                <Typography paragraph className={classes.customPharagraph}><b>Hero Description:</b> {item.heroSectionDescription} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Video Url:</b> {item.videoUrl} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Hero Section Background Image:</b> {item.heroSectionBackgroundImage} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Short Intro Title:</b> {item.shortIntroTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Short Intro Subtitle:</b> {item.shortIntroSubTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Function Area Walkthrough Title:</b> {item.functionAreaWalkthroughTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Function Area Walkthrough Subtitle:</b> {item.functionAreaWalkthroughSubTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Consulting Title:</b> {item.consultingTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Consulting Subtitle:</b> {item.consultingSubTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Core Value Title:</b> {item.coreValueTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Core Value Subtitle:</b> {item.coreValueSubtitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Training Title:</b> {item.trainingTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Training Subtitle:</b> {item.trainingSubtitile} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Testimonial Title:</b> {item.testimonialTitle} </Typography>
                                                                <Typography paragraph className={classes.customPharagraph}><b>Testimonial Subtitle:</b> {item.testimonialSubTitle} </Typography>
                                                                {/* <Typography>
                                                                  Set aside off of the heat to let rest for 10 minutes, and then serve.
                                                                </Typography> */}
                                                              </CardContent>
                                                            </Collapse>
                                                          </Card>)
                                                    )
                                                }
                                    </Paper>
                                    <Popup
                                        title="Home Page Data Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        <HomePageForm
                                            recordForEdit={recordForEdit}
                                            addOrEdit={addOrEdit}
                                            loadingSave={loadingSave}
                                        />

                                    </Popup>
                                    <Notification
                                        notify={notify}
                                        setNotify={setNotify}
                                    />
                                    <ConfirmDialog
                                        confirmDialog={confirmDialog}
                                        setConfirmDialog={setConfirmDialog}
                                    />
                                </Widget>

                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}
