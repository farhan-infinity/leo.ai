import React from 'react'
import classnames from 'classnames'
import { Card, CardBody, FormFeedback, Input, Label } from 'reactstrap'


const TextArea = ({ formik }) => {

    return (
        <CardBody>
            <div className='form-floating mb-0'>
                <Input
                    {...formik.getFieldProps('text')}
                    value={formik.values.textarea}
                    name='textarea'
                    type='textarea'
                    id='textarea'
                    placeholder='Enter your script'
                    style={{ minHeight: '300px' }}
                    onChange={formik.handleChange('textarea')}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.textarea &&
                        formik.errors.textarea ? true : false}
                    className={classnames({ 'text-danger': formik?.values?.textarea?.length > 4000 })}
                />

                <Label htmlFor="textarea" className='form-label hidden' for='text-counter'>
                    Counter
                </Label>
                <span
                    className={classnames('textarea-counter-value float-end', {
                        'bg-danger': formik?.values?.textarea?.length > 4000
                    })}
                >
                    {`${formik?.values?.textarea?.length}/4000`}
                </span>
                {formik.touched.textarea && formik.errors.textarea ? (
                    <FormFeedback type="invalid">
                        {formik.errors.textarea}
                    </FormFeedback>
                ) : null}
            </div>
        </CardBody>

    )
}

export default TextArea