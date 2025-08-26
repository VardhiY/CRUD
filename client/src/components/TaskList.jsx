import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { taskAPI } from "../services/api.js";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskAPI.list().then(setTasks);
  }, []);

  const handleDelete = async (id) => {
    await taskAPI.remove(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr><th>Title</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>
                <Link to={`/edit/${t._id}`}>Edit</Link>
                <button onClick={() => handleDelete(t._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr><td colSpan="3">No tasks yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
