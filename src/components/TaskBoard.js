// src/components/TaskBoard.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Paper, Typography } from '@mui/material';
import TaskCard from './TaskCard';

const TaskBoard = ({ columns, onDragEnd, onView, onEdit, onDelete }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Grid container spacing={2} mt={3} justifyContent="center">
      {Object.entries(columns).map(([columnId, column]) => (
        <Grid item xs={12} sm={6} md={4} key={columnId}>
          <Paper
            elevation={2}
            sx={{
              p: 1,
              m: 1,
              backgroundColor: '#fafafa',
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              minHeight: 350,
              maxWidth: 300,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtitle1"
              color="primary"
              align="center"
              sx={{
                mb: 1,
                fontWeight: '600',
                textTransform: 'uppercase',
                color: '#1976d2',
              }}
            >
              {column.name}
            </Typography>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ minHeight: 300, width: '100%' }}
                >
                  {column.items.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            marginBottom: 8,
                            width: '100%',
                          }}
                        >
                          <TaskCard task={task} onView={onView} onEdit={onEdit} onDelete={onDelete} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </DragDropContext>
);

export default TaskBoard;