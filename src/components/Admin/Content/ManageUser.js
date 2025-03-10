import ModalCreateUser from "./ModalCreateUser";


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
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}

export default ManageUser;