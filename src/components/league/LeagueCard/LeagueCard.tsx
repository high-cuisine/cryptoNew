import {FC} from "react";

import styles from "./styles.module.css";

interface LeagueCardProps {
    position: number,
    nickname: string,
    score: number,
}

export const LeagueCard: FC<LeagueCardProps> = ({position, nickname, score}) => {
    return (
        <div className={styles.card}>
            <div className={styles.label}>
                <span className={styles.positionMarker}>
                    {position}
                </span>
                <span className={styles.nickname}>
                    {nickname}
                </span>
            </div>
            <span className={styles.score}>
                {score}$
            </span>
        </div>
    );
}

