// src/components/TaskFormModal.js
import React, { useState, useEffect } from 'react';
import { MenuItem, Modal, Box, TextField, Button, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};


const TaskFormModal = ({ open, onClose, task, onSave, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState('todo');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumn(task.column);
      setDueDate(task.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setColumn('todo');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      column,
      dueDate,
    };

    if (task) {
      // Editing existing task
      onSave({ ...task, ...taskData });
    } else {
      // Creating new task
      onAdd(taskData);
    }

    onClose(); // Close modal after action
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" mb={2}>
          {task ? 'Edit Task' : 'Create Task'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Column"
            select
            fullWidth
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {task ? 'Save Changes' : 'Add Task'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskFormModal;