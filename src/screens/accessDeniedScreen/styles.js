import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  // container: {
  //   height: "100vh",
  //   width: "100vw",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: theme.palette.primary.main,
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  // },
  fullSize:{
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  textLink : {
    // fontWeight: "bold",
    // textdecoration: "none",
    // textTransform: "lowercase",
    // padding: 5,
    fontSize:20,

  },
  beforeTooLate : {
    marginTop: 50,
    fontSize:20
  }
  
}));
