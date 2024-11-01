// src/components/ViewTaskModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ViewTaskModal = ({ open, onClose, task }) => {
  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {task.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {task.description}
        </Typography>
        {task.dueDate && (
          <Typography variant="body2" color="textSecondary">
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        )}
        <Button onClick={onClose} variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ViewTaskModal;