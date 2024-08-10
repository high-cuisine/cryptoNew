import {FC} from "react";

import styles from "./styles.module.css";
import {LeagueCard} from "../LeagueCard";
import {getRandomInt} from "../../../game/helpers/random.ts";

interface LeagueListProps {
}

export const LeagueList: FC<LeagueListProps> = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                league score
            </h3>
            <div className={styles.list}>
                {Array(10).fill(0).map((_, idx) => (
                    <LeagueCard key={idx} position={idx+1} nickname="TEST" score={getRandomInt(1000, 1000000)}/>
                ))}
            </div>
        </div>
    );
}

