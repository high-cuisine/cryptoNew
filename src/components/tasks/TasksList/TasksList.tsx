import { FC } from "react";
import styles from "./style.module.css";
import TasksItem from "../TaskItem/TaskItem";

interface TasksListProps {
    
}



const TasksList: FC<TasksListProps> = () => { 

    const tasks = [
        { action: 'Subscribe', title: 'Join our x community', status: 0, link: '#', prise: 100 },
        { action: 'Subscribe', title: 'Join our x community', status: 1, link: '#', prise: 100 },
        { action: 'Subscribe', title: 'Join our x community', status: 2, link: '#', prise: 100 },
    ];

    return (
        <div className={styles.main}>
            <ul className={styles.list}>
                {tasks.map((el)=> {
                    return (
                        <TasksItem action={el.action} exercise={el.title} link={el.link} statusTask={el.status} prise={el.prise}></TasksItem>
                    )
                })}
            </ul>
        </div>
    );
}

export default TasksList;