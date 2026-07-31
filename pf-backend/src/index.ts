import "dotenv/config";
import { dbClient, dbConn } from "@db/client.js";
import { todoTable } from "@db/schema.js";
import cors from "cors";
import Debug from "debug";
import { eq } from "drizzle-orm";
import type { ErrorRequestHandler } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
const debug = Debug("pf-backend");

const app = express();

// Middleware
app.use(morgan("dev", { immediate: false }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

// Query (GET)
app.get("/todo", async (req, res, next) => {
  try {
    const results = await dbClient.select().from(todoTable);
    if (results && results.length > 0) {
      return res.json(results);
    }
    if (dbConn && dbConn.query) {
      const raw = await dbConn.query("SELECT id, todo_text as \"todoText\", is_done as \"isDone\", metadata, created_at as \"createdAt\", updated_at as \"updatedAt\" FROM todo ORDER BY created_at DESC;");
      if (raw && raw.rows) return res.json(raw.rows);
    }
    res.json(results || []);
  } catch (err) {
    next(err);
  }
});

// Insert (POST)
app.post("/todo", async (req, res, next) => {
  try {
    const todoText = req.body.todoText ?? "";
    if (!todoText) throw new Error("Empty todoText");
    const isDone = req.body.isDone ?? false;
    const metadata = req.body.metadata ?? {};

    const result = await dbClient
      .insert(todoTable)
      .values({
        todoText,
        isDone,
        metadata,
      })
      .returning();
    res.json({ msg: "Insert successfully", data: result[0] });
  } catch (err) {
    next(err);
  }
});

// Update or Insert (PUT)
app.put("/todo", async (req, res, next) => {
  try {
    const id = req.body.id;
    const todoText = req.body.todoText;
    const isDone = req.body.isDone;
    const metadata = req.body.metadata;

    if (!id) {
      if (!todoText) throw new Error("Empty todoText");
      const result = await dbClient
        .insert(todoTable)
        .values({
          todoText,
          isDone: isDone ?? false,
          metadata: metadata ?? {},
        })
        .returning();
      return res.json({ msg: "Insert successfully", data: result[0] });
    }

    const setValues: any = { updatedAt: new Date() };
    if (todoText !== undefined) setValues.todoText = todoText;
    if (isDone !== undefined) setValues.isDone = isDone;
    if (metadata !== undefined) setValues.metadata = metadata;

    const result = await dbClient
      .update(todoTable)
      .set(setValues)
      .where(eq(todoTable.id, id))
      .returning();
    res.json({ msg: "Update successfully", data: result[0] });
  } catch (err) {
    next(err);
  }
});

// Delete
app.delete("/todo", async (req, res, next) => {
  try {
    const id = (req.body?.id || req.query?.id) ?? "";
    if (!id) throw new Error("Empty id");

    const results = await dbClient.select().from(todoTable).where(eq(todoTable.id, id));
    if (results.length === 0) throw new Error("Invalid id");

    await dbClient.delete(todoTable).where(eq(todoTable.id, id));
    res.json({ msg: "Delete successfully", id });
  } catch (err) {
    next(err);
  }
});

// IoT/Hardware Webhook Endpoint
// app.post("/api/webhooks/iot", async (req, res, next) => {
//   try {
//     const { deviceId, event, sensorData, title } = req.body;
//     const todoText = title || `[IoT Alert] ${event || "Sensor trigger"} from ${deviceId || "ESP32-Node"}`;
//     const tags = ["iot", deviceId || "esp32"].map((t: string) => t.toLowerCase());

//     const result = await dbClient
//       .insert(todoTable)
//       .values({
//         todoText,
//         isDone: false,
//         metadata: {
//           tags,
//           priority: "HIGH",
//           status: "TODO",
//           source: "iot_webhook",
//           sensorData: sensorData || {},
//         },
//       })
//       .returning();

//     res.status(201).json({
//       success: true,
//       message: "IoT Webhook processed and TODO created successfully",
//       todo: result[0],
//     });
//   } catch (err) {
//     next(err);
//   }
// });

const jsonErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  debug(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};

app.use(jsonErrorHandler);

const PORT = process.env.PORT || 3001;

async function ensureSeedData() {
  try {
    const existing = await dbClient.select().from(todoTable);
    if (existing.length === 0) {
      await dbClient.insert(todoTable).values([
        {
          todoText: "นอน #พักผ่อน",
          isDone: false,
          metadata: { tags: ["พักผ่อน"], priority: "MEDIUM", status: "DONE", source: "manual" }
        },
        {
          todoText: "เล่นเกม #ชิวๆ",
          isDone: false,
          metadata: { tags: ["ชิวๆ"], priority: "HIGH", status: "DOING", source: "manual" }
        },
        {
          todoText: "ทำงาน FullStack #ทรมาน",
          isDone: true,
          metadata: { tags: ["ทรมาน"], priority: "LOW", status: "TODO", source: "manual" }
        }
      ]);
      console.log("🌱 Auto-seeded initial TODO items!");
    }
  } catch (err) {
    console.error("Auto-seed error:", err);
  }
}

app.listen(PORT, () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
  console.log(`Backend server listening on http://localhost:${PORT}`);
  ensureSeedData();
});
