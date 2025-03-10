import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';

const ManageUser = () => {
    return (
        <div classNameName="manage-user-container">
            <div classNameName="title">
                Manager User
            </div>
            <div classNameName="user-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    table user
                </div>

                <ModalCreateUser />

            </div>
        </div>
    )
}

export default ManageUser;