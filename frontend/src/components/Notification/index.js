import React from 'react'
import {connect} from 'react-redux'
import {message as notification} from 'antd'

class Notification extends React.Component {

    state = {
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps !== prevState) {
            switch(nextProps.notification.type) {
                case 'success':
                    notification.success(nextProps.notification.message)
                    break;
                case 'error':
                    notification.error(nextProps.notification.message)
                    break;
                default:
            }
        }
        return null
    }

    render(){
        return(
            <></>
        )
    }
}

const mapStateToProps = state => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps)(Notification)