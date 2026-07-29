import { useEffect, useState } from "react";
import axios from "axios";
import { type TodoItem } from "./types";
import dayjs from "dayjs";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [curTodoId, setCurTodoId] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  async function fetchData() {
    const res = await axios.get<TodoItem[]>("/api/todo");
    setTodos(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function handleSubmit() {
    const trimmedText = inputText.trim();

    if (!trimmedText) return;

    if (mode === "ADD") {
      axios
        .request({
          url: "/api/todo",
          method: "put",
          data: { todoText: trimmedText },
        })
        .then(() => {
          setInputText("");
        })
        .then(fetchData)
        .catch((err) => alert(err));
    } else {
      axios
        .request({
          url: "/api/todo",
          method: "patch",
          data: {
            id: curTodoId,
            todoText: trimmedText,
          },
        })
        .then(() => {
          setInputText("");
          setMode("ADD");
          setCurTodoId("");
        })
        .then(fetchData)
        .catch((err) => alert(err));
    }
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?",
    );

    if (!confirmed) return;

    axios
      .delete("/api/todo", { data: { id } })
      .then(fetchData)
      .then(() => {
        setMode("ADD");
        setInputText("");
        setCurTodoId("");
      })
      .catch((err) => alert(err));
  }

  function handleCancel() {
    setMode("ADD");
    setInputText("");
    setCurTodoId("");
  }

  const displayedTodos = [...todos]
    .filter((todo) =>
      todo.todoText.toLowerCase().includes(searchText.toLowerCase()),
    )
    .sort((a, b) => {
      const result = compareDate(a, b);
      return sortOrder === "OLDEST" ? result : -result;
    });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="todo-container">
        <header className="app-header">
          <div>
            <h1>Todo App</h1>
            <p>Manage your daily tasks</p>
          </div>

          <button
            className="theme-button"
            onClick={() => setDarkMode((current) => !current)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        <main>
          <section className="todo-form">
            <input
              type="text"
              placeholder={
                mode === "ADD"
                  ? "What do you need to do?"
                  : "Update your todo"
              }
              onChange={handleChange}
              value={inputText}
              data-cy="input-text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <button
              onClick={handleSubmit}
              data-cy="submit"
              disabled={!inputText.trim()}
            >
              {mode === "ADD" ? "Add Todo" : "Update"}
            </button>

            {mode === "EDIT" && (
              <button onClick={handleCancel} className="secondary">
                Cancel
              </button>
            )}
          </section>

          <section className="statistics">
            <div className="stat-card">
              <span>📋</span>
              <div>
                <strong>{todos.length}</strong>
                <p>Total Todos</p>
              </div>
            </div>

            <div className="stat-card">
              <span>🔍</span>
              <div>
                <strong>{displayedTodos.length}</strong>
                <p>Showing</p>
              </div>
            </div>

            <div className="stat-card">
              <span>🕒</span>
              <div>
                <strong>
                  {todos.length > 0
                    ? formatDateTime(
                      [...todos].sort(compareDate).at(-1)?.createdAt ?? "",
                    ).date
                    : "-"}
                </strong>
                <p>Latest Date</p>
              </div>
            </div>
          </section>

          <section className="search-section">
            <input
              type="search"
              placeholder="Search todos..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {searchText && (
              <button
                className="secondary"
                onClick={() => setSearchText("")}
              >
                Clear
              </button>
            )}

            <button
              className="secondary"
              onClick={() =>
                setSortOrder((current) =>
                  current === "NEWEST" ? "OLDEST" : "NEWEST",
                )
              }
            >
              {sortOrder === "NEWEST" ? "Newest first" : "Oldest first"}
            </button>
          </section>

          <div data-cy="todo-item-wrapper" className="todo-list">
            {displayedTodos.length === 0 ? (
              <div className="empty-state">
                <div>📝</div>

                <p>
                  {searchText
                    ? "No todos match your search."
                    : "No todos yet. Add your first task!"}
                </p>
              </div>
            ) : (
              displayedTodos.map((item, idx) => {
                const { date, time } = formatDateTime(item.createdAt);

                return (
                  <article key={item.id} className="todo-card">
                    <div className="todo-number">{idx + 1}</div>

                    <div className="todo-content">
                      <div data-cy="todo-item-text" className="todo-text">
                        {item.todoText}
                      </div>

                      <div className="todo-date">
                        📅 {date} &nbsp; ⏰ {time}
                      </div>
                    </div>

                    <div className="todo-actions">
                      <button
                        title="Edit todo"
                        onClick={() => {
                          setMode("EDIT");
                          setCurTodoId(item.id);
                          setInputText(item.todoText);
                        }}
                        data-cy="todo-item-update"
                      >
                        {curTodoId === item.id ? "✍🏻" : "🖊️"}
                      </button>

                      <button
                        title="Delete todo"
                        onClick={() => handleDelete(item.id)}
                        data-cy="todo-item-delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

function formatDateTime(dateStr: string) {
  if (!dayjs(dateStr).isValid()) {
    return { date: "N/A", time: "N/A" };
  }

  const dt = dayjs(dateStr);

  return {
    date: dt.format("D/MM/YY"),
    time: dt.format("HH:mm"),
  };
}

function compareDate(a: TodoItem, b: TodoItem) {
  const da = dayjs(a.createdAt).valueOf();
  const db = dayjs(b.createdAt).valueOf();

  return da - db;
}