import { FC, useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

interface TasksItemProps {
    action: string;
    exercise: string;
    link: string;
    statusTask: number;
    prise: number
}

const TasksItem: FC<TasksItemProps> = ({ action, exercise, link, statusTask, prise}) => {
    const [status, setStatus] = useState(statusTask);
    
    const handleStatusChange = () => {
        if (status === 0) {
            setStatus(1);
        } else if (status === 1) {
            setStatus(2);
        } 
    };

    const rootClasses = [styles.item];

    if(statusTask === 1) {
        rootClasses.push(styles.active);
    } else
    if(statusTask === 2) {
        rootClasses.push(styles.done);
    }

    function getStatusButton() {
        if(statusTask === 0)
        {
            return (
                <button className={styles.claim}>
                    CLAIM
                </button>
            );
        }
        if(statusTask === 1) {
            return (
                <button className={styles.work}>
                    {`+${prise}$`}
                </button>
            );
        }
        if(statusTask === 2) {
            return (
                <button className={styles.claim} disabled>
                    {`DONE`}
                </button>
            );
        }
    }

    return (
        <li className={rootClasses.join(' ')}>
            <div className={styles.textCont}>
                <span className={styles.action}>{action}</span>
                <span className={styles.name}>{exercise}</span>
            </div>
            <div className={styles.statusCont} onClick={handleStatusChange}>
                {getStatusButton()}
            </div>
        </li>
    );
}

export default TasksItem;