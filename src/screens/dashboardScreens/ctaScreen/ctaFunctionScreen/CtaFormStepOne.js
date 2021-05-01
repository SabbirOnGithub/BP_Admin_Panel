import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { Form } from '../../../../components/UseForm/useForm';

export default function CtaFormStepOne(props) {
    const { values, 
            handleInputChange, 
            errors, 
            recordForEdit, 
            setValues, 
            user, 
            ctaFunctionModels, 
            handleMultipleSelectInputChange 
        } = props;
        
    const { email, mobile: phone, name: firstName } = user

    useEffect(() => {
        if (recordForEdit != null) {
            try {
                setValues({
                    ...recordForEdit,
                    email,
                    phone,
                    firstName
                })
            } catch (e) {
                console.warn(e);
            }
        }
    }, [recordForEdit, setValues, email, phone, firstName])

    return (
        <>
            {
                !ctaFunctionModels ? 'loading' :
                    <Form>
                        <Grid container>
                            <Grid item xs={12}>
                                <Controls.Select
                                    name="solutionSpecificity"
                                    label="Solution Specificity"
                                    value={values?.solutionSpecificity ? values?.solutionSpecificity : ''}
                                    onChange={handleInputChange}
                                    error={errors.solutionSpecificity}
                                    options={ctaFunctionModels?.solutionSpecificities ? ctaFunctionModels?.solutionSpecificities : []}
                                />
                                <Controls.InputAutoSize
                                    name="goalsToAchieveSolution"
                                    label="Goals To Achieve Solution"
                                    placeholder="What goals do you want to achieve with this solution?"
                                    value={values.goalsToAchieveSolution}
                                    onChange={handleInputChange}
                                    error={errors.goalsToAchieveSolution}
                                />
                                <Controls.Select
                                    name="serviceSpecificity"
                                    label="Service Specificity"
                                    value={values?.serviceSpecificity ? values?.serviceSpecificity : ''}
                                    onChange={handleInputChange}
                                    error={errors.serviceSpecificity}
                                    options={ctaFunctionModels?.serviceSpecificities ? ctaFunctionModels?.serviceSpecificities : []}
                                />
                                <Controls.InputAutoSize
                                    name="goalsToAchieveService"
                                    label="Goals To Achieve Service"
                                    placeholder="What goals do you want to achieve with this service?"
                                    value={values.goalsToAchieveService}
                                    onChange={handleInputChange}
                                    error={errors.goalsToAchieveService}
                                />
                                <Controls.SelectMultiple
                                    name="technologyPreference"
                                    label="Technology Preference"
                                    value={values?.technologyPreference ? values?.technologyPreference : []}
                                    onChange={(event, values) => { handleMultipleSelectInputChange(event, values, 'technologyPreference') }}
                                    error={errors.technologyPreference}
                                    options={ctaFunctionModels?.techStacks ? ctaFunctionModels?.techStacks : []}
                                />
                                <Controls.InputAutoSize
                                    name="goalsToAchieveTechnology"
                                    label="Goals To Achieve Technology"
                                    placeholder="What goals do you want to achieve with this technology?"
                                    value={values.goalsToAchieveTechnology}
                                    onChange={handleInputChange}
                                    error={errors.goalsToAchieveTechnology}
                                />

                            </Grid>
                        </Grid>
                    </Form>

            }
        </>

    )
}
