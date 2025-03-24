import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko
import './DetailQuiz.scss';
const DetailQuiz = (props) => {
    const params = useParams(); // lấy tham số trên đường link URL
    const location = useLocation();

    console.log('check location: ', location)
    // console.log('check params: ', params); // hiển thị id trên đường link url
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId]) // mỗi 1 lần tham số quizId thay đổi thì hàm useEffect được chạy

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        //    console.log('check question: ', res)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers)
                        //    console.log('item answers: ', item.answers)
                    })   // forEach lặp từng đối tượng 1
                    //    console.log('value: ', value, 'key: ', key)
                    return { questionId: key, answers: answers, questionDescription, image }
                })
                .value()
            //    console.log(data)
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
                    <div className='question'>Question 1: How are you doing</div>
                    <div className='answer'>
                        <div className='a-child'>A. nnngoc anh</div>
                        <div className='a-child'>B. nnngoc anh</div>
                        <div className='a-child'>C. nnngoc anh</div>
                    </div>

                </div>
                <div className='footer'>
                    <button className='btn btn-secondary'>Prev</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;