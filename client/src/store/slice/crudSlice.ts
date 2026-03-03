import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/supabase';
import Swal from 'sweetalert2';
import type { AppDispatch } from '../store';

//interface here
interface Record {
    id: number,
    task: string
}

interface crudState {
    task: string,
    record: Record[]
}

const initialState: crudState = {
    task:'',
    record:[]
}

const crudSlice = createSlice({
    name:'crud',
    initialState,
    reducers: {
        setTask: (state, action: PayloadAction<string>) => {
            state.task = action.payload;
        },

        setRecord: (state, action: PayloadAction<Record[]>) => {
            state.record = action.payload;
        }
    }
});

export const getRecordSlice = async (dispatch: AppDispatch) => {
    const {data, error} = await supabase.from('record').select('*');

    if (!error) {
        dispatch(setRecord(data));
    }

    else {
        Swal.fire({
            title:'Error Getting Record',
            text:'There has been error in getting record',
            icon:'error',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }
}

export const addTaskSlice = async (task: string) => {
    const {error} = await supabase.from('record').insert({task: task});

    if (!error) {
        Swal.fire({
            title:'Task Added',
            text:'The task has been added successfully',
            icon:'success',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }

    else {
        Swal.fire({
            title:'Error Adding Record',
            text:'There has been error in adding record',
            icon:'error',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }
}

export const deleteTaskSlice = async (id: number) => {
    const {error} = await supabase.from('record').delete().eq('id', id);

    if (!error) {
        Swal.fire({
            title:'Task Deleted',
            text:'The task has been deleted successfully',
            icon:'success',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }

    else {
        Swal.fire({
            title:'Error Deleting Record',
            text:'There has been error in deleting record',
            icon:'error',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }
}

export const checkTaskSlice = async (id: number, dispatch: AppDispatch) => {
    const {data, error} = await supabase.from('record').select('*').eq('id', id);

    if (!error) {
        dispatch(setTask(data[0].task));
    }

    else {
        Swal.fire({
            title:'Error Getting Task',
            text:'There has been error in getting task',
            icon:'error',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }
}

export const updateTaskSlice = async (id: number, task: string) => {
    const {error} = await supabase.from('record').update({task: task}).eq('id', id);

    if (!error) {
        Swal.fire({
            title:'Task Updated',
            text:'The task has been updated successfully',
            icon:'success',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }

    else {
        Swal.fire({
            title:'Error Updating Record',
            text:'There has been error in updating record',
            icon:'error',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/Home';
            }
        })
    }
}

export const logoutSlice = async () => {
    localStorage.clear();
    window.location.href='/';
}

export const {setTask, setRecord} = crudSlice.actions;

export default crudSlice.reducer;
