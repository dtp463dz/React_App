import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([]);
    // modal update
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});



    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        setDataUpdate()
        setDataDelete()
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
        //    console.log('res: ', res)
    }

    const handleClickBtnUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true);   // open modal
        setDataUpdate(quiz);
        //    console.log('check btn quiz update: ', quiz)
    }

    const handleClickBtnDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true); // open modal
        setDataDelete(quiz);
        console.log('check btn quiz delete: ', quiz)
    }

    return (
        <>
            <div>
                List Quizzes:
            </div>
            <table className="table table-hover table-bordered mt-2 my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td scope="row">{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button className="btn btn-warning"
                                        onClick={() => handleClickBtnUpdateQuiz(item)}
                                    >Edit</button>
                                    <button className="btn btn-danger"
                                        onClick={() => handleClickBtnDeleteQuiz(item)}
                                    >Delete</button>

                                </td>

                            </tr>
                        )
                    })}



                </tbody>
                <ModalUpdateQuiz
                    show={showModalUpdateQuiz}
                    setShow={setShowModalUpdateQuiz}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchQuiz={fetchQuiz}

                />
                <ModalDeleteQuiz
                    show={showModalDeleteQuiz}
                    setShow={setShowModalDeleteQuiz}
                    dataDelete={dataDelete}
                    setDataDelete={setDataDelete}
                    fetchQuiz={fetchQuiz}
                />
            </table>
        </>
    )
}
export default TableQuiz;