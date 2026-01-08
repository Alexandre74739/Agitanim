import { useNavigate } from 'react-router-dom';
import './Buttons.scss';

function Buttons() {
    const navigate = useNavigate();

    return (
        <div className='btns'>
            <button
                className='primary-btn'
                onClick={() => navigate('/encyclopedie')}
            >
                Projets & Jeux
            </button>

            <button
                className='secondary-btn'
                onClick={() => navigate('/jeux')}
            >
                Jouer aux mini-jeux
            </button>
        </div>
    );
}

export default Buttons;