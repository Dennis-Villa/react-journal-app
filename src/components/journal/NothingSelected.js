
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

export const NothingSelected = () => {
    return (
        <div className='nothing__main-content animate__animated animate__fadeIn animate__faster'>
            <p>
                Select Something
                <br/>
                or create an entry
            </p>

            <FontAwesomeIcon icon={regular("star")} size='4x' className='mt-5' />
        </div>
    );
}
