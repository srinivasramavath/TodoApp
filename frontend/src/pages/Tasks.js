import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
    const { tasks, loading, fetchTasks, addTask, updateTask, deleteTask } = useTasks();
    const { profile, logout } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (task) => {
        await addTask(task);
        //toast.success('task added successfully');
        setShowForm(false);
    };

    const handleToggleComplete = async (id, isCompleted) => {
        await updateTask(id, { isCompleted: !isCompleted });
    };

    if (loading) return <div style={{ textAlign: 'center', margin: '100px'  }}>Loading...</div>;

    return (
        <div style={{
            height:'100vh',
            backgroundColor: 'rgba(100, 0, 100, 0.2)'
         } }> 
        <div style={{ 
            maxWidth: '1000px', 
            maxHeight:'px',
            margin: '0 auto', 
            padding: '20px',
            //backgroundColor: 'lightred'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '1px solid #eee'
            }}>
                <div>
                    <h2 style={{ margin: 0 }}>Welcome, <b>{profile?.name || profile?.username}</b></h2>
                    <p style={{ margin: '5px 0', color: '#666' }}>Email: {profile?.email}</p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                        Member since: {new Date(profile?.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <button 
                    onClick={logout}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={() => setShowForm(true)}
                    disabled={showForm}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: showForm ? '#f8c8dc' : '#4CAF50',
                        color: '#f9f9f9',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Add New Task
                </button>
            </div>

            {showForm && (
                <div style={{ 
                    marginBottom: '30px', 
                    padding: '20px', 
                    border: '1px solid #ddd', 
                    borderRadius: '5px',
                    backgroundColor: '#green'
                }}>
                    <TaskForm
                        onSubmit={handleAddTask}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            <div>
                {tasks.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '30px',
                        backgroundColor: 'lightpink',
                        borderRadius: '5px'
                    }}>
                        <p>No tasks found. Add your first task!</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
        
                    ))
                )}
            </div>
        </div>
        </div>
    );
};

export default Tasks;