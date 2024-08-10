import {FunctionComponent, ReactNode, useEffect, useMemo, useState} from "react"

import {User} from "~appTypes/user";
import {useAppSelector} from "~features/redux/store";
import {getCurrentUser, getStoreAccessToken} from "~features/account/slice";
import {useLazyProfileQuery} from "~features/account/api";
import {Outlet} from "react-router-dom";
import {getRefreshToken} from "~helpers/token";
import {use} from "i18next";

type PermittedComponentProps = {
    allowedGroups: ((User["groups"][number]["name"]) | null)[],
    fallback?: ReactNode | ReactNode[],
    children: ReactNode | ReactNode[],
    requiredPermissions?: undefined,
} | {
    requiredPermissions: (User["user_permissions"][number]["codename"])[] | (User["groups"][number]["permissions"][number]["codename"])[],
    fallback?: ReactNode | ReactNode[],
    children: ReactNode | ReactNode[],
    allowedGroups?: undefined,
}

export const PermittedComponent: FunctionComponent<PermittedComponentProps> = ({allowedGroups, requiredPermissions, fallback, children}) => {
    const user = useAppSelector(getCurrentUser)

    const accessToken = useAppSelector(getStoreAccessToken)
    const refreshToken = useMemo(() => getRefreshToken(), [accessToken])

    const [refetchProfile, {isLoading: isProfileLoading}] = useLazyProfileQuery()

    const [accessGranted, setAccessGranted] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const checkAccess = async () => {
            if (isProfileLoading) {
                return
            }

            if (!user && refreshToken) {
                return await refetchProfile()
            }

            if (allowedGroups) {
                const userGroups = user?.groups?.map(userGroup => userGroup.name) || [null]
                const isUserAllowed = userGroups.some(role => allowedGroups.includes(role))

                setAccessGranted(isUserAllowed)
            }
            else if (requiredPermissions) {
                const userPermissions = user?.user_permissions?.map(permission => permission.codename) || []
                const userGroupsPermissions = user?.groups?.map(group => group?.permissions?.map(permission => permission.codename)).flat() || []

                const permissions = [...userPermissions, ...userGroupsPermissions]

                const isUserAllowed = permissions.some(permission => requiredPermissions.includes(permission))

                setAccessGranted(isUserAllowed)
            }
        }

        checkAccess()
    }, [user, refreshToken]);

    if (isProfileLoading) {
        throw new Promise(() => {})
    }

    if (accessGranted === undefined) {
        return null
    }

    if (accessGranted) {
        return (
            children || <Outlet/>
        )
    }

    return fallback
}