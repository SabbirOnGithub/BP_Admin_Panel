import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { Form } from '../../../../components/UseForm/useForm';


export default function CtaFormStepTwo(props) {

    const { values, handleInputChange, errors, recordForEdit, setValues, ctaFunctionModels } = props;

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
            {!values.id || !ctaFunctionModels ? 'loading' :
                <Form>
                    <Grid container>
                        <Grid item xs={12}>
                        <Controls.DatePicker
                                name="estimation"
                                label="Estimation"
                                value={values.estimation ? values.estimation : null}
                                onChange={handleInputChange}
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
