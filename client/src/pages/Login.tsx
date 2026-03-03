import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../store/store';
import {setEmail, setPass, loginActionSlice} from '../store/slice/authSlice';
import '../assets/css/Style.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useSelector((state: RootState) => state.auth.email);
    const pass = useSelector((state: RootState) => state.auth.pass);

    const loginAction = async (e: React.FormEvent) => {
        e.preventDefault();

        loginActionSlice(email, pass);
    }
    return(
        <>
        {/* Main Content */}
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h1 style={{textAlign:'center', fontSize: 25, fontWeight:'bold'}}>Login</h1>
                <br />

                <form onSubmit={loginAction}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" placeholder='Enter a email' onChange={(e) => dispatch(setEmail(e.target.value))} className='form-control'/>
                    </div><br />
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" placeholder='Enter a password' onChange={(e) => dispatch(setPass(e.target.value))} className='form-control'/>
                    </div><br />
                    <button className='btn btn-primary w-100'>Login</button>
                </form>
                <br />

                <button className='btn btn-light w-100' onClick={() => navigate(`/Signup`)}>Sign Up</button>
            </div>
        </div>
        </>
    );
}

export default Login;