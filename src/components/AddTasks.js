import { useState } from 'react'

const AddTasks = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setday] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add text')
            return
        }

        onAdd({ text, day, reminder })
        setText('')
        setday('')
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>

            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
            </div>

            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time'
                    value={day}
                    onChange={ (e) => setday(e.target.value)}/>
            </div>

            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                    checked={reminder}
                    onChange={ (e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' className='btn btn-block' value='Save Task'/>
            
        </form>
    )
}

export default AddTasks
