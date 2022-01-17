import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }
    const onClickFilterHandler = (value: FilterValuesType) => {props.changeFilter(value)}
    const removeTaskHandler = (tID:string) => {props.removeTask(tID)}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return(
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>removeTaskHandler(t.id)}>x</button>
                    </li>)
                })
            }
        </ul>
        <div>
            <button onClick={() => onClickFilterHandler("all")}>All</button>
            <button onClick={() => onClickFilterHandler("active")}>Active</button>
            <button onClick={() => onClickFilterHandler("completed")}>Completed</button>
        </div>
    </div>
}
