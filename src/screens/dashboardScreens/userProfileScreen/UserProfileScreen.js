import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useSelector, useDispatch } from 'react-redux';
import { detailsUser } from '../../../redux/actions/userActions';


import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL


const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    flexWrap:"wrap",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    // width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  nameStyle:{
    fontSize:24,
    fontFamily: 'Oxanium, cursive',
    fontWeight: 400,
    lineHeight: 1.5
  }
}));


function UserProfileScreen() {
  const userSignIn = useSelector( state => state.userSignin );
  //eslint-disable-next-line
  const { userInfo  } = userSignIn;
  const userDetails = useSelector( state => state.userDetails );
  //eslint-disable-next-line
  const { user, loading, error  } = userDetails;


  
  const classes = useStyles();
  const open = () =>{

  }

  const dispatch = useDispatch();

  useEffect(() => {
    // userInfo?.userId && dispatch(detailsUser(userInfo.userId));
    dispatch(detailsUser(userInfo.userId))
    return () => {
        // 
    }
}, [dispatch, userInfo.userId])
  return (
    <div>
      {
        loading ? "Loading" :
      <>
      <div
        style={{
          height: "200px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "contrast(75%)",
          backgroundImage: "url(/wallpaper.jpeg)",
        }}
      />
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Avatar
            alt={'test'}
            src={BASE_ROOT_URL + "/" + user?.photo?.split("\\").join('/')}
            classes={{ root: classes.avatar, circle: classes.circle }}
          />
          <Typography className={classes.nameStyle} variant={"h5"}>{user?.name}</Typography>
          <Chip variant={"outlined"} avatar={<Avatar>{}</Avatar>} label={user?.roleName} size='medium' />

          <div className={classes.spacer} />
          <div className={classes.actionGroup}>
          <Button
                  color="primary"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={open}
                >
                  Edit
                </Button>
           
            {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button> */}
          </div>
        </div>
      </div>
    </>
    
      }
      
    </div>
  );
}

export default UserProfileScreen;