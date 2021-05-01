import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { Form } from '../../../../components/UseForm/useForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Loading from '../../../../components/Loading/Loading';

export default function CtaFormStepThree(props) {

    const { values,
        errors,
        recordForEdit,
        setValues,
        handleFileChange,
        resetFileInput,
        handleSubmitFile,
        ctaFunctionDocuments,
        // setConfirmDialog,
        onDeleteCtaFunctionDocument,
        loadingCtaFunctionDocuments,
        loadingDeleteCtaFunctionDocument,
        loadingCtaFunction,
        loadingCtaFunctionSave,
        loadingCtaFunctionDocumentSave,
        // setHideNext
    } = props;

    // if(!values.id || loadingCtaFunction || loadingCtaFunctionSave || loadingCtaFunctionDocumentSave){
    //     setHideNext(true)
    // }else{
    //     setHideNext(false)
    // }

    useEffect(() => {
        if (recordForEdit != null) {
            try {
                setValues({
                    ...recordForEdit,
                })
            } catch (e) {
                console.warn(e);
            }
        }
    }, [recordForEdit, setValues])

    return (
        <>
            {
                !values.id || loadingCtaFunction || loadingCtaFunctionSave || loadingCtaFunctionDocumentSave ? <Loading /> :
                    <Form onSubmit={handleSubmitFile}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Controls.FileInput
                                    name="file"
                                    label="Documents"
                                    value={values.file}
                                    onChange={handleFileChange}
                                    error={errors.file}
                                    resetFileInput={resetFileInput}
                                />
                                <Controls.Button
                                    type="submit"
                                    text="Upload" />
                            </Grid>
                        </Grid>
                    </Form>
            }
            <Grid item xs={12} md={12} style={{ marginTop: 30 }}>
                <Typography variant="h6" className={'classes.title'}>
                    List of documents
          </Typography>
                <div className={'classes.demo'}>
                    <List dense={false}>

                        {
                            loadingCtaFunctionDocuments || loadingDeleteCtaFunctionDocument ? <Loading /> :
                                ctaFunctionDocuments?.map(item => (
                                    <div key={item?.id}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar >
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item?.fileUrl?.split("/").pop()}
                                            // secondary={secondary ? 'Secondary text' : null}
                                            />
                                            <ListItemSecondaryAction
                                                onClick={() => {
                                                    onDeleteCtaFunctionDocument(item.id)
                                                    // setConfirmDialog({
                                                    //     isOpen: true,
                                                    //     title: 'Are you sure to delete this record?',
                                                    //     subTitle: "You can't undo this operation",
                                                    //     onConfirm: () => { onDeleteCtaFunctionDocument(item.id) }
                                                    // })
                                                }}
                                            >
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </div>
                                ))
                        }

                    </List>
                </div>
            </Grid>

        </>
    )
}
