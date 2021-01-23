import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTasks from './components/AddTasks'
import Footer from './components/Footer'
import About from './components/About'


function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const getTasks = async () => {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }

    getTasks()
  }, [])

  // Fetch tasks

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch task 

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    setTasks((tasks.filter((task) => task.id !== id)))
  }

  // Add tesk
  const addTask = async (task) => {
    // const newTask = {
    //   id: Math.floor(Math.random * 10000) + 1,
    //   ...task
    // }
    // setTasks([...tasks, newTask])
    const res = await fetch('http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      }
    )

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Toggle reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updateTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateTask)
      })
    const data = await res.json()
    setTasks(
      tasks.map((task) => task.id === id ?
        { ...task, reminder: data.reminder } :
        task
    ));
  }
  
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />
       
        <Route path='/' exact render={(props) => (
          <>
            { showAddTask ? <AddTasks onAdd={addTask} /> : '' }
            { tasks.length > 0 ?
            <Tasks tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder} /> : 'There is no tasks'}
          </>
        )} />
        
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
