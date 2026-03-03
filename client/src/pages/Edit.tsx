import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../store/store';
import {setTask, getRecordSlice, checkTaskSlice, updateTaskSlice, deleteTaskSlice, logoutSlice} from '../store/slice/crudSlice';
import '../assets/css/Style.css';

function Edit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const task = useSelector((state: RootState) => state.crud.task);
    const record = useSelector((state: RootState) => state.crud.record);

    const {id} = useParams();

    useEffect(() => {
        getRecordSlice(dispatch);
        checkTaskSlice(Number(id), dispatch);
    },[dispatch, id]);

    const updateTask = async (e: React.FormEvent) => {
        e.preventDefault();

        updateTaskSlice(Number(id), task);
    }

    const edit = async (id: number) => {
        navigate(`/Edit/${id}`);
    }

    const deleteTask = async (id: number) => {
        deleteTaskSlice(id);
    }

    return(
        <>
        {/* Main Content */}
        <br />
        <button className='btn btn-danger' style={{marginLeft:15}} onClick={() => logoutSlice()}>Logout</button>

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h3>User Type: {localStorage.getItem('user_type')}</h3>
                <br />

                <form onSubmit={updateTask}>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='Enter a task' onChange={(e) => dispatch(setTask(e.target.value))} value={task} className='form-control'/>
                        <button className='btn btn-primary' style={{marginLeft:15}}>Update</button>
                    </div>
                </form>
            </div>
        </div><br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <table className='table'>
                <thead>
                    <tr>
                        <th style={{textAlign:'center', height:50, fontSize:25, backgroundColor:'black', color:'white'}}>Task</th>
                        <th style={{textAlign:'center', height:50, fontSize:25, backgroundColor:'black', color:'white'}}>Action</th>
                    </tr>
                </thead>

                {record.map((rec) => (
                <tbody key={rec.id}>
                    <tr>
                        <td style={{textAlign:'center', height:30, fontSize:17}}>{rec.task}</td>
                        <td style={{textAlign:'center', height:30, fontSize:17}}><button className='btn btn-warning' onClick={() => edit(rec.id)}>Edit</button> <button className='btn btn-danger' onClick={() => deleteTask(rec.id)}>Delete</button></td>
                    </tr>
                </tbody>
                ))}

            </table>
        </div>
        </>
    );
}

export default Edit;
