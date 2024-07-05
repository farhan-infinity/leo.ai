import React, { useEffect, Fragment } from 'react'
import Select, { components } from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils'


// ** Reactstrap Imports
import { Col, FormFeedback, Label } from 'reactstrap'

export const Language = ({ formik, language, languageName, setLanguageName }) => {
    const handleChange = (value) => {
        if (!value) {
            return
        }
        setLanguageName(value.value)
        formik.handleChange('providerType')
        formik.getFieldProps('providerType')
    }

    const { Option } = components;
    const IconOption = (props) => (
        <Option {...props}>
            <img
                className="px-1"
                src={props.data.icon}
                style={{ width: 55 }}
                alt={props.data.label}
            />
            {props.data.label}
        </Option>
    );

    return (
        <div className='w-full mb-1 mt-1'>
            {/* <Col className='mb-1 mt-1' md='12' sm='12'> */}
            <Label className='form-label'>Language</Label>
            <Select
                menuPlacement="top"
                theme={selectThemeColors}
                className='react-select dark-react-select'
                classNamePrefix='select'
                name='providerType'
                id='providerType'
                onBlur={formik.handleBlur}
                onChange={(e) => handleChange(e)}
                options={language}
                components={{ Option: IconOption }}
                placeholder="Select Language"
                isClearable
                invalid={formik.touched.providerType &&
                    formik.errors.providerType ? true : false}
            />
            {formik.touched.providerType && formik.errors.providerType ? (
                <FormFeedback type="invalid">
                    {formik.errors.providerType}
                </FormFeedback>
            ) : null}
            {/* </Col> */}
        </div >
    )
}

const Menu = (props) => {
    return (
        <Fragment>
            <components.Menu {...props}>
                {props.children}
            </components.Menu>
        </Fragment>
    );
};


export const Voices = ({ formik, getLanguage, voices }) => {
    const groupedOptions = [
        {
            label: 'Male',
            options: voices?.male?.map((item) => {
                return ({ label: item.name, value: item.name, type: item.type, voice_id: item.voice_id })
            })
        },
        {
            label: 'Female',
            options: voices?.female?.map((item) => {
                return ({ label: item.name, value: item.name, type: item.type, voice_id: item.voice_id })
            })
        },
    ];
    const handleChange = (value) => {
        if (!value) {
            return
        }
        formik.values.providerType = value.type
        formik.values.providerVoiceId = value.voice_id
        formik.getFieldProps('providerVoiceId')
    }
    return (
        <div className='mt-1'>
            <Label className='form-label'>Voices</Label>
            <Select
                isDisabled={!voices ? true : false}
                onChange={(value) => handleChange(value)}
                menuPlacement="top"
                className='react-select dark-react-select'
                classNamePrefix='select'
                onBlur={formik.handleBlur}
                options={groupedOptions}
                components={{ Menu }}
                isSearchable={false}
                placeholder={!voices ? "Select Language First..." : "Select Voice..."}
                isClearable
                invalid={formik.touched.providerVoiceId &&
                    formik.errors.providerVoiceId ? true : false}
            />
            {formik.touched.providerVoiceId && formik.errors.providerVoiceId ? (
                <FormFeedback type="invalid">
                    {formik.errors.providerVoiceId}
                </FormFeedback>
            ) : null}

        </div>

    )
}

export const VideoDimensions = ({ formik }) => {
    const handleChange = (value) => {
        if (!value) {
            return
        }
        formik.values.imageRatioType = value.value
        formik.getFieldProps('imageRatioType')
    }

    const options = [
        {
            label: 'Horizantal (16:9)', value: "horizantal",

        },
        {
            label: 'Vertical (9:16)', value: 'vertical'
        }
    ]


    return (
        <div className='w-full mb-1 mt-1'>
            {/* <Col className='mb-1' md='12' sm='12'> */}
            <Label className='form-label'>Aspect ratio</Label>
            <Select
                // defaultValue={{ label: '', value: '' }}
                // menuPlacement="top"
                theme={selectThemeColors}
                className='react-select dark-react-select'
                classNamePrefix='select'
                name='imageRatioType'
                id='imageRatioType'
                onBlur={formik.handleBlur}
                onChange={(value) => handleChange(value)}
                options={options}
                isClearable
                invalid={formik.touched.imageRatioType &&
                    formik.errors.imageRatioType ? true : false}
            />
            {formik.touched.imageRatioType && formik.errors.imageRatioType ? (
                <FormFeedback type="invalid">
                    {formik.errors.imageRatioType}
                </FormFeedback>
            ) : null}
            {/* </Col> */}
        </div >
    )
}

