import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import Center from './Center'

export default function NotFound() {
    return (
        <Center>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
            />
        </Center>
    )
}
