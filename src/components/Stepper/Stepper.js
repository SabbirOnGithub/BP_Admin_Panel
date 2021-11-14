import Button from "@material-ui/core/Button";
// import Typography from '@material-ui/core/Typography';
import MobileStepper from "@material-ui/core/MobileStepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mobileStepperRoot: {
    maxWidth: "100%",
    flexGrow: 1,
    position: "center",
    marginBottom: 30,
  },
  MuiMobileStepperProgress: {
    width: "90%",
  },
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "red !important",
  },
}));

// function getSteps() {
//   return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
// }

// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return 'Select campaign settings...';
//     case 1:
//       return 'What is an ad group anyways?';
//     case 2:
//       return 'This is the bit I really care about!';
//     default:
//       return 'Unknown stepIndex';
//   }
// }

export default function HorizontalStepper(props) {
  const {
    getSteps,
    getStepContent,
    handleNext,
    handleBack,
    handleReset,
    activeStep,
    progressBar,
    hideNext,
  } = props;
  // console.log(hideNext)
  const classes = useStyles();
  //   const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  //   const handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //   };

  return (
    <div className={classes.root}>
      {progressBar ? (
        <MobileStepper
          variant="progress"
          steps={steps?.length}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepperRoot}
        />
      ) : (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      <div>
        {activeStep === steps.length - 1 ? (
          <div>
            {/* <Typography className={classes.instructions}> 
                
            </Typography> */}
            <SuccessDialog title="Form Submission Successful" subTitle = "Click finish to go back to consultancy list" />
            {/* <Button onClick={handleReset}>Finish</Button> */}
            <div style={{ marginTop: 10 }}>
              <Button
                variant="contained"
                color="primary"
                className="btn-finish"
                onClick={handleReset}
                style={{ display: "flex", margin: "auto" }}
              >
                Finish
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
            <div style={{ marginBottom: 20 }}>{getStepContent(activeStep)}</div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={`btn-back ${classes.backButton}`}
              >
                Back
              </Button>
              {hideNext ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className="btn-next"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
