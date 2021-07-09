import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { config } from "../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL;

const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));
const DocumentsLink = (props) => {
    const  {docList} = props;
    const classes = useStyles();
    return (
        <div>
           
            {docList?.map(item=>{
                // return BASE_ROOT_URL + "/" + item.fileUrl.split("\\").join('/')
                return (
                <Typography className={classes.root} key={item.id}>
                    <Link href={BASE_ROOT_URL + "/" + item.fileUrl.split("\\").join('/')} target="_blank" rel="noopener">
                        {item.fileUrl.split("\\").join('/').split('/').pop()}
                    </Link>
                </Typography>)
            })
            }
        </div>
    );
};

export default DocumentsLink;