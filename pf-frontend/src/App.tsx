import { useEffect, useState } from "react";
import axios from "axios";
import { type TodoItem } from "./types";
import dayjs from "dayjs";
import "./App.css";

// Untitled UI Free Icons (24x24 SVG line icons)
function IconPlus({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

function IconEdit({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );
}

function IconTrash({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
}

function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function IconCalendar({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function IconClock({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function IconSun({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );
}

function IconMoon({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}

function IconList({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}

function IconSort({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="11" y1="5" x2="11" y2="19"></line>
      <polyline points="7 9 11 5 15 9"></polyline>
      <line x1="18" y1="19" x2="18" y2="5"></line>
      <polyline points="14 15 18 19 22 15"></polyline>
    </svg>
  );
}

function IconX({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

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
    try {
      const res = await axios.get<TodoItem[]>("/api/todo");
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
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
    axios
      .delete(`/api/todo?id=${id}`, { data: { id } })
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
        {/* Top Header */}
        <header className="app-header">
          <div className="brand-section">
            <div className="brand-badge">
              <IconList className="brand-icon" />
            </div>
            <div>
              <h1 className="brand-title">Todo List</h1>
              <p className="brand-subtitle">Minimal task workspace</p>
            </div>
          </div>

          <button
            className="theme-button"
            onClick={() => setDarkMode((current) => !current)}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <>
                <IconSun className="btn-icon" /> Light Mode
              </>
            ) : (
              <>
                <IconMoon className="btn-icon" /> Dark Mode
              </>
            )}
          </button>
        </header>

        <main>
          {/* Create / Edit Input Form */}
          <section className="todo-form-wrapper">
            <div className="todo-form">
              <input
                type="text"
                placeholder={
                  mode === "ADD"
                    ? "Add a new task..."
                    : "Update task description..."
                }
                onChange={handleChange}
                value={inputText}
                data-cy="input-text"
                className="input-main"
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
                className="btn-primary"
              >
                {mode === "ADD" ? (
                  <>
                    <IconPlus className="btn-icon" /> Add Task
                  </>
                ) : (
                  <>
                    <IconCheck className="btn-icon" /> Update
                  </>
                )}
              </button>

              {mode === "EDIT" && (
                <button onClick={handleCancel} className="btn-secondary">
                  <IconX className="btn-icon" /> Cancel
                </button>
              )}
            </div>
          </section>

          {/* Stats Bar */}
          <section className="statistics">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <IconList className="stat-icon" />
              </div>
              <div className="stat-content">
                <strong>{todos.length}</strong>
                <p>Total Tasks</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <IconSearch className="stat-icon" />
              </div>
              <div className="stat-content">
                <strong>{displayedTodos.length}</strong>
                <p>Filtered</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <IconCalendar className="stat-icon" />
              </div>
              <div className="stat-content">
                <strong>
                  {todos.length > 0
                    ? formatDateTime(
                        [...todos].sort(compareDate).at(-1)?.createdAt ?? "",
                      ).date
                    : "-"}
                </strong>
                <p>Latest Activity</p>
              </div>
            </div>
          </section>

          {/* Search & Sorting Toolbar */}
          <section className="search-section">
            <div className="search-input-wrapper">
              <IconSearch className="search-icon" />
              <input
                type="search"
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="input-search"
              />
              {searchText && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchText("")}
                  title="Clear search"
                >
                  <IconX className="btn-icon-sm" />
                </button>
              )}
            </div>

            <button
              className="btn-secondary btn-sort"
              onClick={() =>
                setSortOrder((current) =>
                  current === "NEWEST" ? "OLDEST" : "NEWEST",
                )
              }
            >
              <IconSort className="btn-icon" />
              <span>{sortOrder === "NEWEST" ? "Newest First" : "Oldest First"}</span>
            </button>
          </section>

          {/* Todo Items List */}
          <div data-cy="todo-item-wrapper" className="todo-list">
            {displayedTodos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-box">
                  <IconList className="empty-icon" />
                </div>
                <h3>No tasks found</h3>
                <p>
                  {searchText
                    ? "No tasks match your search filter."
                    : "Your list is clear. Type above to create your first task."}
                </p>
              </div>
            ) : (
              displayedTodos.map((item, idx) => {
                const { date, time } = formatDateTime(item.createdAt);
                const isEditingThis = curTodoId === item.id;

                return (
                  <article
                    key={item.id}
                    className={`todo-card ${isEditingThis ? "editing" : ""}`}
                  >
                    <div className="todo-number">{idx + 1}</div>

                    <div className="todo-content">
                      <div data-cy="todo-item-text" className="todo-text">
                        {item.todoText}
                      </div>

                      <div className="todo-date">
                        <span className="meta-tag">
                          <IconCalendar className="meta-icon" /> {date}
                        </span>
                        <span className="meta-tag">
                          <IconClock className="meta-icon" /> {time}
                        </span>
                      </div>
                    </div>

                    <div className="todo-actions">
                      <button
                        title="Edit task"
                        onClick={() => {
                          setMode("EDIT");
                          setCurTodoId(item.id);
                          setInputText(item.todoText);
                        }}
                        data-cy="todo-item-update"
                        className={`action-btn edit-btn ${isEditingThis ? "active" : ""}`}
                      >
                        <IconEdit className="action-icon" />
                      </button>

                      <button
                        title="Delete task"
                        onClick={() => handleDelete(item.id)}
                        data-cy="todo-item-delete"
                        className="action-btn delete-btn"
                      >
                        <IconTrash className="action-icon" />
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
    date: dt.format("D MMM YYYY"),
    time: dt.format("HH:mm"),
  };
}

function compareDate(a: TodoItem, b: TodoItem) {
  const da = dayjs(a.createdAt).valueOf();
  const db = dayjs(b.createdAt).valueOf();

  return da - db;
}