import React, {useState} from "react";
import '../styles/ListTodo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck,
    faTrashCan,
    faPen,
    faPlusCircle,
    faCheckCircle,
    faTimesCircle,
    faCheck,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'

function ListTodo() {
    // State d'ajout de tâche à la list
    const [toDo, setToDo] = useState([
        { "id":1, "title": "Tâche 1", "Statut": true},
        { "id":2, "title": "Tâche 2", "Statut": false}
    ]); // variable des tâches avec leur paramètre
    //
    const [newTask, setNewTask] = useState(''); // variable temporaire pour stocker une tâche
    const [updateTask, setUpdateTask] = useState(''); // || pour update

    // Fonction
    const addTask = (task) => {
        // Ajout de la tâche à la liste
        setToDo([...toDo, task]);
    }
    //
    const deleteTask = (id) => {
        // Suppression de la tâche à la liste
        setToDo(toDo.filter(task => task.id!== id));
    }
    //
    const editTask = (id, title) => {
        // Modification de la tâche à la liste
        setToDo(toDo.map(task => {
            if (task.id === id) {
                task.title = title;
            }
            return task;
        }));
    }
    //
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-xl-center ">
                    <br/><br/>
                    <h1> Todo-app</h1>
                    <br/><br/>
                    { toDo && toDo.length ? '': 'Aucune tâche disponible'}
                    {
                        toDo && toDo.map((task, index) => {
                            return (
                                <div key={task.id}>
                                    <div className="">
                                        <div className={task.Statut ? 'done' : ''}>
                                            <div className=" col taskBg">
                                                <span className="taskNumber">{index +1}</span>
                                                <span className="taskText"> {task.title}</span>
                                                <div className="icons">
                                                    <span> <FontAwesomeIcon icon={faCircleCheck}/> </span>
                                                    <span> <FontAwesomeIcon icon={faPen}/></span>
                                                    <span><FontAwesomeIcon icon={faTrashCan}/></span>
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                </div>)
                        })
                    }
                    </div>
                </div>
        </div>
    );
}

export default ListTodo;