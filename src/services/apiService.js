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
    return axios.post('api/v1/participant', data);  // method post: create new

}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');

}

const postUpdateUser = (id, username, role, image) => {
    // submit data
    const data = new FormData(); // formData cua axios
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    //    return axios.post('http://localhost:8081/api/v1/participant', data);
    return axios.put('api/v1/participant', data);   // method PUT: update

}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } }); // truyền obj, axios bắt truyền biến data
}
export { postCreateNewUser, getAllUsers, postUpdateUser, deleteUser } 