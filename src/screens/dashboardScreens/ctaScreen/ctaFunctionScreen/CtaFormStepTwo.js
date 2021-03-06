import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { Form } from '../../../../components/UseForm/useForm';
import Loading from '../../../../components/Loading/Loading';


export default function CtaFormStepTwo(props) {

    const { values, 
            handleInputChange,
            handleDateInput,
            errors, 
            recordForEdit, 
            setValues, 
            ctaFunctionModels, 
            setHideNext,
            loadingCtaFunctionSave, 
        } = props;
 
    useEffect(() => {
        // console.log(values.id)
        if(!values.id || !ctaFunctionModels){
            setHideNext(true)
        }
        else{
            setHideNext(false)
        }
        if (recordForEdit != null) {
            // console.log(values.id)

            try {
                setValues({
                    ...recordForEdit,
                })
            } catch (e) {
                console.warn(e);
            }
        }
        // eslint-disable-next-line
    }, [
        // ctaFunctionModels, 
        setHideNext, 
        recordForEdit, 
        setValues,
        values.id
    ])
    return (
        <>
            {!values.id || !ctaFunctionModels || loadingCtaFunctionSave ? <Loading /> :
                <Form>
                    <Grid container>
                        <Grid item xs={12}>
                            <Controls.DatePickerCustom
                                name="estimation"
                                label="Estimation"
                                value={values.estimation ? values.estimation : null}
                                onChange={handleDateInput}
                                error={errors.estimation}
                                placeholder = 'When do you need to have this solution created?'
                                disablePast
                                message = "If you're unsure, please give the estimate you can."
                            />
                            
                            <Controls.InputAutoSize
                                name="tellUsMore"
                                label="Tell Us More"
                                placeholder="Tell us more about the need for this solution/service"
                                value={values.tellUsMore}
                                onChange={handleInputChange}
                                error={errors.tellUsMore}
                            />
                            <Controls.InputAutoSize
                                name="description"
                                label="Description"
                                placeholder="Please describe what you'd like done in under 500 words"
                                value={values.description}
                                onChange={handleInputChange}
                                error={errors.description}
                                maxLength="500"
                            />

                        </Grid>
                    </Grid>
                </Form>
            }

        </>
    )
}
