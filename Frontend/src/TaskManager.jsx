import './TaskManager.css';
import { ToastContainer } from 'react-toastify';
import { FaPlus, FaSearch, FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState, useCallback ,useMemo } from 'react';
import { createTasks, getalltasks, deletetask, donetask } from './api';
import { notify } from './utils';

function TaskManager() {
    const [inputt, setinputt] = useState("");
    const [tasks, settasks] = useState([]);
    const [searchedtask, setsearchedtask] = useState([]);
    const [updatetask, setupdatetask] = useState(null);
    const [searching, setsearching] = useState(false);


    const fetchAllTasks = useCallback(async () => {
        try {
            const data = await getalltasks();
            settasks(data);
            setsearchedtask(data);
        } catch (err) {
            console.log(err)
            notify("Failed to Fetch task", "error")
        }
    }, [])

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        if (term === "") {
            setsearching(false);
            setsearchedtask(tasks);
            return;
        }
        const oldtask = [...tasks];
        const ans = oldtask.filter((item) => item.taskname.toLowerCase().includes(term));
        setsearchedtask(ans);
    }

    const handledelete = useCallback(async (id) => {
        try {
            const { message, success } = await deletetask(id);
            if (updatetask) {
                setupdatetask(null);
            }
            else {
                if (success) {
                    notify(message, "success");
                    await fetchAllTasks();
                }
                else {
                    notify(message, "error");
                }
            }
        } catch (err) {
            console.log(err)
            notify("Failed to Delete task", "error")
        }
    }, [fetchAllTasks, updatetask])

    const handletask = useCallback(async () => {
        if (updatetask) {
            await handledelete(updatetask._id);
        }
        const details = {
            taskname: inputt,
            taskisdone: false,
        }
        try {
            const { message, success } = await createTasks(details);
            if (success) {
                notify(message, "success");
                await fetchAllTasks();
            }
            else {
                notify(message, "error");
            }
            setinputt("");
        }
        catch (err) {
            console.log(err)
            notify("Failed to Create task", "error")
        }
    }, [inputt, updatetask, fetchAllTasks, handledelete])



    const handledone = useCallback(async (id, taskname1, taskisdone1) => {
        const Obj = {
            taskname: taskname1,
            taskisdone: !taskisdone1,
        }
        try {
            const { success } = await donetask(id, Obj);
            if (success) {
                if (taskisdone1 === false)
                    notify("Task is Marked as Done", "success");
                if (taskisdone1 === true)
                    notify("Task is Marked as Undone", "success");
                await fetchAllTasks();
            }
            else {
                notify("Unable to mark task", "error");
            }
        } catch (err) {
            console.log(err)
            notify("Unable to mark task dones", "error")
        }
    }, [fetchAllTasks])



    useEffect(() => {
        if (updatetask?.taskname) {
            setinputt(updatetask.taskname);
        }
    }, [updatetask]);

    useEffect(() => {
        fetchAllTasks();
    }, [])
    
    const listToRender = useMemo(() => (searching ? searchedtask : tasks), [searching, tasks, searchedtask]);



    return (
        <div className="TaskManager">
            <h1>Task Manager App</h1>
            <div className="inputcontainer">
                <div className="inputdiv">
                    <input type="text" placeholder="Enter new task here..."
                        value={inputt}
                        onChange={(e) => setinputt(e.target.value)} />
                    <button className='btn btn-success btn-sms btncss curvesettinga' onClick={handletask} >
                        <FaPlus />
                    </button>
                </div>
                <div className="inputdiv">
                    <span className='btn btn-secondary btn-sms btncss curvesettingb'>
                        <FaSearch />
                    </span>
                    <input type="text" placeholder="Search tasks..."
                        onChange={(e) => { handleSearch(e), setsearching(true); }} />

                </div>
            </div>
            <div className="listcontainers">
                {listToRender.map(({ taskname, taskisdone, _id }) => (
                    <div className="innerdiv" key={_id}>
                        <span className={taskisdone ? 'text-decoration-line-through' : ''}
                        >
                            {taskname}
                        </span>
                        <div className="buttons">
                            <button className="btn btn-success btn-sms"
                                onClick={() => handledone(_id, taskname, taskisdone)}>
                                <FaCheck />
                            </button>
                            <button className="btn btn-primary btn-sms"
                                onClick={() => setupdatetask({ _id, taskname })}>
                                <FaPen />
                            </button>
                            <button className="btn btn-danger btn-sms"
                                onClick={() => handledelete(_id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>))}
            </div>
            <ToastContainer
                position='top-right'
                autoClose={1000}
                hideProgressBar={false}>
            </ToastContainer>
        </div>
    );
}

export default TaskManager;

