import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { config } from "../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL;

const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
        fontSize:'1.2rem',
      },
    },
    customPharagraph: {
        ...theme?.customPharagraph
    },
  }));
const DocumentsLink = (props) => {
    const  {docList} = props;
    const classes = useStyles();
    return (
        <div>
           
            {docList?.map((item,index)=>{
                // return BASE_ROOT_URL + "/" + item.fileUrl.split("\\").join('/')
                return (
                    <Typography className ={clsx(classes.root, classes.customPharagraph)}  key={item?.id}>
                        
                        <b>{index+1}.</b>
                        {   item?.fileUrl &&
                            <>
                                <Link href={BASE_ROOT_URL + "/" + item?.fileUrl?.split("\\").join('/')} target="_blank" rel="noopener">
                                {item?.fileUrl?.split("\\").join('/').split('/').pop()}
                                </Link>
                            </>
                        }
                        
                    </Typography>
                )
            })
            }
        </div>
    );
};

export default DocumentsLink;