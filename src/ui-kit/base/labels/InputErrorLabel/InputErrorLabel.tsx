import {FunctionComponent} from "react"

import styles from "./styles.module.css"


interface InputErrorLabelProps {
    error?: string | string[],
    touched?: boolean,
    className?: string,
}


export const InputErrorLabel: FunctionComponent<InputErrorLabelProps> = ({error, touched, className}) => {
    if(touched && error) {
        if (Array.isArray(error)) {
            return (
                <p className={`${styles.error} ${className || ""}`}>
                    {error[0]}
                </p>
            )
        }
        return (
            <p className={`${styles.error} ${className || ""}`}>
                {error}
            </p>
        )
    }
    return null
}