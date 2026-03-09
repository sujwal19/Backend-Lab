import http from "http";
import fs from "fs/promises";
import { URL } from "url";
let PORT = 3000;

const FILE = "./todos.json";

let routes = [];

function get(path, handler) {
  routes.push({ method: "GET", path, handler });
}

function post(path, handler) {
  routes.push({ method: "POST", path, handler });
}

function put(path, handler) {
  routes.push({ method: "PUT", path, handler });
}

function del(path, handler) {
  routes.push({ method: "DELETE", path, handler });
}

// Read JSON from file
async function readTodos() {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

// Write JSON to file
async function writeTodos(todos) {
  await fs.writeFile(FILE, JSON.stringify(todos, null, 2));
}

// Parse POST/PUT body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", (err) => reject(err));
  });
}

// // ---------------------- ROUTES ----------------------

// GET /todos  OR  /todos?completed=true&limit=2
get("/todos", async (req, res, params, query) => {
  let todos = await readTodos();

  if (query.completed) {
    const completed = query.completed === "true";
    todos = todos.filter((t) => Boolean(t.completed) === completed);
  }

  if (query.limit) {
    todos = todos.slice(0, Number(query.limit));
  }

  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(todos));
});

// GET /todos/:id
get("/todos/:id", async (req, res, params) => {
  const todos = await readTodos();
  const todo = todos.find((t) => t.id == params.id);
  if (!todo) return res.writeHead(404) && res.end("Todo not found");
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(todo));
});

// POST /todos
post("/todos", async (req, res) => {
  const todos = await readTodos();
  const newTodo = await parseBody(req);
  newTodo.id = todos.length + 1;
  newTodo.completed = newTodo.completed ?? false;
  todos.push(newTodo);
  await writeTodos(todos);
  res.writeHead(201, { "content-type": "application/json" });
  res.end(JSON.stringify(newTodo));
});

put("/todos/:id", async (req, res, params) => {
  let todos = await readTodos();
  const index = todos.findIndex((t) => t.id == params.id);
  if (index === -1) {
    res.writeHead(404);
    return res.end("Todo not found");
  }
  const updates = await parseBody(req);
  todos[index] = { ...todos[index], ...updates };
  await writeTodos(todos);
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(todos[index]));
});

del("/todos/:id", async (req, res, params) => {
  let todos = await readTodos();
  const filtered = todos.filter((t) => t.id != params.id);
  if (filtered.length === todos.length) {
    return res.writeHead(404) && res.end("Todo not found");
  }
  await writeTodos(filtered);
  res.writeHead(204);
  res.end();
});

const server = http.createServer(async (req, res) => {
  const parseUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parseUrl.pathname;
  const query = Object.fromEntries(parseUrl.searchParams);

  let matched = null;
  let params = {};

  for (const route of routes) {
    if (route.method !== req.method) continue;

    const routeParts = route.path.split("/").filter(Boolean);
    const pathParts = pathname.split("/").filter(Boolean);
    if (routeParts.length !== pathParts.length) continue;

    let isMatch = true;
    params = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        const name = routeParts[i].slice(1);
        params[name] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      matched = route;
      break;
    }
  }

  if (matched) return matched.handler(req, res, params, query);

  res.writeHead(404);
  res.end("Route not found");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
