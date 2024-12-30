import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filterCategory, setFilterCategory] = useState("All"); // State for filtering

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, completed: false }]);
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index, updatedTask) => {
    setTasks(tasks.map((task, i) => (i === index ? updatedTask : task)));
  };
    // Filter tasks based on the selected category
    const filteredTasks =
    filterCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === filterCategory);  

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskInput addTask={addTask} />
            {/* Dropdown Menu for Filtering */}
            <div className="filter">
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        editTask={editTask} // Pass editTask as a prop
      />
    </div>
  );
}

export default App;
