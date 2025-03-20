import videoHomePage from '../../assets/images/video-homepage.mp4';
import { useSelector } from 'react-redux'; // giúp lấy state của redux
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    // const account = useSelector(state => state.user.account)

    // console.log('account: ', account, ' isAuthenticated: ', isAuthenticated)
    const navigate = useNavigate();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop >
                <source
                    src={videoHomePage}
                    type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>Get to know your customers with forms worth filling out</div>
                <div className='title-2'>Collect all the data you need to understand customers with
                    forms designed to be refreshingly different.
                </div>
                <div className='title-3'>
                    {/* check ng dung dang nhap hay chua */}
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')} className='btn-title3' >Get started-it's free</button>

                        :
                        <button onClick={() => navigate('/users')} className='btn-title3'>Doing Quiz Now</button>
                    }

                </div>

            </div>

        </div>
    )
}

export default HomePage;