import {
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [title, setTitle] = useState("");
  const [archive, setArchive] = useState(false);

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      header: title,
      completed: false,
      createdAt: new Date().toLocaleTimeString(),
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
    setTitle("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        todo.header = editingTitle;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  function handleArchived(id) {
    setArchive(!archive);
  }
  return (
    <Container
      id="todo-list"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography variant="h2">Todo List</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",

          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <TextField
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="outlined-select-currency"
          label="Title"
        />
        <TextField
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          id="outlined-select-currency"
          label="Body"
        />

        <Button variant="contained" type="submit">
          Add Todo
        </Button>
      </Box>

      {todos.map((todo) => (
        <Box
          key={todo.id}
          sx={{
            display: "flex",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "10px",
            padding: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {!archive ? (
              <Typography variant="p">
                {todo.completed
                  ? `Finished at ${new Date().toLocaleTimeString()}`
                  : `Created At ${todo.createdAt}`}
              </Typography>
            ) : (
              <Typography variant="p">
                Archived at {new Date().toLocaleTimeString()}
              </Typography>
            )}
            <Checkbox
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <TextField
                type="text"
                onChange={(e) => setEditingTitle(e.target.value)}
                id="outlined-select-currency"
                placeholder={todo.header}
              />
            ) : (
              <Typography
                variant="h5"
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.header}
              </Typography>
            )}
            {todo.id === todoEditing ? (
              <TextField
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                id="outlined-select-currency"
                placeholder={todo.text}
              />
            ) : (
              <Typography
                variant="h5"
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </Typography>
            )}
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            {todo.id === todoEditing ? (
              <Button
                onClick={() => submitEdits(todo.id)}
                variant="contained"
                color="success"
              >
                Edit{" "}
              </Button>
            ) : (
              <Button
                onClick={() => setTodoEditing(todo.id)}
                variant="contained"
                color="success"
              >
                Edit
              </Button>
            )}

            <Button
              onClick={() => deleteTodo(todo.id)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <Button
              onClick={handleArchived}
              variant="contained"
              color="secondary"
            >
              Archive
            </Button>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
