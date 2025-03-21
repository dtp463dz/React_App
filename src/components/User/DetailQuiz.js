import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';

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
    }


    return (
        <div>
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;