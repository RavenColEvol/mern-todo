import React from 'react'
import { withFormik } from 'formik'
import { Form, Input } from 'formik-antd'
import {Button, Typography, Form as AntdForm} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import Center from '../Center'

const {Text} = Typography;
const FormItem = AntdForm.Item;

class LoginForm extends React.Component{

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render(){
        let {values, errors, touched, isSubmitting} = this.props;
        return(
        
        <Center>
            <Form className='container'>
                <FormItem
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input className='site-form-item-icon' prefix={<UserOutlined />}  type='email' name='email' values={values.email} placeholder='Email'></Input >
                    <Text  type='danger'>{ touched.email && errors.email && errors.email }</Text>
                </FormItem>

                <FormItem>
                    <Input className='site-form-item-icon' prefix={<LockOutlined />}   type='password' name='password' values={values.password} placeholder='Password'></Input >
                    <Text  type='danger'>{ touched.password && errors.password && errors.password }</Text>
                </FormItem>
                
                <FormItem>
                    <Button  type='primary' htmlType='submit' disabled={isSubmitting} block> Log in </Button>
                    Or <Link to="/auth/register">Register now!</Link>
                </FormItem>
            </Form>
        </Center>
                
        )
    }
} 

const FormikLoginForm = withFormik({
    mapPropsToValues({email, password}) {
        return {
            'email': email || '',
            'password': password || ''
        }
    },
    handleSubmit(values, { setSubmitting, resetForm, setErrors, props}) {
        props.loginUser(values);
        resetForm();
        setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Please enter your email"),
        password: Yup.string().required("Please enter your password").min(8)
    })
})(LoginForm)


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{loginUser})(FormikLoginForm)