import { Grid, Paper, TableBody, TableCell, TableRow } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Controls from "../../../components/controls/Controls";
import Loading from "../../../components/Loading/Loading";
import Notification from "../../../components/Notification/Notification";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Popup from "../../../components/Popup/Popup";
// permissions
import { usePermission } from "../../../components/UsePermission/usePermission";
import useTable from "../../../components/UseTable/useTable";
import Widget from "../../../components/Widget/Widget";
import { config } from "../../../config";
import {
  searchNameByIdFromArray,
  searchTitleByIdFromArray,
} from "../../../helpers/search";
import { listMenus } from "../../../redux/actions/menuActions";
import { listMenuSubMenuMaps } from "../../../redux/actions/menuSubMenuMapActions";
// redux actions
import {
  deleteMenuSubMenuMapDetail,
  listMenuSubMenuMapDetails,
  saveMenuSubMenuMapDetail,
} from "../../../redux/actions/menuSubMenuMapDetailActions";
import { listSubMenus } from "../../../redux/actions/subMenuActions";
import { accessDeniedRoute } from "../../../routes/routeConstants";
import { ResponseMessage } from "../../../themes/responseMessage";
import MenuSubMenuMapDetailForm from "./MenuSubMenuMapDetailForm";

const BASE_ROOT_URL = config.BASE_ROOT_URL;

const headCells = [
  { id: "id", label: "Id" },
  { id: "menuName/subMenuName", label: "Menu/Sub Menu Name" },
  // { id: 'menuName', label: 'Menu Name' },
  // { id: 'subMenuName', label: 'Sub Menu Name' },
  { id: "menuSubMenuMapId", label: "Menu Sub Menu Map Title" },
  { id: "title", label: "Title" },
  { id: "subTitle", label: "Sub Title" },
  { id: "description", label: "Description" },
  { id: "pictureUrl", label: "Picture" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function MenuSubMenuMapDetailScreen() {
  // permission get
  const {
    permission,
    setPermission,
    recievedPermission,
    loadingRoleResource,
    history,
    initialPermission,
  } = usePermission();
  const { createOperation, readOperation, updateOperation, deleteOperation } =
    permission;

  const menuList = useSelector((state) => state.menuList);
  //eslint-disable-next-line
  const { menus, loading: loadingMenus } = menuList;

  const subMenuList = useSelector((state) => state.subMenuList);

  //eslint-disable-next-line
  const { subMenus, loading: loadingSubMenus } = subMenuList;

  const menuSubMenuMapList = useSelector((state) => state.menuSubMenuMapList);
  //eslint-disable-next-line
  const { menuSubMenuMaps, loading: loadingMenuSubMenuMaps } =
    menuSubMenuMapList;

  const menuSubMenuMapDetailList = useSelector(
    (state) => state.menuSubMenuMapDetailList
  );
  //eslint-disable-next-line
  const { menuSubMenuMapDetails, loading, error } = menuSubMenuMapDetailList;
  //eslint-disable-next-line
  const menuSubMenuMapDetailSave = useSelector(
    (state) => state.menuSubMenuMapDetailSave
  );
  //eslint-disable-next-line
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = menuSubMenuMapDetailSave;
  const menuSubMenuMapDetailDelete = useSelector(
    (state) => state.menuSubMenuMapDetailDelete
  );
  //eslint-disable-next-line
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = menuSubMenuMapDetailDelete;

  const [recordForEdit, setRecordForEdit] = useState(null);
  //eslint-disable-next-line
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(menuSubMenuMapDetails, headCells, filterFn);

  const dispatch = useDispatch();

  // add/update promise
  const saveItem = (item, id) =>
    new Promise((resolve, reject) => {
      dispatch(saveMenuSubMenuMapDetail(item, id));
      resolve();
    });

  // delete promise
  const deleteItem = (id) =>
    new Promise((resolve, reject) => {
      dispatch(deleteMenuSubMenuMapDetail(id));
      resolve();
    });
  const addOrEdit = (item, resetForm) => {
    const formData = new FormData();
    // append form data
    item.id && formData.append("Id", item.id);
    formData.append("MenuSubMenuMapId", item.menuSubMenuMapId);
    formData.append("Title", item.title);
    formData.append("SubTitle", item.subTitle);
    formData.append("Description", item.description);
    formData.append("DisplayOrder", item.displayOrder);
    formData.append("CtaBtn", item.ctaBtn);
    formData.append("CtaBtnText", item.ctaBtnText);
    formData.append("Link", item.link);
    formData.append("LinkText", item.linkText);
    // append for add/update image
    if (typeof item.pictureUrl === "object") {
      formData.append("file", item.pictureUrl);
    }
    // eslint-disable-next-line
    if ( typeof item.pictureUrl === "null" || typeof item.pictureUrl === "string") {
      formData.append("pictureUrl", item.pictureUrl);
    }

    if (formData) {
      resetForm();
      setRecordForEdit(null);
      setOpenPopup(false);
      saveItem(formData, item.id).then(() => {
        // resetForm()
        // setRecordForEdit(null)
        // setOpenPopup(false)
        if (successSave) {
          setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            type: "success",
          });
        }

        if (errorSave) {
          setNotify({
            isOpen: true,
            message: "Submition Failed",
            type: "warning",
          });
        }
      });
    }
  };

  const openInPopup = (item) => {
    let menuId = menuSubMenuMaps.find(
      (menuSubMenuMapItem) => menuSubMenuMapItem.id === item.menuSubMenuMapId
    ).menuId;
    let subMenuId = menuSubMenuMaps.find(
      (menuSubMenuMapItem) => menuSubMenuMapItem.id === item.menuSubMenuMapId
    ).subMenuId;
    item["menuId"] = menuId;
    item["subMenuId"] = subMenuId;
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteItem(id).then(() => {
      if (successDelete) {
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "success",
        });
      }
      if (errorDelete) {
        setNotify({
          isOpen: true,
          message: ResponseMessage.errorDeleteMessage,
          type: "warning",
        });
      }
    });
  };

  useEffect(() => {
    try {
      if (recievedPermission) {
        setPermission({ ...recievedPermission });
      }
      if (recievedPermission?.readOperation) {
        dispatch(listMenus());
        dispatch(listSubMenus());
        dispatch(listMenuSubMenuMaps());
        dispatch(listMenuSubMenuMapDetails());
      }
      if (readOperation === false) {
        history.push(accessDeniedRoute);
      }
      if (loadingRoleResource === false && !recievedPermission) {
        setPermission({ ...initialPermission });
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      //
    };
  }, [
    dispatch,
    successSave,
    successDelete,
    setPermission,
    recievedPermission,
    readOperation,
    history,
    initialPermission,
    loadingRoleResource,
  ]);

  return (
    <div>
      {loadingRoleResource ||
      loading ||
      loadingSave ||
      loadingDelete ||
      loadingMenuSubMenuMaps ||
      loadingMenus ||
      loadingSubMenus ? (
        <Loading />
      ) : (
        menuSubMenuMapDetails.length > 0 && (
          <>
            <PageTitle title="Menu Sub Menu Map Detail" />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Widget
                  title="Menu Sub Menu Map Detail Table"
                  upperTitle
                  noBodyPadding
                  setOpenPopup={setOpenPopup}
                  setRecordForEdit={setRecordForEdit}
                  disableWidgetMenu
                  addNew={() => {
                    setOpenPopup(true);
                    setRecordForEdit(null);
                  }}
                  createOperation={createOperation}
                >
                  <Paper
                    style={{ overflow: "auto", backgroundColor: "transparent" }}
                  >
                    <TblContainer>
                      <TblHead />
                      <TableBody>
                        {recordsAfterPagingAndSorting().map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>
                              {searchNameByIdFromArray(
                                menus,
                                menuSubMenuMaps.find(
                                  (menuSubMenuMapItem) =>
                                    menuSubMenuMapItem.id ===
                                    item.menuSubMenuMapId
                                ).menuId
                              )}{" "}
                              /
                              {searchNameByIdFromArray(
                                subMenus,
                                menuSubMenuMaps.find(
                                  (menuSubMenuMapItem) =>
                                    menuSubMenuMapItem.id ===
                                    item.menuSubMenuMapId
                                ).subMenuId
                              )}
                            </TableCell>
                            {/* <TableCell>{searchNameByIdFromArray(menus, menuSubMenuMaps.find(menuSubMenuMapItem=>menuSubMenuMapItem.id === item.menuSubMenuMapId).menuId)}</TableCell>
                                                        <TableCell>{searchNameByIdFromArray(subMenus, menuSubMenuMaps.find(menuSubMenuMapItem=>menuSubMenuMapItem.id === item.menuSubMenuMapId).subMenuId)}</TableCell>
                                                         */}
                            <TableCell>
                              {searchTitleByIdFromArray(
                                menuSubMenuMaps,
                                item.menuSubMenuMapId
                              )}
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.subTitle}</TableCell>
                            {/* <TableCell>{item.description ? item.description: 'no input given'}</TableCell> */}
                            <TableCell>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: `${item.description}`,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {item.pictureUrl ? (
                                <img
                                  src={
                                    BASE_ROOT_URL +
                                    "/" +
                                    item.pictureUrl.split("\\").join("/")
                                  }
                                  alt="logo"
                                />
                              ) : (
                                <span>No image uploaded</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {updateOperation && (
                                <Controls.ActionButton
                                  color="primary"
                                  onClick={() => {
                                    openInPopup(item);
                                  }}
                                >
                                  <EditOutlinedIcon fontSize="small" />
                                </Controls.ActionButton>
                              )}
                              {deleteOperation && (
                                <Controls.ActionButton
                                  color="secondary"
                                  onClick={() => {
                                    setConfirmDialog({
                                      isOpen: true,
                                      title:
                                        "Are you sure to delete this record?",
                                      subTitle: "You can't undo this operation",
                                      onConfirm: () => {
                                        onDelete(item.id);
                                      },
                                    });
                                  }}
                                >
                                  <CloseIcon fontSize="small" />
                                </Controls.ActionButton>
                              )}
                              {!updateOperation && !deleteOperation && (
                                <>Access Denied</>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TblContainer>
                    <TblPagination />
                  </Paper>
                  <Popup
                    title="Menu Sub Menu Map Detail Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                  >
                    <MenuSubMenuMapDetailForm
                      recordForEdit={recordForEdit}
                      addOrEdit={addOrEdit}
                      menuSubMenuMaps={menuSubMenuMaps}
                      menus={menus}
                      subMenus={subMenus}
                    />
                  </Popup>
                  <Notification notify={notify} setNotify={setNotify} />
                  <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                  />
                </Widget>
              </Grid>
            </Grid>
          </>
        )
      )}
    </div>
  );
}
