import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko

const ModalViewUser = (props) => {

    const { show, setShow, dataView } = props;

    const handleClose = () => {
        setShow(false) // props.setShow
        // khi tắt, tất cả sẽ về giá trị rỗng
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("");  // về lại mặc định
        setImage("");
        setPreviewImage("");
    }

    // state hóa modal
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");


    // hiển thị thông tin ban đầu trc khi update 
    useEffect(() => {
        console.log('check data view: ', dataView)
        // neu k rong
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email)
            setUsername(dataView.username)
            setRole(dataView.role)
            setImage("")
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`); // image được hiển thị dạng base64
            }
        }
    }, [dataView]) // goi tới useEffect khi data view
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>View A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled // giữ nguyên nội dung input
                                onChange={(event) => setEmail(event.target.value)} // viet dc text trong input
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled // giữ nguyên nội dung input
                                onChange={(event) => setPassword(event.target.value)} // viet dc text trong input
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(event) => setUsername(event.target.value)} // viet dc text trong input
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                                disabled
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            {/**customize upload file button */}
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                {/* <FcPlus />Upload File Image */}
                            </label>
                            <input
                                type="file"
                                id='labelUpload' hidden
                                disabled
                            // onChange={(event) => handleUploadImage(event)}
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

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalViewUser;