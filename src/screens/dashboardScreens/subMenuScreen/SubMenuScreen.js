// import React, { useState, useEffect } from 'react'
// import SubMenuForm from "./SubMenuForm";
// import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
// import useTable from "../../components/useTable";
// import * as employeeService from "../../services/employeeService";
// import Controls from "../../components/controls/Controls";
// // import { Search } from "@material-ui/icons";
// import AddIcon from '@material-ui/icons/Add';
// import Popup from "../../components/Popup";
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import CloseIcon from '@material-ui/icons/Close';
// import Notification from "../../components/Notification";
// import ConfirmDialog from "../../components/ConfirmDialog";

// import {useSelector, useDispatch} from 'react-redux';

// // redux actions
// import { listSubMenus } from '../../redux/actions/subMenuActions';


// const useStyles = makeStyles(theme => ({
//     pageContent: {
//         margin: theme.spacing(5),
//         padding: theme.spacing(3)
//     },
//     searchInput: {
//         width: '75%'
//     },
//     newButton: {
//         position: 'absolute',
//         right: '10px'
//     }
// }))


// const headCells = [
//     { id: 'id', label: 'Id' },
//     { id: 'name', label: 'Name' },
//     { id: 'shortDescription', label: 'Short Description' },
//     { id: 'pictureName', label: 'Picture' },
//     { id: 'actions', label: 'Actions', disableSorting: true }
// ]

// export default function Employees() {

//     const subMenuList = useSelector(state=>state.subMenuList)
//       const {subMenus, loading, error } = subMenuList;
//     //   const {subMenus } = subMenuList;
//     const classes = useStyles();
//     const [recordForEdit, setRecordForEdit] = useState(null)
//     const [records, setRecords] = useState([])
//     const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
//     const [openPopup, setOpenPopup] = useState(false)
//     const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
//     const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

//     const {
//         TblContainer,
//         TblHead,
//         TblPagination,
//         recordsAfterPagingAndSorting
//     } = useTable(records, headCells, filterFn);

//     const addOrEdit = (employee, resetForm) => {
//         console.log(employee)
//         if (employee.id === 0)
//             employeeService.insertEmployee(employee)
//         else
//             employeeService.updateEmployee(employee)
//         resetForm()
//         setRecordForEdit(null)
//         setOpenPopup(false)
//         setRecords(employeeService.getAllEmployees())
//         setNotify({
//             isOpen: true,
//             message: 'Submitted Successfully',
//             type: 'success'
//         })
//     }

//     const openInPopup = item => {
//         console.log(subMenus)
//         setRecordForEdit(item)
//         setOpenPopup(true)
//     }

//     const onDelete = id => {
//         setConfirmDialog({
//             ...confirmDialog,
//             isOpen: false
//         })
//         employeeService.deleteEmployee(id);
//         setRecords(employeeService.getAllEmployees())
//         setNotify({
//             isOpen: true,
//             message: 'Deleted Successfully',
//             type: 'error'
//         })
//     }


//       const dispatch =useDispatch();
  
//       useEffect(()=>{
//         dispatch(listSubMenus());
//         subMenus && setRecords([...subMenus]);
//         return() =>{
//           // 
//         console.log(subMenus)
          
//         }
//       }, [dispatch]) 
//     return (

//         <div>
//             {loading ? "Loading ...." :
//             <>
//             {/* <PageHeader
//                 title="New Employee"
//                 subTitle="Form design with validation"
//                 icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
//             /> */}
//             <Paper className={classes.pageContent}>

//                 <Toolbar>
//                     <Controls.Button
//                         text="Add New"
//                         variant="outlined"
//                         startIcon={<AddIcon />}
//                         className={classes.newButton}
//                         onClick={() => { setOpenPopup(true); setRecordForEdit(null); console.log(subMenus) }}
//                     />
//                 </Toolbar>
//                 <TblContainer>
//                     <TblHead />
//                     <TableBody>
//                         {
//                             recordsAfterPagingAndSorting().map(item =>
//                                 (<TableRow key={item.id}>
//                                     <TableCell>{item.id}</TableCell>
//                                     <TableCell>{item.name}</TableCell>
//                                     <TableCell>{item.shortDescription}</TableCell>
//                                     {/* <TableCell>{item.pictureName}</TableCell> */}
//                                     <TableCell><img src={process.env.PUBLIC_URL+"/images/dummy-submenu.jpg"} alt="logo" style={{width:100,height:100}}/></TableCell>
//                                     <TableCell>
//                                         <Controls.ActionButton
//                                             color="primary"
//                                             onClick={() => { openInPopup(item) }}>
//                                             <EditOutlinedIcon fontSize="small" />
//                                         </Controls.ActionButton>
//                                         <Controls.ActionButton
//                                             color="secondary"
//                                             onClick={() => {
//                                                 setConfirmDialog({
//                                                     isOpen: true,
//                                                     title: 'Are you sure to delete this record?',
//                                                     subTitle: "You can't undo this operation",
//                                                     onConfirm: () => { onDelete(item.id) }
//                                                 })
//                                             }}>
//                                             <CloseIcon fontSize="small" />
//                                         </Controls.ActionButton>
//                                     </TableCell>
//                                 </TableRow>)
//                             )
//                         }
//                     </TableBody>
//                 </TblContainer>
//                 <TblPagination />
//             </Paper>
//             <Popup
//                 title="Submenu Form"
//                 openPopup={openPopup}
//                 setOpenPopup={setOpenPopup}
//             >
//                 <SubMenuForm
//                     recordForEdit={recordForEdit}
//                     addOrEdit={addOrEdit} />
//             </Popup>
//             <Notification
//                 notify={notify}
//                 setNotify={setNotify}
//             />
//             <ConfirmDialog
//                 confirmDialog={confirmDialog}
//                 setConfirmDialog={setConfirmDialog}
//             />
//             </>
//         }
//         </div>
//     )
// }
