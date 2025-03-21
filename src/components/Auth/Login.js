import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

import { FaSpinner } from "react-icons/fa"; // icon load spinner

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    //validate email
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email !!!");
            return;
        }
        if (!password) {
            toast.error("Invalid password !!!");
            return;
        }
        setIsLoading(true); // trước khi gọi api set bằng true
        // submit api
        let data = await postLogin(email, password)
        //    console.log('check data login', data)
        if (data && data.EC === 0) {
            // dispatch + action
            dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false); // khi load thành công chuyển về false
            navigate('/')
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false); // on button login, k call api

        }
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have account yet ?</span>
                <button className='btn-signup' onClick={() => { navigate('/register') }}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                ALPT
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email} // truyền cho react quản lý
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={"password"}
                        className="form-control"
                        value={password} // truyền cho react quản lý
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                        disabled={isLoading}  // mặc định set bằng false
                    >
                        {isLoading === true && <FaSpinner className="loader-icon" />}
                        <span>Login</span>

                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}>
                        &#60;&#60; Go to Homepage
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;