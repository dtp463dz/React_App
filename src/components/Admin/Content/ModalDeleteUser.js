import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false)
    }
    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);
        // console.log('>>>> component res', data)

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



    // console.log('check data delete', dataDelete)
    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static" // click ra ngoài modal k bị đóng lại
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete The User ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete this user. email =
                    <b>{dataDelete && dataDelete.email ? dataDelete.email : "not found email"}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteUser() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;