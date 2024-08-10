import {api} from "~features/redux/api";
import {
    profileQueryArgs,
    profileQueryResult,
    signInQueryArgs,
    signInQueryResult
} from "~features/account/types";
import {getRefreshToken} from "~helpers/token";

export const accountApi = api.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation<signInQueryResult, signInQueryArgs>({
            query: ({...data}) => ({
                url: "account/sign-in",
                method: "POST",
                body: data,
            })
        }),
        profile: builder.query<profileQueryResult, profileQueryArgs>({
            query: () => ({
                url: "account/profile",
                method: "GET",
            })
        }),
    })
})

export const {
    useSignInMutation,
    useProfileQuery,
    useLazyProfileQuery,
} = accountApi
