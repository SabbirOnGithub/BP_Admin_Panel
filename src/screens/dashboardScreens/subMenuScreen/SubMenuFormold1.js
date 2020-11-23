import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  // Icon,
  Grid,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import axios from 'axios';
// 
const styles = theme => ({
    wrapper: {
        position: "relative"
      },
    
      buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
      }
  });

class SubMenuForm extends Component {
  state = {
    id:0,
    name: "",
    shortDescription:"",
    picture:"",
    loading:false
  };

 componentDidMount(){
    
     axios.get('http://bp.fiqheislami.com/api/SubMenu/1').then(res=>{
         this.setState({
             ...this.state,
             id:res.data.data.id,
             name:res.data.data.name,
             shortDescription:res.data.data.shortDescription,
             picture:res.data.data.pictureName
         })
     })
 }


  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let {
      name,shortDescription
    } = this.state;
    let { classes } = this.props;
    return (
      <div>
        <ValidatorForm
          ref="form"
        //   onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            
            <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Title"
                      onChange={this.handleChange}
                      type="text"
                      name="name"
                      value={name}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required"
                      ]}
                    />
                    <TextValidator
                      multiLine
                      rows="3"
                      className="mb-3 w-full"
                      label="Short Description"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="shortDescription"
                      type="text"
                      value={shortDescription}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
          
            </Grid>     
          </Grid>
          <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                        
                          color="primary"
                          disabled={this.loading}
                          type="submit"
                        >
                          Update
                        </Button>
                        {this.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
             </div>
        
        </ValidatorForm>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}


  export default withStyles(styles, { withTheme: true })(SubMenuForm);


  
