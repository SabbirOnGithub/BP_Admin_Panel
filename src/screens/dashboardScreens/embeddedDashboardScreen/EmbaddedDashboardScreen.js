import React from 'react'
import { Grid } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";

const iframe = `<iframe style="width: 100%;height:1627px;" scrolling="yes" title="fx." src=${process.env.PUBLIC_URL+"/iframeFiles/embaddedPage.html"} frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>`;
// const iframe = `<iframe style="width: 100%;height:70vh" scrolling="no" title="fx." src=${process.env.PUBLIC_URL+"/iframeFiles/load.html"} frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>`;

function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }

export default function EmbaddedDashboardScreen() {
    return (

            <>
                <PageTitle 
                title="Embaded Dashboard" 
            />
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Iframe iframe={iframe} />
                    </Grid>
                </Grid>
            </>
    )
}
