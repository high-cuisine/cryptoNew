import {DetailedHTMLProps, FunctionComponent, InputHTMLAttributes, useId} from "react"

import styles from "./styles.module.css"
import {useField, UseFieldConfig} from "react-final-form";
import {InputErrorLabel} from "../../labels/InputErrorLabel";


interface BaseInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string,
    config?: UseFieldConfig<unknown>,
}


export const BaseInput: FunctionComponent<BaseInputProps> = ({name, label, config, className, ...props}) => {
    const id = useId()

    const {input, meta} = useField(name || props?.id || id, config)

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={input.name} className={styles.label}>{label}</label>
            <>
                <InputErrorLabel error={meta.error} touched={meta.touched}/>
                <input {...props} {...input} id={props?.id || id} className={`${className || ""} ${styles.input}`}/>
            </>
        </div>
    )
}
