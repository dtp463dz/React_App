import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';


const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    // state
    const [name, setName] = useState('');
    const [description, setDesciption] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);



    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // hien thi anh dung URL.createObjectURL sẽ chuyênr sang blob
            setImage(event.target.files[0])

        }
    }

    // xu ly api create quiz
    const handleSubmitQuiz = async () => {

        // validate
        if (!name || !description) {
            toast.error('Name/description is required');
            return;
        }
        // goi api
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        // console.log('check res: ', res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            // khi thành công, các input sẽ về rỗng
            setName('');
            setDesciption('');
            setImage(null);
        } else {
            toast.error(res.EM)
        }
    }


    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">

                            {/** html legend */}
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                                {/**floating table bootstrap */}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />

                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description...'
                                        value={description}
                                        onChange={(event) => setDesciption(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>

                                <div className='my-3'>
                                    <Select

                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={'Quizz type'}
                                    />
                                </div>

                                <div className="more-action form-group">
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        onClick={() => handleSubmitQuiz()}
                                        className='btn btn-warning'

                                    >Save
                                    </button>
                                </div>
                            </fieldset>

                        </div>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>

            <div className="list-detail">
                <TableQuiz />
            </div>
        </div>
    )
}

export default ManageQuiz;