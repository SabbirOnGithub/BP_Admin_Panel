/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from '@material-ui/core';
import Controls from "./Controls";
import CloseIcon from '@material-ui/icons/Close';
import { config } from "../../config";

const BASE_ROOT_URL = config.BASE_ROOT_URL;

export default function FileInput(props) {

    const { name, value, label, onChange, resetFileInput, error, ...other } = props;

    const pictureUrl = value ? (typeof value === 'object' ? URL.createObjectURL(value) : (BASE_ROOT_URL + "/" + value.split("\\").join('/'))) : ''
    // console.log(pictureUrl)
    return (
        <>
            <div style={{ margin: 5 }}>
                <Button
                    variant="contained"
                    component="label"
                    style={{ marginBottom: 10, marginRight:10 }}
                >
                    Upload File
                         <input
                        name={name}
                        type="file"
                        onChange={onChange}
                        hidden
                    />
                </Button>
            {/* <span style={{ marginLeft: 5 }}>{value ? value.name : 'no file'}</span> */}
            <span>
               {/* { console.log(value)} */}
                {value && (
                    // value?.type?.includes('image') ?
                    pictureUrl ?
                    <>
                        <img src={pictureUrl} style={{ maxWidth: 300, maxHeight: 100, border: '2px solid #798dfe', padding: 5, verticalAlign: 'middle' }} alt="uploaded file" />
                        <span style={{ marginLeft: -39, verticalAlign: 'top' }}>
                            <Controls.ActionButton
                                color="secondary"
                                onClick={() => { resetFileInput(name) }}
                            // name={name}
                            >
                                <CloseIcon />
                            </Controls.ActionButton>
                        </span>

                    </> 
                    :
                    <>
                            <span> {value?.name} </span>
                            <span style={{ marginLeft: 2, verticalAlign: 'top' }}>
                                <Controls.ActionButton
                                    color="secondary"
                                    onClick={() => { resetFileInput(name) }}
                                // name={name}
                                >
                                    <CloseIcon />
                                </Controls.ActionButton>
                            </span>
                    </>
                    )
                }
                
            </span>
            <label style={{ fontSize: 14, margin: 5, maxWidth:15 }}> {label} </label>
        </div>
        </>
    )
}
