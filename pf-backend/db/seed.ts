import { dbClient } from "./client.js";
import { todoTable } from "./schema.js";

async function seed() {
  console.log("🌱 Starting automated database seeding...");

  const mockTodos = [
    {
      todoText: "Water the indoor plants & check soil sensors",
      isDone: false,
      metadata: {
        tags: ["home", "garden", "iot"],
        priority: "HIGH" as const,
        status: "TODO" as const,
        source: "iot_sensor_webhook",
      },
    },
    {
      todoText: "Review Pull Request for Kanban Board UI",
      isDone: true,
      metadata: {
        tags: ["frontend", "react", "review"],
        priority: "MEDIUM" as const,
        status: "DONE" as const,
        source: "manual",
      },
    },
    {
      todoText: "Configure Vitest Code Coverage reports",
      isDone: false,
      metadata: {
        tags: ["testing", "qa"],
        priority: "HIGH" as const,
        status: "DOING" as const,
        source: "manual",
      },
    },
    {
      todoText: "Deploy PostgreSQL daily backup container",
      isDone: false,
      metadata: {
        tags: ["devops", "docker"],
        priority: "MEDIUM" as const,
        status: "TODO" as const,
        source: "manual",
      },
    },
    {
      todoText: "Generate OpenAPI Swagger documentation",
      isDone: false,
      metadata: {
        tags: ["backend", "api", "swagger"],
        priority: "LOW" as const,
        status: "TODO" as const,
        source: "manual",
      },
    },
  ];

  for (const todo of mockTodos) {
    await dbClient.insert(todoTable).values(todo);
  }

  console.log(`✅ Successfully seeded ${mockTodos.length} mock TODO items!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
