import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import { putUpdateQuizForAdmin } from "../../../../services/apiService";
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko
import { toast } from 'react-toastify';



const ModalUpdateQuiz = (props) => {

    const { show, setShow, dataUpdate, setDataUpdate } = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        setDataUpdate({});
    }

    // chạy khi và chỉ khi data update thay đổi
    // hiển thị thông tin ban đầu trc khi update 
    useEffect(() => {
        // console.log('run useefect: ', dataUpdate)

        // check nếu ko rỗng thì done
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setDescription(dataUpdate.description);
            setName(dataUpdate.name);
            setType(dataUpdate.difficulty);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [props.dataUpdate])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // hien thi anh dung URL.createObjectURL sẽ chuyênr sang blob
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])

        } else {
            {
                setPreviewImage("")
            }
        }

        // console.log('upload file', event.target.files[0])
    }

    const handleSubmitUpdateQuiz = async () => {
        // validate
        if (!name) {
            toast.error('Invalid name')
            return;
        }
        if (!description) {
            toast.error('Invalid description')
            return;
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await props.fetchQuiz();
            handleClose();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

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
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)} // viet dc text trong input
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} // viet dc text trong input
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
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
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >



        </>
    )
}

export default ModalUpdateQuiz;