import {Suspense, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

import {PrimaryLoader} from "./ui-kit/styled/loaders/PrimaryLoader";

import GuestRoutes from "./routes/guest";

import styles from "./App.module.css"
import {useExpand} from "@vkruglikov/react-telegram-web-app";


export const App = () => {
    const [isExpanded, setExpanded] = useExpand();

    useEffect(() => {
        setExpanded();
    }, [isExpanded]);

    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Suspense fallback={<PrimaryLoader/>}>
                    <GuestRoutes/>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}
