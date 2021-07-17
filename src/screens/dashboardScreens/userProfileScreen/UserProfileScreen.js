import React, { useState, useEffect } from 'react';
import UserProfileForm from "./UserProfileForm";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Divider } from '@material-ui/core';
import Widget from "../../../components/Widget/Widget";
import Loading from '../../../components/Loading/Loading';
// import { useHistory } from 'react-router';

// redux actions
import { detailsUser, saveUser } from '../../../redux/actions/userActions';
import { listCompanyTypes } from '../../../redux/actions/companyTypeActions';
import { listCompanySizes} from '../../../redux/actions/companySizeActions';
import { listConsultingTypes } from '../../../redux/actions/consultingTypeActions';


import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL


const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
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
  nameStyle: {
    fontSize: 24,
    fontFamily: 'Oxanium, cursive',
    fontWeight: 400,
    lineHeight: 1.5
  }
}));


function UserProfileScreen() {
  // const history = useHistory();

  const userSignIn = useSelector(state => state.userSignin);
  //eslint-disable-next-line
  const { userInfo } = userSignIn;
  // console.log(userInfo)
  // const userDetails = useSelector(state => state.userDetails);
  // //eslint-disable-next-line
  // const { user, loading, error } = userDetails;

  const userSave = useSelector(state => state.userSave);
    //eslint-disable-next-line
  const { loading: loadingSave, success: successSave, error: errorSave } = userSave;
  // console.log(user)

  const companySizeList = useSelector(state => state.companySizeList);
  //eslint-disable-next-line
  const { companySizes, loading:loadingCompanySize, error:errorCompanySize } = companySizeList;

  const companyTypeList = useSelector(state => state.companyTypeList);
  //eslint-disable-next-line
  const { companyTypes, loading:loadingCompanyType, error:errorCompanyType } = companyTypeList;

  const consultingTypeList = useSelector(state => state.consultingTypeList);
  //eslint-disable-next-line
  const { consultingTypes, loading:loadingConsultingType, error: errorConsultingType } = consultingTypeList;

  const classes = useStyles();
  
  //eslint-disable-next-line
  const [recordForEdit, setRecordForEdit] = useState(null)
  //eslint-disable-next-line
  const [openPopup, setOpenPopup] = useState(true)
  //eslint-disable-next-line
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  //eslint-disable-next-line
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  const dispatch = useDispatch();
      // add/update promise
    //   const saveItem = (item, id) => new Promise((resolve, reject) => {
    //     dispatch(saveUser(item, id));
    //     resolve();
    // })

   
    //eslint-disable-next-line
    const addOrEdit = (item, resetForm) => {
        // console.log(item)
        const formData = new FormData()
        item.id && formData.append('Id', item?.id)
        item?.firstName && formData.append('FirstName', item?.firstName)
        item?.lastName && formData.append('LastName', item?.lastName)
        item?.roleId && formData.append('RoleId', item?.roleId)
        // formData.append('Name', item?.name)
        item?.isActive && formData.append('IsActive', item?.isActive) // true or false
        item?.companySizeId && formData.append('CompanySizeId', item?.companySizeId) 
        item?.companyTypeId && formData.append('CompanyTypeId', item?.companyTypeId) 
        item?.mobile && formData.append('Mobile', item?.mobile)
        item?.username && formData.append('Username', item?.username)
        item?.address && formData.append('Address', item?.address)
        item?.businessIndustry && formData.append('BusinessIndustry', item?.businessIndustry)
        item?.businessName && formData.append('BusinessName', item?.businessName)
        item?.currentConsultingTypeId && formData.append('CurrentConsultationTypeId', item?.currentConsultingTypeId)
        // append for add/update image
        if(typeof(item.photo) === 'object'){
            formData.append('file', item.photo)
        }
        // eslint-disable-next-line 
        if(typeof(item.photo) === 'null' || typeof(item.pictureUrl) === 'string'){
            formData.append('photo', item.photo)
        }

        if (formData) {
            resetForm()
            // setRecordForEdit(null)
            // setOpenPopup(true)
            // saveItem(formData, item.id)
            dispatch(saveUser(formData, item.id))
            .then((res)=>{
              setOpenPopup(true)
              // console.log(res)
              if(res?.status){
                // history.go(0);
                    setNotify({
                        isOpen: true,
                        message: "Successfull",
                        type: 'success'
                    })
              }
              else {
                  setNotify({
                      isOpen: true,
                      message: 'Submition Failed',
                      type: 'warning'
                  })
              }
            })
          
        }

    }
    // console.log(user)

  useEffect(() => {
    try{
      dispatch(listCompanySizes());
      dispatch(listCompanyTypes());
      dispatch(listConsultingTypes());
      // userInfo?.userId && dispatch(detailsUser(userInfo.userId));
      dispatch(detailsUser(userInfo.userId));
    }catch(e){
      // console.log(e)
    }
    return () => {
      // 
    }
  }, [dispatch, userInfo?.userId, successSave])
  return (
    <div>
      {
         loadingSave || loadingCompanySize || loadingCompanyType || loadingConsultingType ? <Loading /> :
          <>
            <div>
              <div
                style={{
                  height: "200px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  filter: "contrast(75%)",
                  backgroundImage: "url(/wallpaper.jpeg)",
                }}
              ></div>
              <div className={classes.headerContainer}>
                <div className={classes.header}>
                  {/* <Avatar
                    alt={'test'}
                    src={userInfo?.photo ? BASE_ROOT_URL + "/" + userInfo?.photo?.split("\\").join('/') : ''}
                    classes={{ root: classes.avatar, circle: classes.circle }}
                  /> */}
                  <Avatar 
                      alt="Profile" src={BASE_ROOT_URL + "/" + userInfo.userImage?.split("\\").join('/')}
                      classes={{ root: classes.avatar, circle: classes.circle }}
                  /> 
                  <Typography className={classes.nameStyle} variant={"h5"}>{userInfo?.name}</Typography>
                  <Chip variant={"outlined"} avatar={<Avatar>{ }</Avatar>} label={userInfo?.roleName} size='medium' />
                </div>
              </div>
            </div>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {
                  userInfo &&  <Widget
                      title="Profile"
                      upperTitle
                      // noBodyPadding
                      disableWidgetMenu
                      editOne = {() => { setOpenPopup(false); }}
                      displayEdit = {openPopup}
                    >
                      <Divider style={{marginBottom:16}}/>
                      <UserProfileForm
                        recordForEdit = {userInfo}
                        // recordForEdit = {recordForEdit}
                        addOrEdit = {addOrEdit}
                        loadingSave={loadingSave}
                        setOpenPopup={setOpenPopup}
                        openPopup={openPopup}
                        companySizes ={companySizes}
                        companyTypes ={companyTypes}
                        consultingTypes = {consultingTypes}
                        userInfo={userInfo}
                      />
                    </Widget> 

                }

              </Grid>
            </Grid>

          </>

      }

    </div>
  );
}

export default UserProfileScreen;