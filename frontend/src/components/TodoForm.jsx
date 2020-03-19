import React from 'react'
import { withFormik } from 'formik'
import { Form, Input } from 'formik-antd'
import { Button, Typography , Row, Col} from 'antd'
import {CloseCircleOutlined, PlusCircleOutlined} from '@ant-design/icons'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { addTodo, updateTodo, isAdding } from '../redux/actions/todos'
import './style.css'

const { Text } = Typography

class TodoForm extends React.Component{
    render(){
        const { values, errors, touched, isSubmitting, isUpdating, isAdding, resetForm } = this.props;
        return(
            <Form className="my-2">
                {/* Title Field */}
                <div className='mb-1'>
                    <Input type='text' name='title' placeholder='Title' value={values.title}></Input>
                    <Text type='danger'>{touched.title && errors.title ? errors.title : ''}</Text>
                </div>
                {/* Description Field */}
                <div className='mb-1'>
                    <Input type='text' name='description' placeholder='Description' value={values.description}></Input>
                    <Text className='mb-1' type='danger'>{touched.description && errors.description ? errors.description : ''}</Text>
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Button type='secondary' onClick={()=>{isAdding();resetForm()}} block><CloseCircleOutlined />{ isUpdating ? 'CANCEL' : 'CLEAR'}</Button>
                    </Col>
                    <Col span={12}>
                        <Button type='primary' htmlType='submit' disabled={isSubmitting} block><PlusCircleOutlined />{ isUpdating ? 'UPDATE TODO' : 'ADD TODO'}</Button>
                    </Col>
                </Row>

            </Form>
        )
    }
}

const FormikTodoForm = withFormik({
    handleSubmit(values, { resetForm, setSubmitting, props }) {
        if(props.isUpdating){
            props.updateTodo({...props.todo,...values})
        }
        else
            props.addTodo({'owner_id':props.id,...values});
        resetForm();
        setSubmitting(false);
    },
    mapPropsToValues({ title, description , todo}) {
        console.log(todo.title, todo.description)
        return {
            'title': todo.title || title || '',
            'description': todo.description || description || '',
        }
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required("Please enter a title.").max(20, "Title should be small."),
        description: Yup.string()
    }),
    enableReinitialize: true
})(TodoForm)

const mapStateToProps = state => {
    return {
        id: state.auth.user.id,
        isUpdating: state.todos.isUpdating,
        todo: state.todos.todo
    }
}

export default connect(mapStateToProps, { addTodo, updateTodo, isAdding })(FormikTodoForm)