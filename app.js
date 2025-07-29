const express = require("express");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


let todos = [];

app.get("/", (req, res) => {
  const filter = req.query.priority || "All";
  let filteredTodos = todos;

  if (filter !== "All") {
    filteredTodos = todos.filter(todo => todo.priority === filter);
  }

  res.render("list", { todos: filteredTodos, filter });
});

app.post("/", (req, res) => {
  const { ele1, priority } = req.body;
  if (ele1.trim() !== "") {
    todos.push({
      text: ele1.trim(),
      priority,
      id: Date.now(),
    });
  }
  res.redirect("/");
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { updatedText } = req.body;

  todos = todos.map(todo => {
    if (todo.id == id) {
      return { ...todo, text: updatedText };
    }
    return todo;
  });

  res.redirect("/");
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
