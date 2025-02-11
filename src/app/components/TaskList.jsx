"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getTasks, addTask, updateTask, deleteTask } from "@/app/actions/taskActions";
import AddNewTask from "./taskTable/AddNewTask";

export default function TaskTable() {
  const [rows, setRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [editTask, setEditTask] = React.useState(null); //For editing task
  const [sortOrder, setSortOrder] = React.useState("asc");

  // Fetch tasks from backend
  React.useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const taskList = await getTasks();
      setRows(taskList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Toggle Task Completion
  const handleToggle = async (index) => {
    try {
      const updatedRows = [...rows];
      updatedRows[index] = { ...updatedRows[index], completed: !updatedRows[index].completed };

      await updateTask(updatedRows[index]._id, { completed: updatedRows[index].completed });

      setRows(updatedRows);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task
  const handleDelete = async (index) => {
    try {
      const taskId = rows[index]._id;
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Open & Close Add/Edit Modal
  const handleOpen = () => {
    setEditTask(null);
    setOpen(true);
  };
  const handleEdit = (task) => {
    setEditTask(task);
    setOpen(true);
  };

  // Save New or Updated Task
  const handleSaveData = async (newTask) => {
    if (editTask) {
      await updateTask(editTask._id, newTask); //Update task
    } else {
      await addTask(newTask.title, newTask.description, newTask.dueDate); // Add new task
    }

    fetchTasks();
    setOpen(false);
  };

  // Sorting by Due Date
  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    const sortedRows = [...rows].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });

    setRows(sortedRows);
  };

  // Search Filter
  const filteredRows = rows.filter(
    (row) =>
      row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.dueDate.includes(searchQuery)
  );

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 1100,

        margin: "auto",
        marginBlock: "40px",
        p: 2
      }}>
      {/* Search Bar, Sort, Add Button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search Tasks"
          variant="outlined"
          size="small"
          sx={{ width: "60%" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={sortOrder} onChange={handleSortChange} size="small">
          <MenuItem value="asc">Sort by Due Date (Ascending)</MenuItem>
          <MenuItem value="desc">Sort by Due Date (Descending)</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Task
        </Button>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={row._id} sx={{ backgroundColor: row.completed ? "#16f0cf" : "inherit" }}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>
                  <Switch checked={row.completed} onChange={() => handleToggle(index)} />
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: "red", color: "white", ml: 1 }}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Task Modal */}
      <AddNewTask open={open} setOpen={setOpen} handleSaveTask={handleSaveData} task={editTask} />
    </Paper>
  );
}
