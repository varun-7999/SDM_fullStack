import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function TodoItem({ todo, onToggle, onDelete }) {
  return <li className={todo.done ? "todo done" : "todo"}><button className="check" onClick={() => onToggle(todo.id)} aria-label={`Mark ${todo.text} complete`}>{todo.done ? "✓" : ""}</button><span>{todo.text}</span><button className="delete" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>×</button></li>;
}

function App() {
  const [todos, setTodos] = useState([{ id: 1, text: "Explore React components", done: true }, { id: 2, text: "Build something useful", done: false }]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const visible = todos.filter((todo) => filter === "all" || (filter === "open" ? !todo.done : todo.done));
  const addTodo = (event) => { event.preventDefault(); if (!text.trim()) return; setTodos([{ id: Date.now(), text: text.trim(), done: false }, ...todos]); setText(""); };
  const toggle = (id) => setTodos(todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo));
  const remove = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  return <main className="shell"><section className="app"><header><p className="eyebrow">Week 3 · Task 2</p><h1>Focus<span>.</span></h1><p className="sub">A tiny React to-do app built with components, props, and state.</p></header><form onSubmit={addTodo}><input value={text} onChange={(event) => setText(event.target.value)} placeholder="Add a new task..." aria-label="Add a new task"/><button>Add</button></form><nav><div>{["all", "open", "done"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><span>{todos.filter((todo) => !todo.done).length} open</span></nav><ul>{visible.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={toggle} onDelete={remove}/>)}</ul>{visible.length === 0 && <p className="empty">Nothing here yet.</p>}</section></main>;
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
