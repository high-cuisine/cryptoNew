import {User} from "~appTypes/user";
import {AccessToken, RefreshToken} from "~appTypes/token";

export type signInQueryResult = {
    tokens: {
        access: AccessToken,
        refresh: RefreshToken,
    }
}
export type signInQueryArgs = {
    password: string,
} & Pick<User, "email">


export type profileQueryResult = User
export type profileQueryArgs = void

export type refreshAccessTokenQueryResult = {
    access: AccessToken,
    refresh: RefreshToken,
}
export type refreshAccessTokenQueryArgs = void
