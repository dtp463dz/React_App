
import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    return (
        <div className="question-container">
            <div className="title">
                Manage Questions
            </div>

            <div className="add-new-questions">
                <div className='col-6 form-group'>
                    <label>Select quiz: </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add Questions
                </div>

                <div>
                    <div className='question-content'>
                        <div className="form-floating description">
                            <input type="type" className="form-control" placeholder="name@example.com" />
                            <label >Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-up'>Upload image</label>
                            <input type='file' hidden />
                            <span>0 file is upload</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <BsFillPatchPlusFill className='icon-add' />
                            </span>
                            <span>
                                <BsFillPatchMinusFill className='icon-remove' />
                            </span>
                        </div>


                    </div>

                    <div className='answers-content'>
                        <input className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name">
                            <input type="type" className="form-control" placeholder="name@example.com" />
                            <label >Answer 1: </label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <AiFillPlusSquare className='icon-add' />
                            </span>
                            <span>
                                <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Questions;