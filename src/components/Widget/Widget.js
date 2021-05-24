import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
 InputAdornment, 
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";
import Controls from "../controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Search } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';

// styles
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  ...props
}) {
  var classes = useStyles();

  // local
  var [moreButtonRef, setMoreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <div className={classes.widgetWrapper} style={style && { ...style }}>
      <Paper className={classes.paper} classes={{
        root: classnames(classes.widgetRoot, {
          [classes.noWidgetShadow]: noWidgetShadow
        })
      }}>
        <div className={classnames(classes.widgetHeader, {
          [classes.noPadding]: noHeaderPadding,
          [headerClass]: headerClass
        })}>
          {header ? (
            header
          ) : (
            <React.Fragment>
                        
              <Typography variant="h2" color="textSecondary" style={{margin:4}}>
                {title}
              </Typography>
              { props.handleSearch && props.searchLabel &&
                        <Controls.Input
                        label={props.searchLabel}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={props.handleSearch}
                        style={{margin:4}}
                    />

              }

              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  buttonRef={setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}
              {
                props.addNew && props.createOperation &&
                <Controls.Button
                  text={props.buttonText ? props.buttonText : "Add New"}
                  variant="contained"
                  size="large"
                  // variant="outlined"
                  startIcon={!props.buttonText && <AddIcon />}
                  onClick={props.addNew}
                />
              }
              {
                props.editOne && props.displayEdit &&
                <Controls.Button
                  text="Edit"
                  // variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={props.editOne}
                />
              }
              {
                props.closePopup &&
                ( props.closePopUpButtonText ? 
                  <Controls.Button
                        color="primary"
                        onClick={props.closePopup}
                        text={props.closePopUpButtonText}
                  />
                  
                  :

                  <Controls.ActionButton
                        color="secondary"
                        onClick={props.closePopup}>
                        <CloseIcon />
                    </Controls.ActionButton>
                )
                
              }
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>

      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        <MenuItem
          onClick={() => { props.setOpenPopup(true); props.setRecordForEdit(null); setMoreMenuOpen(false) }}
        >
          <Typography>Add New</Typography>
        </MenuItem>

      </Menu>

    </div>
  );
}
