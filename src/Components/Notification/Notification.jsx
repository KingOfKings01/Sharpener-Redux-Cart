import { useSelector } from 'react-redux';
import classes from './notify.module.css'

export default function Notification() {
    const { notification } = useSelector(state => state.cart)

    if (!notification) return null

    const statusClass = () => { 
        switch(notification.status){
            case 'Success':
                return classes.success
            case 'Error':
                return classes.error
            case 'Sending':
                return classes.sending
            default:
                return ''
        }
    }

    return (<>
        <div className={`${classes.notify} ${statusClass()}`}>
            <b>{notification.status}</b>
            <p>{notification.message}</p>
        </div>
        <div className={classes.space}></div>
    </>
    )
}
