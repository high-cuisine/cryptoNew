import {ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, FunctionComponent} from "react"

import styles from "./styles.module.css"

interface BaseButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> {}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(({className, children, ...props}, ref) => {
    return (
        <button className={`${styles.button} ${className}`} {...props} ref={ref}>
            {children}
        </button>
    )
})
