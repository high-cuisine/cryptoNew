import { FC, useState } from "react";
import styles from "./styles.module.css";

interface LeguageBannerProps {}

const LeguageBanner: FC<LeguageBannerProps> = () => { 
    const [coins, setCoins] = useState<number>(2500);
    const max = 5000;

    return (
        <div className={styles.main}>
            <span>You’re in the jupiter league</span>
            <span className={styles.coins}>{coins}/{max}</span>
            <div
                className={styles.progressLine}
                style={{
                    background: `linear-gradient(90deg, rgba(0,255,96,1) ${Math.min(100 - (coins / max) * 100)}%, rgba(217,217,217,1)  ${Math.min(100 - (coins / max) * 100)}%)`
                }}
            ></div>
        </div>
    );
}

export default LeguageBanner;