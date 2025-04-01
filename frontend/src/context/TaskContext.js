import { createContext, useContext, useState, useEffect } from 'react';
import api  from '../utils/api';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/task');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await api.post('/task', task);
            setTasks([...tasks, response.data]);
            toast.success('task added successfully');
        } catch (error) {
            console.error('Failed to add task:', error);
            toast.error('failed to add task!');
            throw error;
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const response = await api.put(`/task/${id}`, updatedTask);
            setTasks(tasks.map(task => task.id === id ? response.data : task));
            toast.success('task updated successfully!');
        } catch (error) {
            console.error('Failed to update task:', error);
            throw error;
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/task/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
            toast.success('task deleted successfully!');
        } catch (error) {
            console.error('Failed to delete task:', error);
            toast.error('failed to delete task');
            throw error;
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);