import { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px', backgroundcolor:'pink' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '8px', minHeight: '60px' }}
                />
            </div>
            <button 
                type="submit"
                style={{ 
                    padding: '8px 15px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    marginRight: '10px',
                    cursor: 'pointer'
                }}
            >
                Add Task
            </button>
            <button 
                type="button" 
                onClick={onCancel}
                style={{
                    padding: '8px 15px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Cancel
            </button>
        </form>
    );
};

export default TaskForm;