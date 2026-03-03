import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../store/store';
import {setName, setEmail, setPass, setType, signupActionSlice} from '../store/slice/authSlice';
import '../assets/css/Style.css';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useSelector((state: RootState) => state.auth.name);
    const email = useSelector((state: RootState) => state.auth.email);
    const pass = useSelector((state: RootState) => state.auth.pass);
    const type = useSelector((state: RootState) => state.auth.type);

    const signupAction = async (e: React.FormEvent) => {
        e.preventDefault();
        
        await signupActionSlice(name, email, pass, type);
    }
    return(
        <>
        {/* Main Content */}
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h1 style={{textAlign:'center', fontSize: 25, fontWeight:'bold'}}>Sign Up</h1>
                <br />

                <form onSubmit={signupAction}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" placeholder='Enter a name' onChange={(e) => dispatch(setName(e.target.value))} className='form-control'/>
                    </div><br />
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" placeholder='Enter a email' onChange={(e) => dispatch(setEmail(e.target.value))} className='form-control'/>
                    </div><br />
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" placeholder='Enter a password' onChange={(e) => dispatch(setPass(e.target.value))} className='form-control'/>
                    </div><br />
                    <div className="mb-3">
                        <label className="form-label">User Type</label>
                        <select onChange={(e) => dispatch(setType(e.target.value))} className='form-control' defaultValue="">
                            <option value="" disabled>Select User Type</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div><br />
                    <button className='btn btn-primary w-100'>Sign Up</button>
                </form>
                <br />

                <button className='btn btn-light w-100' onClick={() => navigate(`/`)}>Login</button>
            </div>
        </div>
        </>
    );
}

export default Signup;
