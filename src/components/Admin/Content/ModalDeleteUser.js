import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false)
    }
    const handleSubmitDeleteUser = () => {
        alert('me')
    }


    console.log('check data delete', dataDelete)
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