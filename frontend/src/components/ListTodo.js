import React, {useState} from "react";
import '../styles/ListTodo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck,
    faTrashCan,
    faPen,

} from '@fortawesome/free-solid-svg-icons'
import imgTodo from '../assets/Checklis.png';

function ListTodo() {
    // State d'ajout de tâche à la list
    const [toDo, setToDo] = useState([
        { "id":1, "title": "Tâche 1", "Statut": false},
        { "id":2, "title": "Tâche 2", "Statut": false}
    ]); // variable des tâches avec leur paramètre
    //
    const [newTask, setNewTask] = useState(''); // variable temporaire pour stocker une tâche
    const [updateTask, setUpdateTask] = useState(''); // || pour update

    // Fonction
    const addTask = (task) => {
        // Ajout de la tâche à la liste
        if(newTask) {
            let num = toDo.length + 1;
            let newEntry = {id: num, title: newTask, Statut: false}
            setToDo([...toDo, newEntry]);
            setNewTask('');
        }
    }
    //
    const deleteTask = (id) => {
        // Suppression de la tâche à la liste

        setToDo(toDo.filter(task => task.id!== id));
    }
    //
    /*const editTask = (id, title) => {
        // Modification de la tâche à la liste
        setToDo(toDo.map(task => {
            if (task.id === id) {
                task.title = title;
            }
            return task;
        }));
    }*/

    // Chekbox tâche en cour ou terminé
    const chekDone = (id) => {
        let newTasks = toDo.map((task) => {
            if (task.id === id){
                return ({ ...task, Statut: !task.Statut })
            }
            return task;
        });
        setToDo(newTasks);
    }
    // Annuler modification
    const cancelUpdate = () => {
        setUpdateTask('');
    }
    // Changer la tâche en cour
    const changeTask = (e) => {
        let newEntry = {
            id: updateTask.id,
            title: e.target.value,
            Statut: updateTask.Statut ? true : false
        }
        setUpdateTask(newEntry);
    }

    // Modifier la tâche
    //////////////////////////////////////////
    const updateTaskValue = () => {
        let filterRecords = [...toDo].filter( task=>task.id !== updateTask.id);
        let updatedObject = [...filterRecords, updateTask];
        setToDo(updatedObject);
        setUpdateTask('');
    }

    //
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-xl-center ">
                    <br/><br/>
                    <h1> Todo-app</h1>
                    <img src={imgTodo} alt="Todoimg" className="img-fluid" />
                    <br/><br/>
                    {/*update task*/}
                    { updateTask && updateTask ? (
                            <>
                            <div className="row">
                                <div className="col">
                                    <input
                                        value={updateTask && updateTask.title}
                                        onChange={ (e) => changeTask(e) }
                                        className="form-control form-control-lg"
                                    />
                                </div>
                                <div className="col-auto">
                                    <button
                                        className="btn btn-lg btn-success mr-20"
                                        onClick={updateTaskValue}
                                    >Modifier</button>
                                    <button
                                        onClick={cancelUpdate}
                                        className="btn btn-lg btn-danger mr-20"
                                    >Annuler</button>
                                </div>
                            </div>
                        <br />
                            </>
                    ) : (
                        <>
                        {/*input addTask*/}
                        <div className="row">
                        <div className="col">
                        <input
                        className="form-control form-control-lg"
                        value={newTask}
                    onChange={ (e) =>setNewTask(e.target.value) } // Pour prendre la valeur du input
                />
            </div>
            <div className="col-auto">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={addTask}
                >
                    Ajouter
                </button>
            </div>
        </div>
    <br/>
                        </>
                    )}



                    { toDo && toDo.length ? '': 'Aucune tâche disponible'}
                    {
                        toDo && toDo
                            .sort((a, b) => a.id > b.id ? 1 : -1)
                            .map((task, index) => {
                            return (
                                <React.Fragment key={task.id}>
                                    <div className="col taskBg">
                                        <div className={task.Statut ? 'done' : ''}>
                                                <span className="taskNumber">{index +1}</span>
                                                <span className="taskText"> {task.title}</span>
                                        </div>
                                        <div className="icons">
                                            <span  onClick={ (e ) => chekDone(task.id) } title="Terminer/Non terminer"> <FontAwesomeIcon icon={faCircleCheck}/> </span>
                                            { task.Statut ? null : (
                                                <span  onClick={ ( ) => setUpdateTask( {id: task.id, title: task.title, Statut: task.Statut? true : false} ) } title="Modifier"> <FontAwesomeIcon icon={faPen}/></span>
                                            )}

                                            <span  onClick={ () => deleteTask(task.id) } title="Supprimer"><FontAwesomeIcon icon={faTrashCan}/></span>
                                        </div>
                                    </div>

                                </React.Fragment>)
                        })
                    }
                    </div>
                </div>
        </div>
    );
}

export default ListTodo;