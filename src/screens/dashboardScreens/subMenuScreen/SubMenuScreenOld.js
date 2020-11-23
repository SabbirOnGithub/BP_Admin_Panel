import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
// material ui
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from '@material-ui/icons/Edit';


// custom form
import SubMenuForm from "./SubMenuForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../../components/Table/Table";


// redux actions
import { listSubMenus } from '../../actions/subMenuActions';

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

function SubMenuScreen(props) {
  const classes = useStyles();

  const subMenuList = useSelector(state=>state.subMenuList)
//   const {subMenus, loading, error } = subMenuList;
  const {subMenus } = subMenuList;
//   
  const [open, setOpen] = React.useState(false);
  const [menuId, setMenuId] = React.useState(0);
  
    function handleClickOpen(id) {
        setMenuId(id)
        setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    //   axios.post(BASE_API_URL+'SubMenu/Search',{isHomePageSubMenu:true}).then(res=>{
    //       setSubMenus(res.data.data.item1)
    //    });
    }
// 
  const dispatch =useDispatch();
  
  useEffect(()=>{
    dispatch(listSubMenus());
    // console.log(subMenus)
    console.log('subMenus component')
    return() =>{
      // 
      
    }
  }, [dispatch]) 
    return(
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="SubMenus" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={subMenus} />
          </Widget>
        </Grid>
      </Grid>
    </>
    )
}

export default SubMenuScreen;