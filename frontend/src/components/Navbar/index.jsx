import React from 'react'
import {connect} from 'react-redux'
import {logoutUser} from '../../redux/actions/authAction'
import { Menu , Layout, Typography} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'

const { Header } = Layout;
const { Text } = Typography;

function index({logoutUser, isAuthenticated}) {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            
            <Text strong style={{color:'white'}}><span role='img' aria-label='smiling face'>😆</span> FudduList</Text>
            
            <Menu
                mode='horizontal'
                theme='dark'
                style={{ lineHeight: '64px' , float:'right'}}
            >
                { isAuthenticated && <Menu.Item key="1" onClick={logoutUser}><LogoutOutlined />Logout</Menu.Item> }
            </Menu>
        </Header>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{logoutUser})(index)
