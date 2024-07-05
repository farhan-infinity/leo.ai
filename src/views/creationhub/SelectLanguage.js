import React from "react";
import Select, { components } from "react-select";
import english from "./svg/english.png"
import spanish from "./svg/spain.png"
import italy from "./svg/italy.png"
import france from "./svg/france.png"

let options = [
    { label: "English", value: "english", icon: english },
    { label: "Spanish", value: "spanish", icon: spanish },
    { label: "Italian", value: "italian", icon: italy },
    { label: "French", value: "french", icon: france },
]



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

export const SelectLanguage = ({ setLanguage }) => {
    const handleChange = (value) => {
        if (!value) {
            return
        }
        setLanguage(value.value)
    }
    return (
        <Select
            menuPlacement="bottom"
            className='react-select dark-react-select'
            classNamePrefix='select'
            name='language'
            id='language'
            // defaultValue={options[0]}
            options={options}
            components={{ Option: IconOption }}
            onChange={(value) => handleChange(value)}
            placeholder="Select Language"
            isClearable
        />
    );
};
