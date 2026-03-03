import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/supabase';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

//interface here
interface authState {
    name: string;
    email: string;
    pass: string;
    type: string;
}

const initialState: authState = {
    name:'',
    email:'',
    pass:'',
    type:''
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },

        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        setPass: (state, action: PayloadAction<string>) => {
            state.pass = action.payload;
        },

        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        }
    }
});

export const signupActionSlice = async (name: string, email: string, pass: string, type: string) => {
    if (!name || !email || !pass || !type) {
        Swal.fire({
            title:'Missing Fields',
            text:'Please fill in name, email, password, and user type',
            icon:'warning',
            timer:1800,
            showConfirmButton:false
        });
        return;
    }

    const hashPass = await bcrypt.hash(pass, 10);

    const {error} = await supabase.from('users').insert({user_name: name, user_email: email, user_pass: hashPass, user_type: type});

    if (!error) {
        Swal.fire({
            title:'Account Registered',
            text:'Your account has been registered successfully',
            icon:'success',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/';
            }
        })
    }

    else {
        console.error('Signup failed:', error);
        Swal.fire({
            title:'Error Signing Up',
            text: error.message,
            icon:'error',
            timer:2500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/';
            }
        })
    }
}

export const loginActionSlice = async (email: string, pass: string) => {
    const {data, error} = await supabase.from('users').select('*').eq('user_email', email);

    if (error || data.length === 0) {
        Swal.fire({
            title:'Email Not Registered',
            text:'Your email is not registered please try again',
            icon:'error',
            timer:1500,
            showConfirmButton:false,
            willClose: () => {
                window.location.href='/';
            }
        })
    }


    else {
        const isMatch = await bcrypt.compare(pass, data[0].user_pass);

        if (isMatch) {
            if (data[0].user_type === "user") {
                localStorage.setItem('user_id', data[0].user_id);
                localStorage.setItem('user_name', data[0].user_name);
                localStorage.setItem('user_email', data[0].user_email);
                localStorage.setItem('user_pass', data[0].user_pass);
                localStorage.setItem('user_type', data[0].user_type);

                window.location.href='/Home';
            } else if (data[0].user_type === "admin") {
                localStorage.setItem('user_id', data[0].user_id);
                localStorage.setItem('user_name', data[0].user_name);
                localStorage.setItem('user_email', data[0].user_email);
                localStorage.setItem('user_pass', data[0].user_pass);
                localStorage.setItem('user_type', data[0].user_type);

                window.location.href='/Home';
            }
        }

        else {
            Swal.fire({
                title:'Incorrect Password',
                text:'Your password is incorrect please try again',
                icon:'error',
                timer:1500,
                showConfirmButton:false,
                willClose: () => {
                    window.location.href='/';
                }
            })  
        }
    }
}

export const {setName, setEmail, setPass, setType} = authSlice.actions;

export default authSlice.reducer;
