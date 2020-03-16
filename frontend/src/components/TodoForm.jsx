import React from 'react'
import { withFormik } from 'formik'
import { Form, Input } from 'formik-antd'
import { Button, Typography } from 'antd'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions/todos'
import './style.css'

const { Text } = Typography

const TodoForm = ({ values, errors, touched, isSubmitting }) => (
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

        <Button type='primary' htmlType='submit' disabled={isSubmitting} block>ADD TODO</Button>

    </Form>
)

const FormikTodoForm = withFormik({
    handleSubmit(values, { resetForm, setSubmitting, props }) {
        props.addTodo({'owner_id':props.id,...values});
        resetForm();
        setSubmitting(false);
    },
    mapPropsToValues({ title, description }) {
        return {
            'title': title || '',
            'description': description || '',
        }
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required("Please enter a title.").max(15, "Title should be small."),
        description: Yup.string()
    })
})(TodoForm)

const mapStateToProps = state => {
    return {
        id: state.auth.user.id
    }
}

export default connect(mapStateToProps, { addTodo })(FormikTodoForm)