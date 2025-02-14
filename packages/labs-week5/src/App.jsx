import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { nanoid } from "nanoid";
import {GroceryPanel} from "./GroceryPanel.jsx";
import { useRef } from 'react';

function App(props) {
    const [tasks, setTasks] = React.useState(props.tasks);
    const [isOpen, setIsOpen] = React.useState(false);
    //console.log("Immediate variable is " + isOpen);


    const taskList = (tasks?.map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            onCheckbox={() => toggleTaskCompleted(task.id)}
            onDelete={() => deleteTask(task.id)}
        />
    )));
    function addTask(name="New Task") {
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        //console.log(newTask);
        //console.log(tasks);
        setTasks([...tasks, newTask]);
        setIsOpen(false);
    }

    function onCloseRequested() {
        const newModalStatus = !isOpen;
        setIsOpen(newModalStatus);
    }

    function toggleTaskCompleted(id) {

        const updatedTasks = tasks.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                //console.log("Updated task " + task.name);
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }
    function deleteTask(id) {
        const updatedTasks = tasks.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                //console.log("kill task " + task.name);
                //return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks.filter((task) => task.id !== id));
    }
    const addFormHeader = "New Task";
    //console.log("Before returning the app, the modal is " + isOpen);
    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <Modal
                headerLabel={addFormHeader}
                openModal={isOpen}
                closeModal={onCloseRequested}
            >
                <AddTaskForm onNewTask={addTask}/>
            </Modal>

            <button
                className="text-white rounded-md p-1 bg-blue-600"
                onClick={() => {
                    onCloseRequested()
                }}
            >
                Add task
            </button>
            <section>
                <h1 className="text-xl font-bold">To do</h1>
                <ul
                    role="list"
                    className="todo-list stack-large stack-exception"
                    aria-labelledby="list-heading">
                    {taskList}
                </ul>
            </section>
            <GroceryPanel
                addTask = {addTask}
            ></GroceryPanel>
        </main>
    );
}

export default App;

function Todo(props) {
    return (
        <li className="todo stack-small">
            <input id={props.id} type="checkbox" onChange={props.onCheckbox} defaultChecked={props.completed}/>
            <label className="todo-label m-0.5" htmlFor={props.id}>
                {props.name}
            </label>
            <button className={"ml-[2em]"} onClick={props.onDelete}><FontAwesomeIcon className={"text-gray-500"} icon={faTrashCan}/></button>
        </li>
    );
}

function AddTaskForm(props) {
    const [taskName, setTaskName] = React.useState('New task name');
    return (
        <div> {/* Unfortunately comments in JSX have to be done like this */}
            <input
                className="border rounded-md p-2"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button
                className="text-white m-2 rounded-md p-1 bg-blue-600"
                onClick={() => { props.onNewTask(taskName); setTaskName('New task name'); }}
            >
                Add task
            </button>
        </div>
    );
}

function Modal(props) {
    //console.log("Should we see the modal rn? " + props.openModal);
    const inputRef = useRef(null);

    function backgroundClose(e){
        if(!inputRef.current.contains(e.target)){
            props.closeModal();
        }
    }

    if(props.openModal){
        return (
            <div className="bg-black/20 w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center"
            onClick={backgroundClose}>
                <div ref={inputRef} className="bg-white p-4 flex flex-col gap-4">
                    <header className="flex flex-row justify-between w-full">
                        <h1 className="whitespace-nowrap">{props.headerLabel}</h1>
                        <button className="ml-4 flex-shrink-0" aria-label="CloseS"
                        onClick={props.closeModal}>X</button>
                    </header>
                    {props.children}
                </div>
            </div>
        );
    }
    else{
        return null;
    }
}










