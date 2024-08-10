import {BaseQueryFn, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {
    getRefreshToken,
    setRefreshToken
} from "~helpers/token";
import {logout, setStoreAccessToken} from "~features/account/slice";
import {refreshAccessTokenQueryResult} from "~features/account/types";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.BACKEND_API_URL,
    prepareHeaders: (headers, {getState}: any) => {
        const accessToken = getState().account.accessToken

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }

        return headers
    },
})

export const authorizedBaseQuery: BaseQueryFn = async (args, baseQueryApi, extraOptions) => {
    let result = await baseQuery(args, baseQueryApi, extraOptions)

    if(result?.error?.status === 401) {
        const refreshToken = getRefreshToken()

        const refreshResult = await baseQuery({
            url: "account/token/refresh",
            method: "POST",
            body: {
                refresh: refreshToken,
            }
        }, baseQueryApi, extraOptions)

        if (refreshResult.data) {
            setRefreshToken((refreshResult.data as refreshAccessTokenQueryResult).refresh)

            baseQueryApi.dispatch(setStoreAccessToken((refreshResult.data as refreshAccessTokenQueryResult).access))

            result = await baseQuery(args, baseQueryApi, extraOptions)
        }
        else {
            baseQueryApi.dispatch(logout())
        }
    }

    return result
}
