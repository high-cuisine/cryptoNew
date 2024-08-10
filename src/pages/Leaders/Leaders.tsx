import {FC} from "react";

import styles from "./styles.module.css";
import {LeagueList} from "~components/league/LeagueList";
import {LeagueSwiper} from "~components/league/LeagueSwiper";
import LeguageBanner from "../../components/league/LegueBanner/LegueBanner";

interface LeadersProps {
}

export const Leaders: FC<LeadersProps> = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>
                leaderboard
            </h1>
            
            <LeagueSwiper/>
            <LeguageBanner></LeguageBanner>
            <LeagueList/>
        </div>
    );
}

