import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
// import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

import * as Auth from '../../helpers/auth';



import { signin } from '../../redux/actions/userActions';
// import { detailsRoleResource } from '../../redux/actions/roleResourceActions';

function SignInScreen(props) {
  var classes = useStyles();
  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const userSignIn = useSelector( state => state.userSignin );
  // eslint-disable-next-line 
  const { loading , userInfo , error } = userSignIn;
  // const { loading , error } = userSignIn;
  // const redirect = props.location.search ? props.location.search.split("=")[1]:"/";

  const dispatch = useDispatch();
  const submitHandler = (e)=>{
    e.preventDefault();
    // console.log(email)
    // console.log(password)
    dispatch(signin(email,password))
      // dispatch(detailsRoleResource())
    .then(res=>{
      // res && console.log(userInfo)
    })
}
useEffect(()=>{
  if(Auth.validAdmin()){
      props.history.push('/admin');
  }
  return()=>{
      // 
  }
})


  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <div className ={classes.logoWrapper}>
            <img src={process.env.PUBLIC_URL+"/BP_logo_Big.png"} alt="logo" className={classes.logotypeImage} />
        </div>
      
        <Typography className={classes.logotypeText}> Best Practicify </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
            <React.Fragment>
              <Typography variant="h1" className={classes.logImageInMobile}>
                <img src={process.env.PUBLIC_URL+"/BP_logo_Big.png"} alt="logo" height='50px' width='50px' />
              </Typography>
              <Typography variant="h1" className={classes.greeting}>
                Sign In
              </Typography>
             
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}></Typography>
                <div className={classes.formDivider} />
              </div>
              <Fade in={error ? true : false}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <form onSubmit={submitHandler}>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                // type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {loading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      email.length === 0 || password.length === 0
                    }
                    
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                  >
                    Login
                  </Button>
                )}
                {/* <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button> */}
              </div>

</form>

            </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2020, All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default SignInScreen;
