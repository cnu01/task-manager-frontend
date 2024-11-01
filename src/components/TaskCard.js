// src/components/TaskCard.js
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import moment from 'moment';

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Card
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          backgroundColor: '#f7f9fc',
        },
      }}
    >
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {task.description}
        </Typography>
        <Typography
          variant="caption"
          color={isOverdue ? 'error.main' : 'textSecondary'}
          sx={{
            display: 'block',
            fontWeight: isOverdue ? 'bold' : 'normal',
            color: isOverdue ? '#d32f2f' : 'text.secondary',
          }}
        >
          Due: {task.dueDate ? moment(task.dueDate).format('MM/DD/YYYY') : 'N/A'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Button
            variant="text"
            onClick={() => onView(task)}
            sx={{ fontSize: '0.75rem', color: '#1976d2' }}
          >
            View
          </Button>
          <Button
            variant="text"
            onClick={() => onEdit(task)}
            sx={{ fontSize: '0.75rem', color: '#1976d2' }}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => onDelete(task._id)}
            sx={{ fontSize: '0.75rem' }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;