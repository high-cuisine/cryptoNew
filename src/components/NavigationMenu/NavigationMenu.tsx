import {FC} from "react";

import styles from "./styles.module.css";
import {NavLink} from "react-router-dom";

interface NavigationMenuProps {
}

export const NavigationMenu: FC<NavigationMenuProps> = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.menu}>
                <div className={styles.menuWrapper}>
                    <NavLink className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`} to="/leaders">
                        leaders
                    </NavLink>
                    <NavLink className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`} to="/tasks">
                        tasks
                    </NavLink>
                    <NavLink className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`} to="/">
                        home
                    </NavLink>
                    <NavLink className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`} to="/invites">
                        invites
                    </NavLink>
                    <NavLink className={`${styles.item} ${styles.disabled}`} to="#">
                        soon
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

