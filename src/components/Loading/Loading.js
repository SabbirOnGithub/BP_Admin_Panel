import React from 'react'
import {
    CircularProgress,
  } from "@material-ui/core";

export default function Loading(props) {
    const {size} = props

    return (
        <div>
            <CircularProgress size={size ? size : 26} />
        </div>
    )
}
