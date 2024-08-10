import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "~features/redux/store.ts";
import {I18nextProvider} from "react-i18next";
import i18n from "~features/i18n";
import {SDKProvider} from "@telegram-apps/sdk-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <SDKProvider>
                <Suspense fallback="loading">
                    <App/>
                </Suspense>
            </SDKProvider>
        </I18nextProvider>
    </Provider>
)
