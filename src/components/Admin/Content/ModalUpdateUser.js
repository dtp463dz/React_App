import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postUpdateUser } from '../../../services/apiService';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData } = props;

    const handleClose = () => {
        setShow(false) // props.setShow
        // khi tắt, tất cả sẽ về giá trị rỗng
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");  // về lại mặc định
        setImage("");
        setPreviewImage("");
        resetUpdateData();
    };

    // state hóa modal
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // chạy khi và chỉ khi data update thay đổi
    // hiển thị thông tin ban đầu trc khi update 
    useEffect(() => {
        // console.log('run useeffect', dataUpdate)
        // nếu ko rỗng
        if (!_.isEmpty(dataUpdate)) {
            // update state
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            // điểu kiện nếu data có ảnh
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`); // image được hiển thị dạng base64
            }
        }
    }, [props.dataUpdate]); // gọi tới useEffect khi data update

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

    // validate Email , regular expression

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email!!!");
            return;
        }

        let data = await postUpdateUser(dataUpdate.id, username, role, image); // lấy id của data update

        // console.log('>>>> check res', res.data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            // close
            handleClose();
            await props.fetchListUsers(); // khi modal đóng thì gọi lại API và cập nhật listUser 
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    // check data update
    // console.log('check data update', dataUpdate) // dataUpdate được truyền từ cha
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
                    <Modal.Title>Update A User</Modal.Title>
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

export default ModalUpdateUser;