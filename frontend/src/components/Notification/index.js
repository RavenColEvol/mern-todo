import React from 'react'
import {connect} from 'react-redux'
import {message as notification} from 'antd'

class Notification extends React.Component {

    state = {}

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps !== prevState) {
            switch(nextProps.notification.type) {
                case 'success':
                    notification.loading('Loading', .4)
                    .then(() => notification.success(nextProps.notification.message))
                    break;
                case 'error':
                    notification.loading('Loading', .4)
                    .then(() => notification.error(nextProps.notification.message))
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
        notification: state.notification,
    }
}

export default connect(mapStateToProps)(Notification)