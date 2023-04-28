import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faCircleCheck,
   faTrashCan,
   faPen,
} from '@fortawesome/free-solid-svg-icons'

function Todo({ title, Statut, id, idx, toDo, setToDo, setUpdateTask }) {

      // Chekbox tâche en cour ou terminé
   const chekDone = (ID) => {
      let newTasks = toDo.map((task) => {
         if (id === ID) {
            return { ...task, Statut: !Statut }
         }
         return task
      })
      setToDo(newTasks)
   }
      // Suppression de la tâche à la liste
   const deleteTask = (id) => {
      setToDo(toDo.filter((task) => task.id !== id))
   }

   return (
      <React.Fragment key={id}>
         <div className="col taskBg">
            <div className={Statut ? 'done' : ''}>
               <span className="taskNumber">{idx + 1}</span>
               <span className="taskText"> {title}</span>
            </div>
            <div className="icons">
               <span
                  onClick={(e) => chekDone(id)}
                  title="Terminer/Non terminer"
               >
                  {' '}
                  <FontAwesomeIcon icon={faCircleCheck} />{' '}
               </span>
               {Statut ? null : (
                  <span
                     onClick={() =>
                        setUpdateTask({
                           id: id,
                           title: title,
                           Statut: Statut ? true : false,
                        })
                     }
                     title="Modifier"
                  >
                     {' '}
                     <FontAwesomeIcon icon={faPen} />
                  </span>
               )}

               <span onClick={() => deleteTask(id)} title="Supprimer">
                  <FontAwesomeIcon icon={faTrashCan} />
               </span>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Todo
