import {FC} from "react";

import styles from "./style.module.css";


interface InvitesModal {
    visible:boolean;
    setVisible: () => void;
}



export const InvitesModal: FC<InvitesModal> = ({visible, setVisible}) => {

    const rootClasses = [styles.main];
    if(visible) {
        rootClasses.push(styles.active);
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <span>Invite friends</span>
                        <img src="src/assets/images/krest.svg" onClick={() => setVisible()}></img>
                    </div>
                    <div className={styles.body}>
                        <button>Copy invite link</button>
                        <button>Share invite link</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

