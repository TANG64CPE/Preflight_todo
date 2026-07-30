export interface TodoMetadata {
  tags?: string[];
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "TODO" | "DOING" | "DONE";
  source?: string;
}

export interface TodoItem {
  id: string;
  todoText: string;
  isDone: boolean;
  metadata?: TodoMetadata;
  createdAt?: string;
  updatedAt?: string;
}
