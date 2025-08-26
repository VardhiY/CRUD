import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskAPI } from "../services/api.js";

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", status: "todo", description: "" });

  useEffect(() => {
    if (id) taskAPI.get(id).then(setForm);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await taskAPI.update(id, form);
    else await taskAPI.create(form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">{id ? "Update" : "Create"}</button>
    </form>
  );
}
