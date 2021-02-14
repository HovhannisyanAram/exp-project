import React from 'react';
import styles from './task.module.css';
const Task = ({ task, active  ,active2}) => {
    const cls = [styles.task];
    if (active){
        cls.push(styles.first);
        cls.push(styles.third);
    }
    if(active2) 
        cls.push(styles.second)

    return (
        <div className={cls.join(' ')}>
            <p>
                {task}
            </p>
        </div>
    )
}

export default Task;