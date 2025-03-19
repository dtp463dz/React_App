import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);   // false đóng
    const navigate = useNavigate();

    // validate Email , regular expression
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleRegister = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email!!!");
            return;
        }
        if (!password) {
            toast.error("Invalid password ");
            return;
        }
        // submit api
        let data = await postRegister(email, password, username)
        // console.log('check data resgister: ', data)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <div className="register-container">
            <div className='header'>
                <span>Already have an account ?</span>
                <button className='btn-login' onClick={() => { navigate('/login') }}>Login</button>
            </div>
            <div className='title col-4 mx-auto'>
                ALPT
            </div>
            <div className='welcome col-4 mx-auto'>
                Start your journey?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email} // truyền cho react quản lý
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Password (*)</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={password} // truyền cho react quản lý
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isShowPassword ?
                        <span className="icons-eye" onClick={() => setIsShowPassword(false)}>
                            <FaRegEye />
                        </span>
                        :
                        <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
                            <FaRegEyeSlash />
                        </span>
                    }


                </div>
                <div className='form-group'>
                    <label>User Name</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={username} // truyền cho react quản lý
                        onChange={(event) => setusername(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleRegister()}
                    >Create my free account</button>
                </div>

                <div className='text-center'>
                    <span className="back" onClick={() => { navigate('/') }}>
                        &#60;&#60; Go to Homepage
                    </span>
                </div>

            </div>
        </div>
    )
}
export default Register;