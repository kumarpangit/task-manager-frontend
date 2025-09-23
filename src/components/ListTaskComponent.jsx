import React, { useState, useEffect, use } from 'react'
import { getTasks, removeTask, getStatuses } from '../services/TaskService'
import { useNavigate, useParams } from 'react-router-dom'

const ListTaskComponent = () => {

    const [tasks, setTasks] = useState([])
    const [statuses, setStatuses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getTasksList();
    }, []);

    function getTasksList() {
        getTasks().then((response) => {
            setTasks(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
        
    useEffect(() => {
        // Fetch statuses from backend
        getStatuses().then((response) => {
            setStatuses(response.data);
            console.log("Fetched statuses:", response.data);
        }).catch(error => console.error('Error fetching statuses:', error));
    }, []);

    function addTask() {
        navigate('/add-task');
    }

    function updateTask(id) {
        navigate(`/edit-task/${id}`);
    }
    
    function deleteTask(id, title) {
        const confirmDelete = window.confirm("Are you sure you want to delete task : " + title +" ?");
        if (!confirmDelete) {
            return;
        }
        console.log("Delete task with id:", id);
        removeTask(id).then(() => {
            getTasksList();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
    <div className='container'>
        <h2 className='text-center'>Tasks</h2>
        <button className='btn btn-primary mb-2' onClick={addTask}>Add Task</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => {
                    const statusName = statuses.find(status => status.id === task.statusId)?.name || 'Unknown'; 
                    return (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.dueDate}</td>
                        <td>{statusName}</td>
                        <td>
                            <button className='btn btn-info' style={{marginRight: "10px"}} 
                                    onClick={() => navigate(`/view-task/${task.id}`)}>View</button>
                            <button className='btn btn-info' onClick={() => updateTask(task.id)}>Update</button>
                            <button style={{marginLeft: "10px"}}
                                    className='btn btn-danger' onClick={() => deleteTask(task.id, task.title)}>Delete</button>
                        </td>
                    </tr>
                )})}
            </tbody>
        </table>
    </div>
  )
}

export default ListTaskComponent