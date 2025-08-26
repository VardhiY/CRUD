import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
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
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
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
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ RETURN INSIDE FUNCTION
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>🚀 Dark CRUD Task Manager</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>➕ Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{
                textDecoration: task.status === "done" ? "line-through" : "none",
                color: task.status === "done" ? "#a3ffa3" : "#f5f5f5",
              }}
            >
              {task.title}
            </span>
            <div>
              <button onClick={() => toggleTask(task._id, task.status)}>
                {task.status === "todo" ? "✅ Done" : "🔄 Todo"}
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                style={{ backgroundColor: "#ff4d4d" }}
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
