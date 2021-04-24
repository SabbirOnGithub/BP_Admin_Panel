import React, { useState, useEffect } from 'react'
import CtaCategoryDetailScreen from "./CtaCategoryDetailScreen";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../../components/UseTable/useTable";
import Controls from "../../../../components/controls/Controls";
import Notification from "../../../../components/Notification/Notification";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Widget from "../../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../../components/Loading/Loading';

// redux actions
// import { listCtaFunctions } from '../../../../redux/actions/ctaFunctionActions';
import { listCtaCategorys } from '../../../../redux/actions/ctaCategoryActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CtaFunctionScreen() {
    const userSignIn = useSelector(state => state.userSignin);
    //eslint-disable-next-line
    const { userInfo } = userSignIn;

    const ctaCategoryList = useSelector(state => state.ctaCategoryList);
    //eslint-disable-next-line
    const { ctaCategorys, loading, error } = ctaCategoryList;

    const ctaCategorysFilterByUser = (userInfo?.userRole === 1 || userInfo?.userRole === 2) ? ctaCategorys : (userInfo?.userRole === 3 ? [] : ctaCategorys.filter(item=>item.email === userInfo.email))

    const [recordForEdit, setRecordForEdit] = useState(null)
    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(ctaCategorysFilterByUser, headCells, filterFn);

    const dispatch = useDispatch();

    // search from table
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x?.email?.toLowerCase()?.includes(target?.value?.toLowerCase()))
                    // return items.filter(x => x?.firstName?.toUpperCase().indexOf(target?.value?.toUpperCase()) >-1)
            }
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setShowDetail(true)
    }

    useEffect(() => {
        try {
            dispatch(listCtaCategorys());
        } catch (e) {
            console.log(e)
        }
        return () => {
            // 
        }
    }, [dispatch])
    return (
        <>
            {
                (openPopup === false && (loading)) ? <Loading /> :
                    <>
                        <PageTitle title="" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>

                                {
                                    showDetail ?
                                        <Widget
                                            title="Cta Category Detail"
                                            upperTitle
                                            // noBodyPadding
                                            disableWidgetMenu
                                        >
                                            <CtaCategoryDetailScreen
                                                recordForEdit={recordForEdit}
                                                setOpenPopup={setShowDetail}
                                            />
                                        </Widget> :
                                        <Widget
                                            title="Cta Category List Table"
                                            upperTitle
                                            noBodyPadding
                                            setOpenPopup={setOpenPopup}
                                            setRecordForEdit={setRecordForEdit}
                                            threeDotDisplay={true}
                                            disableWidgetMenu
                                            // addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                            // buttonText='Schedule a consult'
                                            createOperation={false}
                                            handleSearch = {handleSearch}
                                            searchLabel = 'Search by email'
                                        >

                                            <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                                <TblContainer>
                                                    <TblHead />
                                                    <TableBody>
                                                        {
                                                            recordsAfterPagingAndSorting().map(item =>
                                                            (<TableRow key={item.id}>
                                                                <TableCell>{item.id}</TableCell>
                                                                <TableCell>{item.firstName + ' ' + item.lastName}</TableCell>
                                                                <TableCell>{item.companyName}</TableCell>
                                                                <TableCell>{item.email}</TableCell>
                                                                <TableCell>{item.phone}</TableCell>
                                                                <TableCell>
                                                                    <Controls.ActionButton
                                                                        color="primary"
                                                                        onClick={() => { openInPopup(item) }}>
                                                                        <DetailsIcon fontSize="small" />
                                                                    </Controls.ActionButton>
                                                                </TableCell>
                                                            </TableRow>)
                                                            )
                                                        }
                                                    </TableBody>
                                                </TblContainer>
                                                <TblPagination />
                                            </Paper>
                                            <Notification
                                                notify={notify}
                                                setNotify={setNotify}
                                            />
                                            <ConfirmDialog
                                                confirmDialog={confirmDialog}
                                                setConfirmDialog={setConfirmDialog}
                                            />
                                        </Widget>
                                }

                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}
