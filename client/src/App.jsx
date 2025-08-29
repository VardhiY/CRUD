import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ Backend URL (direct for now)
  const backendURL = "http://localhost:5000";

  // Load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post(`${backendURL}/api/tasks`, {
        title,
        status: "todo",
      });
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle task
  const toggleTask = async (id, currentStatus) => {
    try {
      const res = await axios.put(`${backendURL}/api/tasks/${id}`, {
        status: currentStatus === "todo" ? "done" : "todo",
      });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        backgroundColor: "#1e1e2f",
        padding: "2rem",
        borderRadius: "10px",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#61dafb" }}>🚀 CRUD Task Manager</h1>

      {/* Input and Add button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "5px",
            border: "none",
            marginRight: "0.5rem",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#61dafb",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ➕ Add Task
        </button>
      </div>

      {/* Task list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#2c2c3e",
              padding: "0.7rem",
              borderRadius: "5px",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                textDecoration: task.status === "done" ? "line-through" : "none",
                color: task.status === "done" ? "#90ee90" : "#fff",
              }}
            >
              {task.title}
            </span>
            <div>
              <button
                onClick={() => toggleTask(task._id, task.status)}
                style={{
                  marginRight: "0.5rem",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {task.status === "todo" ? "✅ Done" : "🔄 Todo"}
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
