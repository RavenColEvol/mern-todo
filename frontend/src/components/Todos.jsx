import React, { Component } from 'react'
import { connect } from 'react-redux'

import { List, Typography, Button, Popover } from 'antd'
import { DeleteOutlined, EditOutlined, ProfileOutlined } from '@ant-design/icons'
import './style.css'

import TodoForm from './TodoForm'
import { getTodos, deleteTodo } from '../redux/actions/todos'


const { Text } = Typography;


class Todos extends Component {

    state = {
        isUpdate: false,
    }

    componentDidMount() {
        this.props.getTodos();
    }

    handleChange = () => {
        this.setState({
            isUpdate: !this.state.isUpdate,
        })
    }

    render() {
        return (
            <div className="container">
                <div className='mt-3'></div>
                <TodoForm isUpdate={this.state.isUpdate} />

                <List header={<Text strong><ProfileOutlined /> Things Todo</Text>} bordered dataSource={this.props.todos}
                    renderItem={todo => (
                        <List.Item
                            actions={[
                                <Button shape='circle' type='primary' onClick={this.handleChange}><EditOutlined /></Button>,
                                <Button shape='circle' onClick={() => this.props.deleteTodo(todo._id)}><DeleteOutlined /></Button>
                            ]}
                        >
                            <Popover title={todo.title} content={todo.description || 'No description'} placement='right' trigger='hover'>
                                <Typography.Text mark={todo.checked}>{todo.title}</Typography.Text>
                            </Popover>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { todos } = state;
    return todos;
}

export default connect(mapStateToProps, { getTodos, deleteTodo })(Todos);