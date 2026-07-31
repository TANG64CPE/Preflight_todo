import { useEffect, useState } from "react";
import axios from "axios";
import { type TodoItem } from "./types";
import dayjs from "dayjs";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
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

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
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

function IconGrid({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
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

function IconTag({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  );
}

function IconFlame({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-1.7-1.4-2.8-2.5-4-.2-.2-.5-.2-.7 0-1.1 1.2-2.5 2.3-2.5 4z"></path>
      <path d="M12 2c1.8 3.6 5 6.4 5 11a7 7 0 1 1-14 0c0-4.6 3.2-7.4 5-11 1.3 2.5 2.7 3.9 4 0z"></path>
    </svg>
  );
}

function IconZap({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}

function IconLeaf({ className = "" }: { className?: string }) {
  return (
    <svg className={`unt-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
    </svg>
  );
}

// Auto-tagging parser function
function extractTagsAndMetadata(text: string) {
  const hashtagRegex = /#([\wก-๙]+)/g;
  const tags: string[] = [];
  let match;
  while ((match = hashtagRegex.exec(text)) !== null) {
    tags.push(match[1].toLowerCase());
  }

  // Automatic keyword rules if no hashtags provided
  if (tags.length === 0) {
    const lower = text.toLowerCase();
    if (lower.includes("ประชุม") || lower.includes("meeting") || lower.includes("นัด")) tags.push("meeting");
    if (lower.includes("ซื้อ") || lower.includes("buy") || lower.includes("shopping") || lower.includes("ของ")) tags.push("shopping");
    if (lower.includes("กิน") || lower.includes("อาหาร") || lower.includes("food") || lower.includes("eat")) tags.push("food");
    if (lower.includes("bug") || lower.includes("fix") || lower.includes("แก้") || lower.includes("บั๊ก")) tags.push("bug");
    if (lower.includes("ui") || lower.includes("design") || lower.includes("css") || lower.includes("ออกแบบ")) tags.push("design");
    if (lower.includes("api") || lower.includes("backend") || lower.includes("db") || lower.includes("ระบบ")) tags.push("backend");
    if (lower.includes("urgent") || lower.includes("ด่วน") || lower.includes("asap")) tags.push("urgent");
    if (lower.includes("เรียน") || lower.includes("study") || lower.includes("อ่าน") || lower.includes("read")) tags.push("study");
    if (lower.includes("ออกกำลัง") || lower.includes("gym") || lower.includes("วิ่ง") || lower.includes("run")) tags.push("health");
  }

  const isUrgent = text.toLowerCase().includes("urgent") || text.includes("ด่วน");

  return {
    tags: Array.from(new Set(tags)),
    detectedPriority: isUrgent ? "HIGH" : "MEDIUM"
  };
}

function getItemStatus(item: TodoItem): "TODO" | "DOING" | "DONE" {
  if (item?.metadata?.status) return item.metadata.status;
  return item?.isDone ? "DONE" : "TODO";
}

function formatDateTime(dateStr?: string) {
  if (!dateStr) return { date: "วันนี้", time: "" };
  const obj = dayjs(dateStr);
  return {
    date: obj.format("DD/MM/YYYY"),
    time: obj.format("HH:mm น.")
  };
}

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [inputPriority, setInputPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [searchText, setSearchText] = useState("");
  const [mode, setMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [curTodoId, setCurTodoId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const [viewMode, setViewMode] = useState<"KANBAN" | "LIST">("KANBAN");
  const [enabled, setEnabled] = useState(false);


  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

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
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputText.trim()) return;

    const { tags, detectedPriority } = extractTagsAndMetadata(inputText);

    if (mode === "CREATE") {
      const finalPriority = inputPriority !== "MEDIUM" ? inputPriority : detectedPriority;
      try {
        await axios.post("/api/todo", {
          todoText: inputText,
          metadata: {
            tags,
            priority: finalPriority,
            status: "TODO",
            source: "manual"
          }
        });
        setInputText("");
        setInputPriority("MEDIUM");
        fetchData();
      } catch (err) {
        console.error("Failed to create todo", err);
      }
    } else if (mode === "EDIT" && curTodoId) {
      try {
        const existing = todos.find((t) => t.id === curTodoId);
        await axios.put("/api/todo", {
          id: curTodoId,
          todoText: inputText,
          metadata: {
            ...existing?.metadata,
            tags,
            priority: inputPriority
          }
        });
        setInputText("");
        setMode("CREATE");
        setCurTodoId(null);
        setInputPriority("MEDIUM");
        fetchData();
      } catch (err) {
        console.error("Failed to update todo", err);
      }
    }
  }

  async function toggleDone(item: TodoItem) {
    try {
      const newDoneState = !item.isDone;
      const newStatus = newDoneState ? "DONE" : "TODO";

      await axios.put("/api/todo", {
        id: item.id,
        isDone: newDoneState,
        metadata: {
          ...item.metadata,
          status: newStatus
        }
      });
      fetchData();
    } catch (err) {
      console.error("Failed to toggle todo status", err);
    }
  }

  async function handleDelete(id: string) {
    try {
      await axios.delete(`/api/todo/${id}`);
      fetchData();
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  }

  function handleDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as "TODO" | "DOING" | "DONE";

    const targetItem = todos.find((item) => item.id === draggableId);
    if (!targetItem) return;

    const isDone = newStatus === "DONE";

    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === draggableId
          ? {
              ...item,
              isDone,
              metadata: {
                ...item.metadata,
                status: newStatus
              }
            }
          : item
      )
    );

    axios
      .put("/api/todo", {
        id: draggableId,
        isDone,
        metadata: {
          ...targetItem.metadata,
          status: newStatus
        }
      })
      .catch((err) => {
        console.error("Failed to sync drag and drop update", err);
        fetchData();
      });
  }

  const filteredTodos = todos
    .filter((t) => {
      if (!searchText.trim()) return true;
      const term = searchText.toLowerCase().trim();
      const textMatch = t.todoText.toLowerCase().includes(term);
      const tagMatch = t.metadata?.tags?.some((tag) =>
        tag.toLowerCase().includes(term.replace("#", ""))
      );
      return textMatch || tagMatch;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "NEWEST" ? timeB - timeA : timeA - timeB;
    });

  const todoItems = filteredTodos.filter((t) => getItemStatus(t) === "TODO");
  const doingItems = filteredTodos.filter((t) => getItemStatus(t) === "DOING");
  const doneItems = filteredTodos.filter((t) => getItemStatus(t) === "DONE");


  const latestDateText = todos.length > 0
    ? formatDateTime(todos[0].createdAt).date
    : formatDateTime().date;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="todo-container">
        {/* Top Header */}
        <header className="app-header">
          <div className="brand-section">
            <div>
              <h1 className="brand-title">Todo List</h1>
              {/* ลบ Minimal task workspace ออกตามที่ผู้ใช้ระบุ */}
            </div>
          </div>

          <div className="header-controls">
            {/* View Switcher: List vs Kanban */}
            <div className="view-switcher">
              <button
                className={`view-btn ${viewMode === "KANBAN" ? "active" : ""}`}
                onClick={() => setViewMode("KANBAN")}
                title="มุมมองบอร์ด Kanban"
              >
                <IconGrid className="btn-icon" /> บอร์ด
              </button>
              <button
                className={`view-btn ${viewMode === "LIST" ? "active" : ""}`}
                onClick={() => setViewMode("LIST")}
                title="มุมมองรายการ List"
              >
                <IconList className="btn-icon" /> รายการ
              </button>
            </div>

            <button
              className="btn-theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="สลับโหมดสี"
            >
              {darkMode ? (
                <>
                  <IconSun className="btn-icon" /> โหมดสว่าง
                </>
              ) : (
                <>
                  <IconMoon className="btn-icon" /> โหมดมืด
                </>
              )}
            </button>


          </div>
        </header>

        {/* Main Workspace Card */}
        <main className="workspace-card">
          {/* Input Form */}
          <form className="todo-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                data-cy="todo-input"
                type="text"
                className="input-task"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === "CREATE"
                    ? "เพิ่มรายการใหม่... (พิมพ์ #แท็ก เพื่อติดแท็กอัตโนมัติ)"
                    : "แก้ไขรายละเอียดงาน..."
                }
              />

              {/* Priority Segmented Pill Selector (High / Medium / Low) */}
              <div className="priority-segmented-group">
                <button
                  type="button"
                  className={`priority-btn priority-btn-high ${inputPriority === "HIGH" ? "active" : ""}`}
                  onClick={() => setInputPriority("HIGH")}
                  title="ความสำคัญสูง"
                >
                  <IconFlame className="btn-icon-sm" /> High
                </button>
                <button
                  type="button"
                  className={`priority-btn priority-btn-medium ${inputPriority === "MEDIUM" ? "active" : ""}`}
                  onClick={() => setInputPriority("MEDIUM")}
                  title="ความสำคัญปานกลาง"
                >
                  <IconZap className="btn-icon-sm" /> Medium
                </button>
                <button
                  type="button"
                  className={`priority-btn priority-btn-low ${inputPriority === "LOW" ? "active" : ""}`}
                  onClick={() => setInputPriority("LOW")}
                  title="ความสำคัญต่ำ"
                >
                  <IconLeaf className="btn-icon-sm" /> Low
                </button>
              </div>

              <button
                data-cy="todo-submit"
                type="submit"
                className={mode === "CREATE" ? "btn-primary" : "btn-primary btn-edit-mode"}
              >
                {mode === "CREATE" ? (
                  <>
                    <IconPlus className="btn-icon" /> เพิ่มงาน
                  </>
                ) : (
                  <>
                    <IconCheck className="btn-icon" /> บันทึก
                  </>
                )}
              </button>
              {mode === "EDIT" && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setMode("CREATE");
                    setCurTodoId(null);
                    setInputText("");
                    setInputPriority("MEDIUM");
                  }}
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </form>

          {/* Quick Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <IconList className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{todos.length}</h3>
                <p>งานทั้งหมด</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <IconCheck className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{todos.filter((t) => getItemStatus(t) === "DONE").length}</h3>
                <p>เสร็จสิ้นแล้ว</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <IconCalendar className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{latestDateText}</h3>
                <p>กิจกรรมล่าสุด</p>
              </div>
            </div>
          </div>

          {/* Search & Sort Toolbar */}
          <div className="search-section">
            <div className="search-input-wrapper">
              <IconSearch className="search-icon" />
              <input
                type="text"
                className="input-search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="ค้นหางาน หรือ #แท็ก..."
              />
              {searchText && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchText("")}
                  title="ล้างการค้นหา"
                >
                  <IconX className="btn-icon-sm" />
                </button>
              )}
            </div>

            <button
              className="btn-secondary btn-sort"
              onClick={() =>
                setSortOrder((cur) => (cur === "NEWEST" ? "OLDEST" : "NEWEST"))
              }
            >
              <IconSearch className="btn-icon" />
              {sortOrder === "NEWEST" ? "ใหม่ล่าสุด" : "เก่าที่สุด"}
            </button>
          </div>

          {/* Render Active View: KANBAN BOARD vs MINIMAL LIST */}
          {viewMode === "KANBAN" ? (
            enabled ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="kanban-board">
                  {/* Column 1: รอดำเนินการ */}
                  <KanbanColumn
                    id="TODO"
                    title="รอดำเนินการ"
                    icon={<IconClock className="btn-icon" />}
                    badgeClass="badge-todo"
                    items={todoItems}
                    onEdit={(item) => {
                      setMode("EDIT");
                      setCurTodoId(item.id);
                      setInputText(item.todoText);
                      setInputPriority(item.metadata?.priority || "MEDIUM");
                    }}
                    onDelete={handleDelete}
                    curTodoId={curTodoId}
                  />

                  {/* Column 2: กำลังทำ */}
                  <KanbanColumn
                    id="DOING"
                    title="กำลังทำ"
                    icon={<IconZap className="btn-icon" />}
                    badgeClass="badge-doing"
                    items={doingItems}
                    onEdit={(item) => {
                      setMode("EDIT");
                      setCurTodoId(item.id);
                      setInputText(item.todoText);
                      setInputPriority(item.metadata?.priority || "MEDIUM");
                    }}
                    onDelete={handleDelete}
                    curTodoId={curTodoId}
                  />

                  {/* Column 3: เสร็จสิ้น */}
                  <KanbanColumn
                    id="DONE"
                    title="เสร็จสิ้น"
                    icon={<IconCheck className="btn-icon" />}
                    badgeClass="badge-done"
                    items={doneItems}
                    onEdit={(item) => {
                      setMode("EDIT");
                      setCurTodoId(item.id);
                      setInputText(item.todoText);
                      setInputPriority(item.metadata?.priority || "MEDIUM");
                    }}
                    onDelete={handleDelete}
                    curTodoId={curTodoId}
                  />
                </div>
              </DragDropContext>
            ) : (
              <div className="kanban-board">
                <div className="kanban-column"><div className="kanban-empty">กำลังโหลด...</div></div>
                <div className="kanban-column"><div className="kanban-empty">กำลังโหลด...</div></div>
                <div className="kanban-column"><div className="kanban-empty">กำลังโหลด...</div></div>
              </div>
            )
          ) : (
            /* Minimal List View */
            <div data-cy="todo-item-wrapper" className="todo-list">
              {filteredTodos.length === 0 ? (
                <div className="empty-state">
                  <p>ไม่พบรายการงาน เพิ่มรายการใหม่ด้านบนได้เลย!</p>
                </div>
              ) : (
                filteredTodos.map((item, index) => {
                  const { date, time } = formatDateTime(item.createdAt);
                  const isEditing = curTodoId === item.id;

                  return (
                    <div
                      key={item.id}
                      data-cy="todo-item"
                      className={`todo-card ${item.isDone ? "completed" : ""} ${isEditing ? "editing" : ""}`}
                    >
                      <button
                        type="button"
                        className={`checkbox-custom ${item.isDone ? "checked" : ""}`}
                        onClick={() => toggleDone(item)}
                        aria-label="สลับสถานะงาน"
                      >
                        {item.isDone ? (
                          <IconCheck className="check-icon" />
                        ) : (
                          <span className="index-num">{index + 1}</span>
                        )}
                      </button>

                      <div className="todo-content">
                        <div className="todo-header-line">
                          <p
                            data-cy="todo-text"
                            className="todo-text"
                            onClick={() => toggleDone(item)}
                          >
                            {item.todoText}
                          </p>

                          {/* Priority Badge Tag */}
                          {item.metadata?.priority && (
                            <span className={`priority-pill priority-${item.metadata.priority.toLowerCase()}`}>
                              {item.metadata.priority === "HIGH" ? (
                                <><IconFlame className="btn-icon-sm" /> High</>
                              ) : item.metadata.priority === "LOW" ? (
                                <><IconLeaf className="btn-icon-sm" /> Low</>
                              ) : (
                                <><IconZap className="btn-icon-sm" /> Medium</>
                              )}
                            </span>
                          )}
                        </div>

                        {/* Tag Badges */}
                        {item.metadata?.tags && item.metadata.tags.length > 0 && (
                          <div className="tag-pills">
                            {item.metadata.tags.map((tag) => (
                              <span key={tag} className="tag-pill">
                                <IconTag className="meta-icon" /> #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="todo-meta">
                          <span className="meta-tag">
                            <IconCalendar className="meta-icon" /> {date}
                          </span>
                          {time && (
                            <span className="meta-tag">
                              <IconClock className="meta-icon" /> {time}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="todo-actions">
                        <button
                          type="button"
                          className="action-btn edit-btn"
                          onClick={() => {
                            setMode("EDIT");
                            setCurTodoId(item.id);
                            setInputText(item.todoText);
                            setInputPriority(item.metadata?.priority || "MEDIUM");
                          }}
                          aria-label="แก้ไขงาน"
                          title="แก้ไขงาน"
                        >
                          <IconEdit className="action-icon" />
                        </button>
                        <button
                          type="button"
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(item.id)}
                          aria-label="ลบงาน"
                          title="ลบงาน"
                        >
                          <IconTrash className="action-icon" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Subcomponent for Kanban Columns
function KanbanColumn({
  id,
  title,
  icon,
  badgeClass,
  items,
  onEdit,
  onDelete,
  curTodoId,
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  badgeClass: string;
  items: TodoItem[];
  onEdit: (item: TodoItem) => void;
  onDelete: (id: string) => void;
  curTodoId: string | null;
}) {
  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <h2 className="kanban-column-title">
          {icon} {title}
        </h2>
        <span className={`kanban-count-badge ${badgeClass}`}>{items.length}</span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`kanban-droppable ${snapshot.isDraggingOver ? "is-dragging-over" : ""}`}
          >
            {items.length === 0 ? (
              <div className="kanban-empty">ลากงานมาวางที่นี่</div>
            ) : (
              items.map((item, index) => {
                const { date, time } = formatDateTime(item.createdAt);
                const isEditing = curTodoId === item.id;

                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className={`kanban-card ${draggableSnapshot.isDragging ? "is-dragging" : ""} ${isEditing ? "editing" : ""}`}
                      >
                        <div className="kanban-card-body">
                          <div className="kanban-card-top">
                            <p className="kanban-card-text">{item.todoText}</p>
                            {/* Priority Badge Tag */}
                            {item.metadata?.priority && (
                              <span className={`priority-pill priority-${item.metadata.priority.toLowerCase()}`}>
                                {item.metadata.priority === "HIGH" ? (
                                  <><IconFlame className="btn-icon-sm" /> High</>
                                ) : item.metadata.priority === "LOW" ? (
                                  <><IconLeaf className="btn-icon-sm" /> Low</>
                                ) : (
                                  <><IconZap className="btn-icon-sm" /> Medium</>
                                )}
                              </span>
                            )}
                          </div>

                          {/* Tag Badges */}
                          {item.metadata?.tags && item.metadata.tags.length > 0 && (
                            <div className="tag-pills">
                              {item.metadata.tags.map((tag) => (
                                <span key={tag} className="tag-pill">
                                  <IconTag className="meta-icon" /> #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="kanban-card-meta">
                            <span className="meta-tag">
                              <IconCalendar className="meta-icon" /> {date}
                            </span>
                            {time && (
                              <span className="meta-tag">
                                <IconClock className="meta-icon" /> {time}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="kanban-card-actions">
                          <button
                            type="button"
                            className="action-btn edit-btn"
                            onClick={() => onEdit(item)}
                            title="แก้ไขงาน"
                          >
                            <IconEdit className="action-icon" />
                          </button>
                          <button
                            type="button"
                            className="action-btn delete-btn"
                            onClick={() => onDelete(item.id)}
                            title="ลบงาน"
                          >
                            <IconTrash className="action-icon" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}