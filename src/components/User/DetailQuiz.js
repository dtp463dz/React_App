import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko

const DetailQuiz = (props) => {
    const params = useParams(); // lấy tham số trên đường link URL
    // console.log('check params: ', params); // hiển thị id trên đường link url
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId]) // mỗi 1 lần tham số quizId thay đổi thì hàm useEffect được chạy

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        console.log('check question: ', res)
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
                        console.log('item answers: ', item.answers)
                    })   // forEach lặp từng đối tượng 1
                    console.log('value: ', value, 'key: ', key)
                    return { questionId: key, answers: answers, questionDescription, image }
                })
                .value()
            console.log(data)
        }
    }


    return (
        <div>
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;