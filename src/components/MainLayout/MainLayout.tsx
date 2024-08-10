import {FC} from "react";

import styles from "./styles.module.css";
import {Outlet} from "react-router-dom";
import {NavigationMenu} from "../../components/NavigationMenu";

interface MainLayoutProps {
}

export const MainLayout: FC<MainLayoutProps> = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.layout}>
                <Outlet/>
                <div className={styles.menuWrapper}>
                    <NavigationMenu/>
                </div>
            </div>
        </div>
    );
}

