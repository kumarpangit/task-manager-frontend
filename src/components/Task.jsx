import { useEffect, useState } from "react";
import { createTask, getTaskById, updateTask, getStatuses } from "../services/TaskService";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Task = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [statusId, setSelectedStatus] = useState(0);

    const [errors, setErrors] = useState({
        title: '',
        desc: '',
        dueDate: '',
        statusId: ''
    });

    const navigate = useNavigate();
    const id = useParams().id;
    const location = useLocation();
    console.log("Location:", location);

    useEffect(() => {
        if (id) {
            getTaskById(id).then((response) => {
                let task = response.data;
                setTitle(task.title);
                setDesc(task.description);
                setDueDate(task.dueDate);
                setSelectedStatus(task.statusId);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    useEffect(() => {
        // Fetch statuses from backend
        getStatuses().then((response) => {
            setStatuses(response.data);
            console.log("Fetched statuses:", response.data);
        }).catch(error => console.error('Error fetching statuses:', error));
    }, []);


    function validate() {
        let valid = true;
        let errors = {
            title: '',
            desc: '',
            dueDate: '',
            selectedStatus: ''
        };

        if (!title) {
            errors.title = 'Title is required';
            valid = false;
        }
        if (!dueDate) {
            errors.dueDate = 'Due Date is required';
            valid = false;
        }
        
        setErrors(errors);
        return valid;
    }

    function pageTitle() {
        if (location.pathname.includes('view-task')) {
            return <h2 className='text-center'>View Task</h2>
        }
        else if (id) {
            return <h2 className='text-center'>Update Task</h2>
        }
        else {
            return <h2 className='text-center'>Add Task</h2>
        }
    }

    function saveTask(e) {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        const task = { title, description: desc, dueDate, statusId };
        console.log(task);

        if (id) {
            updateTask(id, task).then(response => {
                console.log("Task updated successfully:", response.data);
                navigate('/tasks');
            }).catch(error => {
                console.error("There was an error updating the task!", error);
            });
        }
        else {
            createTask(task).then(response => {
                console.log("Task created successfully:", response.data);
                navigate('/tasks');
            }).catch(error => {
                console.error("There was an error creating the task!", error);
            });
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    { pageTitle() }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Title:</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Title" 
                                    name="title" 
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Description:</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Description" 
                                    name="description" 
                                    className={`form-control ${errors.desc ? 'is-invalid' : ''}`}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                                {errors.desc && <div className="invalid-feedback">{errors.desc}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Due Date:</label>
                                <input 
                                    type="date" 
                                    placeholder="Enter Due Date" 
                                    name="dueDate"
                                    className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
                            </div>
                            <div>
                                <label className="form-label">Status:</label>
                                <select 
                                    className="form-select"
                                    value={statusId}
                                    onChange={(e) => {
                                        setSelectedStatus(parseInt(e.target.value));
                                    }}
                                >
                                    <option value="">Select Status</option>
                                    {statuses.map(status => (
                                        <option key={status.id} value={status.id}>
                                            {status.name} - {status.description}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            { location.pathname.includes('edit-task') || location.pathname.includes('add-task') ?
                            <div>
                            <button className="btn btn-success" onClick={saveTask}>Save</button>
                            <button className="btn btn-danger" 
                                style={{marginLeft: "10px"}} onClick={() => navigate('/tasks')}>Cancel</button></div> :
                            <button className="btn btn-success" onClick={() => navigate('/tasks')}>Back</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Task;