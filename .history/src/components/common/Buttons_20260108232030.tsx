import { useNavigate } from 'react-router-dom';
import './Buttons.scss';

function Buttons() {
    const navigate = useNavigate();

    return (
        <div className='btns'>
            <button
                className='primary-btn'
                onClick={() => navigate('/jeux')}
            >
                Projets & Jeux
            </button>

            <button
                className='secondary-btn'
                onClick={() => navigate('/inxlusion')}
            >
                Handicap & Inclusion
            </button>
        </div>
    );
}

export default Buttons;