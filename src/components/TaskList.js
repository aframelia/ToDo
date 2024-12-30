import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleTaskCompletion, deleteTask, editTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          toggleTaskCompletion={() => toggleTaskCompletion(index)}
          deleteTask={() => deleteTask(index)}
          editTask={(updatedTask) => editTask(index, updatedTask)} // Pass index and updated task
        />
      ))}
    </ul>
  );
}

export default TaskList;
