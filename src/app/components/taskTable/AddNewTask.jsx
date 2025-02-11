import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField, Box, Paper } from "@mui/material";

const AddNewTask = ({ open, setOpen, handleSaveTask, task }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [dateError, setDateError] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  
  useEffect(() => {
    if (task) {
      setNewTask({ title: task.title, description: task.description, dueDate: task.dueDate });
    } else {
      setNewTask({ title: "", description: "", dueDate: "" });
    }
  }, [task]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));

    if (name === "dueDate") {
      setDateError(value < today);
    }
  };

  // Save Task & Close Modal
  const handleSave = () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) return;

    handleSaveTask(newTask);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 24, width: 400, margin: "auto" }}>
        <Paper sx={{ padding: 3 }}>
          <h2>{task ? "Edit Task" : "Add New Task"}</h2>
          <TextField
            fullWidth label="Task Title"
            name="title"
            margin="normal"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth label="Description"
            name="description"
            margin="normal"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth label="Due Date"
            type="date" 
            name="dueDate"
            InputLabelProps={{shrink: true}}
            margin="normal"
            value={newTask.dueDate}
            onChange={handleInputChange}
            inputProps={{ min: today }}
            error={dateError}
            helperText={dateError ? "Due date cannot be in the past!" : ""}
          />
          <Button variant="contained" color="primary" onClick={handleSave} disabled={dateError}>{task ? "Update" : "Save"} Task</Button>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AddNewTask;
