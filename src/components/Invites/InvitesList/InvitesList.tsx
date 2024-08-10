import {FC} from "react";

import styles from "./style.module.css";


interface InvitesList {
}

export const InvitesList: FC<InvitesList> = () => {
    const friend = [
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },
        {
            name:'Friend1',
            money:1000,
        },
        {
            name:'Friend1',
            money:10,
        },
        {
            name:'Friend1',
            money:100,
        },

    ]

    function sortByMoneyDescending(arr) {
        return arr.sort((a, b) => b.money - a.money);
    }

    console.log(sortByMoneyDescending(friend))

    return (
        <div className={styles.main}>
            <ul className={styles.list}>
            {sortByMoneyDescending(friend).map((el) => {
                return (
                    <li className={styles.item}>
                        <div className={styles.itemCont}>
                            <span>{el.name}</span>
                            <span>{`${el.money}S`}</span>
                        </div>
                        
                    </li>
                )
            })}
            </ul>
         
        </div>
    );
}

