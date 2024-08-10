import {User} from "~appTypes/user";
import {createSlice} from "@reduxjs/toolkit";
import {AccessToken} from "~appTypes/token";
import {accountApi} from "~features/account/api";
import {removeRefreshToken, setRefreshToken} from "~helpers/token";

type RootState = {
    user: User | null,
    accessToken: AccessToken | null,
}

const initialState : RootState = {
    user: null,
    accessToken: null,
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            const {user} = action.payload

            state.user = user
        },
        setStoreAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null

            removeRefreshToken()
        }
    },
    extraReducers: builder => {
        builder.addMatcher(accountApi.endpoints.signIn.matchFulfilled, (state, {payload}) => {
            state.accessToken = payload.tokens.access

            setRefreshToken(payload.tokens.refresh)
        })
        builder.addMatcher(accountApi.endpoints.profile.matchFulfilled, (state, {payload}) => {
            state.user = payload
        })
        builder.addMatcher(accountApi.endpoints.profile.matchRejected, (state, {payload}) => {
            state.user = null
            state.accessToken = null

            removeRefreshToken()
        })
    }
})

export const {setUser, setStoreAccessToken, logout} = accountSlice.actions

export default accountSlice.reducer

export const getCurrentUser = (state: {account: RootState }) => state.account.user
export const getStoreAccessToken = (state: {account: RootState }) => state.account.accessToken
