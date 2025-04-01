import { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = () => {
        onUpdate(task.id, { title, description });
        setIsEditing(false);
    };

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px 0', 
            borderRadius: '5px',
            //color:'green',
            
            backgroundColor: task.isCompleted ? '#f8f8f8' : 'white'
        }}>
            {isEditing ? (
                <div>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '60px' }}
                    />
                    <button 
                        onClick={handleUpdate}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            marginRight: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        Save
                    </button>
                    <button 
                        onClick={() => setIsEditing(false)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h3 style={{ marginTop: 0 }}>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.isCompleted ? '✅ Completed' : '🟡 Pending'}</p>
                    <button 
                        onClick={() => onToggleComplete(task.id, task.isCompleted)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: task.isCompleted ? '#ff9800' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            marginRight: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        {task.isCompleted ? 'Mark Pending' : 'Mark Complete'}
                    </button>
                    <button 
                        onClick={() => setIsEditing(true)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            marginRight: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => onDelete(task.id)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
       
    );
};

export default TaskItem;