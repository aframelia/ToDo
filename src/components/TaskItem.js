import React, { useState } from "react";

function TaskItem({ task, toggleTaskCompletion, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    editTask(editedTask); // Call editTask with the updated task data
    setIsEditing(false); // Exit editing mode
  };

  return (
    <li className={task.completed ? "completed" : ""}>
      <div>
        {isEditing ? (
          <>
            {/* Editing Mode */}
            <input
              type="text"
              value={editedTask.name}
              onChange={(e) =>
                setEditedTask({ ...editedTask, name: e.target.value })
              }
            />
            <input
              type="text"
              value={editedTask.category}
              onChange={(e) =>
                setEditedTask({ ...editedTask, category: e.target.value })
              }
            />
            <input
              type="date"
              value={editedTask.dueDate || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            {/* Display Mode */}
            <span onClick={toggleTaskCompletion}>
              <strong>{task.name}</strong> - {task.category}
              {task.dueDate && ` (Due: ${task.dueDate})`}
            </span>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </div>
      <div>
        {/* These buttons are always visible */}
        <button onClick={toggleTaskCompletion}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;
