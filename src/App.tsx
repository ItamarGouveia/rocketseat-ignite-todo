import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const LOCAL_STORAGE_KEY = 'local:Itamar'


export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  // Estado para colocar as task em lista na tela
  const [tasks, setTasks] = useState<ITask[]>([])
  // Funçao para recuperar do LocalStorage do navegador para exibir na tela a Task
  function loadSavedTasks(){
   const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
   if (saved) {
    setTasks(JSON.parse(saved))
   }
  }

  useEffect(() => {
    loadSavedTasks()
  }, [])



  // Função para salvar a task em LocalStorage do navegador
  function setTasksAndSave(newTasks: ITask[]){
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }
  // Função para adicionar atraves do input + button
  function addTask(taskTitle: string){
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ])
  }

  // Função para deletar a Task pelo Id
  function deleteTaskById(taskId: string){
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasksAndSave(newTasks)
  }

  // Função para informar que ja foi concluida a task
  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map((task) =>{
      if(task.id === taskId){
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }

      return task;
    })
    setTasksAndSave(newTasks);
  }


  return (
    <>
      <Header onAddTask={addTask} />
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTaskById}
          onComplete={toggleTaskCompletedById}
        />
    </>
  )
}
