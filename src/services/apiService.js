import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    // submit data
    const data = new FormData(); // formData cua axios
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    //    return axios.post('http://localhost:8081/api/v1/participant', data);
    return axios.post('api/v1/participant', data);

}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');

}
export { postCreateNewUser, getAllUsers } 