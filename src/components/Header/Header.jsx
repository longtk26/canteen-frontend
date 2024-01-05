import CurrentDate from '../CurrentDate/CurrentDate'; 
import PropTypes from 'prop-types';

const Header = (props) => {
    const {heading} = props;
  return (
    <>
        <div className="flex justify-between">
            <div className="flex flex-col p-3">
                <div className="font-barlow text-4xl text-white">
                    {heading}
                </div>
                <div className="mt-2">
                    <CurrentDate />
                </div>
            </div>
        </div>
    </>
  );
};

Header.propTypes = {
    heading: PropTypes.string,
}

export default Header;
