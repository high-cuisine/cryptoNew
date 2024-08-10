 import {FC, useState} from "react";

import styles from "./styles.module.css";
import { InvitesList } from "../../components/Invites/InvitesList/InvitesList";
import { InvitesModal } from "../../components/Invites/InvitesModal/InvitesModal";

interface InvitesProps {
}

export const Invites: FC<InvitesProps> = () => {
    const name = 'Vladimir Dzen'
    const image = 'src/assets/images/user.png';

    const [modal, setModal] = useState(false);
    
    function setModalOpen() {
        setModal(prevModal => !prevModal);
    }
    return (
        <div className={styles.container}>
            <div className={styles.userHeader}>
                <img src={image}></img>
                <span>{name}</span>
            </div>
            <div className={styles.buttonLink}>
                <button className={styles.button} onClick={() => {setModalOpen()}}>
                    Your link
                </button>
            </div>
            <p className={styles.text}>Score 10% from friends
            Get a ticket for each friend</p>
            <button className={styles.rewardsButton}>
                Claim friend rewards
            </button>
            <InvitesList></InvitesList>
            <InvitesModal visible={modal} setVisible={setModalOpen}></InvitesModal>
        </div>
    );
}

