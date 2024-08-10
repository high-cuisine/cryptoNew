import React, {FunctionComponent} from "react"

import styles from "./styles.module.css"

export const PrimaryLoader: FunctionComponent = () => {
    return (
        <div className={styles.loadingBar}>
            <div className={styles.loader}></div>
            <div className={styles.mask}></div>
        </div>
    )
}