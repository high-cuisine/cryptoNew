import {FunctionComponent} from "react"

import styles from "./styles.module.css"
import {useAppDispatch, useAppSelector} from "~features/redux/store";
import {getCurrentUser, logout} from "~features/account/slice";
import {BaseButton} from "~ui-kit/base/buttons/BaseButton";
import {NavLink} from "react-router-dom";

export const Dashboard: FunctionComponent = () => {
    const dispatch = useAppDispatch()

    const user = useAppSelector(getCurrentUser)

    const logoutMe = () => {
        dispatch(logout())
    }

    return (
        <div>
            <NavLink to="users">Users</NavLink>
            <BaseButton onClick={logoutMe}>
                Logout
            </BaseButton>
        </div>
    )
}
