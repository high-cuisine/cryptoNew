import {FC} from "react";

import styles from "./styles.module.css";
import TasksList from "../../components/tasks/TasksList/TasksList";


interface TasksProps {
}

export const Tasks: FC<TasksProps> = () => {
  
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Tasks</h1>
            <TasksList></TasksList>
       
        </div>
    );
}

