import React from 'react'
import { withFormik } from 'formik'
import { Form, Input } from 'formik-antd'
import {Button, Typography, Form as AntdForm} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

import * as Yup from 'yup'
import Center from '../Center'

const {Text} = Typography;
const FormItem = AntdForm.Item;

class RegisterForm extends React.Component {

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
        }
    }
    
    render() {
        const {values, errors, touched, isSubmitting} = this.props;
        return (
            <Center>
                <Form className='container'>
                    <FormItem>
                        <Input type='text' name='name' prefix={<UserOutlined />} values={values.name} placeholder='Username'></Input >
                        <Text  type='danger'>{ touched.name && errors.name && errors.name }</Text>
                    </FormItem>
                    
                    <FormItem>    
                        <Input type='email' name='email' prefix={<UserOutlined />} values={values.email} placeholder='Email'></Input >
                        <Text  type='danger'>{ touched.email && errors.email && errors.email }</Text>
                    </FormItem>
                    
                    <FormItem>    
                        <Input  type='password' name='password' prefix={<LockOutlined />} values={values.password} placeholder='Password'></Input >
                        <Text  type='danger'>{ touched.password && errors.password && errors.password }</Text>
                    </FormItem>

                    <FormItem>    
                        <Input  type='password' name='password2' prefix={<LockOutlined />} values={values.password2} placeholder='Confirm Password'></Input >
                        <Text  type='danger'>{ touched.password2 && errors.password2 && errors.password2 }</Text>
                    </FormItem>
                    
                    <FormItem>
                        <Button type='primary' htmlType='submit' disabled={isSubmitting} block> Register </Button>
                        <Link to='/auth/login'>Already have a account ? </Link>
                    </FormItem>
                </Form>
            </Center>
        )
    }
}


const FormikRegisterForm = withFormik({
    mapPropsToValues({name, email, password, password2}) {
        return {
            'name': name || '',
            'email': email || '',
            'password': password || '',
            'password2': password2 || '',
        }
    },
    handleSubmit(values, { setSubmitting, resetForm, setErrors, props}) {
        props.registerUser(values, props.history)
        resetForm();
        setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Username is required."),
        email: Yup.string().email().required("Email is required."),
        password: Yup.string().required("Password is required.").min(8, "Minimum 8 characters are required."),
        password2: Yup.string().oneOf([Yup.ref('password')], "Password must match").required("Confirmation is required")
    })
})(RegisterForm)


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(FormikRegisterForm))