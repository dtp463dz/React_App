import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';



const DetailQuiz = (props) => {
    const params = useParams(); // lấy tham số trên đường link URL
    const location = useLocation();
    // console.log('check params: ', params); // hiển thị id trên đường link url
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0); // câu hỏi thứ bao nhiêu

    const [isShowModalResult, setIsShowModalResult] = useState(false); // modal result
    const [dataModalResult, setDataModalResult] = useState({}); // obj rong
    useEffect(() => {
        fetchQuestions();
    }, [quizId]) // mỗi 1 lần tham số quizId thay đổi thì hàm useEffect được chạy

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    // đẩy vào array
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false; // thêm trường mới isSelected, mặc định false là k chọn
                        answers.push(item.answers)
                        //    console.log('item answers: ', item.answers)
                    })   // forEach lặp từng đối tượng 1
                    //    console.log('value: ', value, 'key: ', key)
                    return { questionId: key, answers: answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data) // cập nhật data từ cha
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleFinish = async () => {


        console.log('check data befor submit: ', dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answer = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId
                let userAnswerId = [];

                // todo : userAnswerId
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answer.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answer
            console.log("final payload: ", payload)
            // submit api
            let res = await postSubmitQuiz(payload)
            console.log('check response: ', res)
            if (res && res.EC === 0) {
                setDataModalResult({

                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                })
                setIsShowModalResult(true); // mở modal
            } else {
                alert('something wrongs...')
            }
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);  // cloneDeep sao chép tất cả obj, react hook doesn't merge state 
        let question = dataQuizClone.find(item => +item.questionId === +questionId)// + convert sang number
        if (question && question.answers) {
            //    console.log('question: ', question)

            // logic checkbox khi được chọn và bỏ chọn
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })

            question.answers = b;
            //    console.log(b)
        }

        // 
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    return (
        <div className='detail-quiz-container'>
            <div className="left-content">
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr></hr>
                <div className='q-body'>
                    <img />
                </div>
                <div className='q-content'>
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[index]
                                : []}
                    />
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary'
                        onClick={() => handlePrev()}
                    >Prev</button>
                    <button className='btn btn-primary'
                        onClick={() => handleNext()}
                    >Next</button>

                    <button className='btn btn-warning'
                        onClick={() => handleFinish()}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;