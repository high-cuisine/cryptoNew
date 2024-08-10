import { FC } from "react";
import styles from "./style.module.css";


interface TaskModal {
    action: string;
    exercise: string;
    link: string;
    statusTask: number;
    prise: number
}

const TaskModal: FC<TaskModal> = () => {


    return (
        <div className={styles.main}>
            
        </div>
    );
}

export default TaskModal;