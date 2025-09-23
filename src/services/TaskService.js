import axios from 'axios';

const TASK_API_BASE_URL = "http://localhost:4000/";

export const getTasks = () => axios.get(TASK_API_BASE_URL + 'tasks');
export const getStatuses = () => axios.get(TASK_API_BASE_URL + 'statuses');
export const createTask = (task) => axios.post(TASK_API_BASE_URL + 'task', task);
export const getTaskById = (taskId) => axios.get(TASK_API_BASE_URL + `task/${taskId}`);
export const updateTask = (taskId, task) => axios.put(TASK_API_BASE_URL + `task/${taskId}`, task);
export const removeTask = (taskId) => axios.delete(TASK_API_BASE_URL + `task/${taskId}`);