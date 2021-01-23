import PropTypes from 'prop-types'


const Button = ({ bcgColor, textColor, text, onClick }) => {
    
    return <button className='btn' onClick={onClick}
        style={{ backgroundColor: bcgColor, color: textColor }}>
            { text }
        </button>
}

Button.propTypes = {
    text: PropTypes.string,
    bcgColor: PropTypes.string,
    textColor: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default Button
