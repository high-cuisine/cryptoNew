import {createApi} from "@reduxjs/toolkit/query/react"

import {authorizedBaseQuery} from "~features/redux/baseQuery"

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['api'],
    baseQuery: authorizedBaseQuery,
    endpoints: () => ({}),
})
