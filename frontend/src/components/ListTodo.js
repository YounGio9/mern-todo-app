import React, { useState } from 'react'
import '../styles/ListTodo.css'

import imgTodo from '../assets/Checklis.png'
import Todo from './Todo'

function ListTodo() {
   // State d'ajout de tâche à la list
   const [updateTask, setUpdateTask] = React.useState('')
   const [toDo, setToDo] = useState([]) // variable des tâches avec leur paramètre
   //
   const [newTask, setNewTask] = useState('') // variable temporaire pour stocker une tâche

   // Fonction
   const addTask = () => {
      // Ajout de la tâche à la liste
      if (newTask) {
         let num = toDo.length + 1
         let newEntry = { id: num, title: newTask, Statut: false }
         setToDo([...toDo, newEntry])
         setNewTask('')
      }
   }
   //
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
  
   // Annuler modification
   const cancelUpdate = () => {
      setUpdateTask('')
   }

   const changeTask = (e) => {
      let newEntry = {
         id: updateTask.id,
         title: e.target.value,
         Statut: updateTask.Statut ? true : false,
      }
      setUpdateTask(newEntry)
   }

   // Modifier la tâche

   // Changer la tâche en cours
   const updateTaskValue = () => {
      let filterRecords = [...toDo].filter((task) => task.id !== updateTask.id)
      let updatedObject = [...filterRecords, updateTask]
      setToDo(updatedObject)
      setUpdateTask('')
   }

   //
   return (
      <div className="container">
         <div className="row">
            <div className="col-md-12 text-xl-center ">
               <br />
               <br />
               <h1> Todo-app✅</h1>
               <img src={imgTodo} alt="Todoimg" className="img-fluid" />
               <br />
               <br />
               {/*update task*/}
               {updateTask && updateTask ? (
                  <>
                     <div className="row">
                        <div className="col">
                           <input
                              value={updateTask && updateTask.title}
                              onChange={(e) => changeTask(e)}
                              className="form-control form-control-lg"
                           />
                        </div>
                        <div className="col-auto">
                           <button
                              className="btn btn-lg btn-success mr-20"
                              onClick={updateTaskValue}
                           >
                              Modifier
                           </button>
                           <button
                              onClick={cancelUpdate}
                              className="btn btn-lg btn-danger mr-20"
                           >
                              Annuler
                           </button>
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
                              onChange={(e) => setNewTask(e.target.value)} // Pour prendre la valeur du input
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
                     <br />
                  </>
               )}

               {toDo && toDo.length
                  ? ''
                  : "Aucune tâche disponible pour l'instant 👻"}
               {toDo &&
                  toDo
                     .sort((a, b) => (a.id > b.id ? 1 : -1))
                     .map((task, index) => {
                        return (
                           <Todo
                              {...task}
                              idx={index}
                              toDo={toDo}
                              setUpdateTask={setUpdateTask}
                              setToDo={setToDo}
                           />
                        )
                     })}
            </div>
         </div>
      </div>
   )
}

export default ListTodo
