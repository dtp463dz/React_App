import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import axios from 'axios';
const ModalCreateUser = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false) // props.setShow
        // khi tắt, tất cả sẽ về giá trị rỗng
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");  // về lại mặc định
        setImage("");
        setPreviewImage("");
    };

    // state hóa modal
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // hien thi anh dung URL.createObjectURL sẽ chuyênr sang blob
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])

        } else {
            {
                // setPreviewImage("")
            }
        }

        // console.log('upload file', event.target.files[0])
    }

    const handleSubmitCreateUser = async () => {
        // validate

        // call API
        // let data = {
        //     email: email,
        //     password: password,
        //     username: username,
        //     role: role,
        //     userImage: image,

        // }
        // console.log(data)


        // formData cua axios
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);

        let res = await axios.post('http://localhost:8081/api/v1/participant', data)
        console.log('>>>> check res', res)
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} // viet dc text trong input
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} // viet dc text trong input
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)} // viet dc text trong input
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            {/**customize upload file button */}
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />Upload File Image
                            </label>
                            <input
                                type="file"
                                id='labelUpload' hidden
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview' >
                            {previewImage ?
                                // <img src="https://byvn.net/38E0" />
                                <img src={previewImage} />

                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;