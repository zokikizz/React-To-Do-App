import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAddTask }) => {

    const location = useLocation()
    return (
        <header className='header'>
            <h1
                // style={headingStyle}
            >
                {title}
            </h1>
            { location.pathname === '/' &&
                <Button
                    text={showAddTask ? 'Close' : 'Add'}
                    bcgColor={showAddTask ? 'red' : 'green'}
                    onClick={onAdd} />
            }
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = { color: 'red', backgroundColor: 'black'}

export default Header
