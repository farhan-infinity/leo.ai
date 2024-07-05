// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Cleave from 'cleave.js/react'

// ** Reactstrap Imports
import { FormFeedback, Label } from 'reactstrap'

export const NumberOfImages = ({ formik }) => {
    const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

    return (
        <Fragment>
            <Label for='number-of-images'>Number of images</Label>
            <Cleave
                className='form-control'
                placeholder='Enter between 1 to 4'
                options={options}
                {...formik.getFieldProps('numOfImages')}
                onChange={formik.handleChange('numOfImages')}
                id='number-of-images'
                invalid={formik.touched.numOfImages &&
                    formik.errors.numOfImages ? true : false}
            />
            {formik.touched.numOfImages && formik.errors.numOfImages ? (
                <FormFeedback type="invalid">
                    {formik.errors.numOfImages}
                </FormFeedback>
            ) : null}
        </Fragment>
    )
}

export const NumeralInterferenceSteps = ({ formik }) => {
    const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

    return (
        <Fragment>
            <Label for='numInferenceSteps'>Numeral Inference Steps</Label>
            <Cleave
                className='form-control'
                placeholder='Enter between 30 to 60'
                options={options}
                {...formik.getFieldProps('numInferenceSteps')}
                onChange={formik.handleChange('numInferenceSteps')}
                id='numInferenceSteps'
                invalid={formik.touched.numInferenceSteps &&
                    formik.errors.numInferenceSteps ? true : false}
            />
            {formik.touched.numInferenceSteps && formik.errors.numInferenceSteps ? (
                <FormFeedback type="invalid">
                    {formik.errors.numInferenceSteps}
                </FormFeedback>
            ) : null}
        </Fragment>
    )
}

export const GuidanceScale = ({ formik }) => {
    const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

    return (
        <Fragment>
            <Label for='guidanceScale'>Guidance Scale</Label>
            <Cleave
                className='form-control'
                placeholder='Enter between 1 and 20'
                {...formik.getFieldProps('guidanceScale')}
                onChange={formik.handleChange('guidanceScale')}
                options={options}
                id='guidanceScale'
                invalid={formik.touched.guidanceScale &&
                    formik.errors.guidanceScale ? true : false}
            />
            {formik.touched.guidanceScale && formik.errors.guidanceScale ? (
                <FormFeedback type="invalid">
                    {formik.errors.guidanceScale}
                </FormFeedback>
            ) : null}
        </Fragment>
    )
}

