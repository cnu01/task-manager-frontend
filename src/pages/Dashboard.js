// src/pages/Dashboard.js
import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";
import TaskFormModal from "../components/TaskFormModal";
import ViewTaskModal from "../components/ViewTaskModal";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/api";
import { TextField, Button, Box, MenuItem, Select } from "@mui/material";

const Dashboard = () => {
  const [columns, setColumns] = useState({
    todo: { name: "To Do", items: [] },
    inprogress: { name: "In Progress", items: [] },
    completed: { name: "Completed", items: [] },
  });
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("recent");
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState(null);

  // Fetch and organize tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        const tasks = response.data.tasks;

        const updatedColumns = {
          todo: {
            name: "To Do",
            items: tasks.filter((task) => task.column === "todo"),
          },
          inprogress: {
            name: "In Progress",
            items: tasks.filter((task) => task.column === "inprogress"),
          },
          completed: {
            name: "Completed",
            items: tasks.filter((task) => task.column === "completed"),
          },
        };
        setColumns(updatedColumns);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, []);

  // Handle task creation
  const handleAddTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      const newTask = response.data.task;

      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: {
          ...prevColumns.todo,
          items: [newTask, ...prevColumns.todo.items],
        },
      }));
      setTaskModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle task update
  const handleSaveTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask._id, updatedTask);
      setColumns((prevColumns) => {
        const updatedColumns = { ...prevColumns };
        const columnKey = updatedTask.column;
        const items = [...updatedColumns[columnKey].items];
        const index = items.findIndex((item) => item._id === updatedTask._id);
        if (index !== -1) {
          items[index] = updatedTask;
        }
        updatedColumns[columnKey].items = items;
        return updatedColumns;
      });
      setTaskModalOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setColumns((prevColumns) => {
        const updatedColumns = { ...prevColumns };
        for (const columnKey in updatedColumns) {
          updatedColumns[columnKey].items = updatedColumns[
            columnKey
          ].items.filter((item) => item._id !== taskId);
        }
        return updatedColumns;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Prepare task for editing
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setTaskModalOpen(true);
  };

  // Handle drag-and-drop action
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (!sourceColumn || !destColumn) {
      console.error("Invalid source or destination column ID");
      return;
    }

    const sourceItems = Array.from(sourceColumn.items);
    const [movedTask] = sourceItems.splice(source.index, 1);
    const destItems = Array.from(destColumn.items);
    destItems.splice(destination.index, 0, movedTask);

    const updatedColumns = {
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems },
    };

    setColumns(updatedColumns);

    // Update the column in the backend
    updateTask(movedTask._id, { column: destination.droppableId }).catch(
      (error) => console.error("Error updating task:", error)
    );
  };

  const handleSort = useCallback(
    (criteria) => {
      const sorted = { ...columns };
      for (const columnKey in sorted) {
        sorted[columnKey].items = [...sorted[columnKey].items].sort((a, b) => {
          if (criteria === "recent") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (criteria === "dueDate") {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
          } else if (criteria === "title") {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      }
      setColumns(sorted);
    },
    [columns]
  );

  useEffect(() => {
    handleSort(sortCriteria);
  }, [sortCriteria, columns, handleSort]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filteredColumns = {};
    for (const columnKey in columns) {
      filteredColumns[columnKey] = {
        ...columns[columnKey],
        items: columns[columnKey].items.filter((task) =>
          task.title.toLowerCase().includes(event.target.value.toLowerCase())
        ),
      };
    }
    setColumns(filteredColumns);
  };

  const handleViewTask = (task) => {
    setViewingTask(task);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewingTask(null);
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: 2,
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTaskModalOpen(true)}
        >
          Create Task
        </Button>
        <TextField
          label="Search by Title"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          displayEmpty
          size="small"
        >
          <MenuItem value="recent">Sort by Recent</MenuItem>
          <MenuItem value="dueDate">Sort by Due Date</MenuItem>
          <MenuItem value="title">Sort by Title</MenuItem>
        </Select>
      </Box>
      <TaskBoard
        columns={columns}
        onDragEnd={onDragEnd}
        onView={handleViewTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      <TaskFormModal
        open={isTaskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        task={currentTask}
        onSave={handleSaveTask}
        onAdd={handleAddTask}
      />
      <ViewTaskModal
        open={isViewModalOpen}
        onClose={closeViewModal}
        task={viewingTask}
      />
    </div>
  );
};

export default Dashboard;
