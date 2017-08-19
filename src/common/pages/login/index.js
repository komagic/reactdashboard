import React,{Component} from 'react';
import { Form, Input, Button, notification, Icon } from 'antd';
import createHistory from 'history/createHashHistory';

import './index.less'

const FormItem = Form.Item;
const history = createHistory();

class LoginPage extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let n = this.props.form.getFieldsValue().username;
        let p = this.props.form.getFieldsValue().password;
        if (n === p && p === '123456') {
            // 表单的路由处理
            history.push('/index');
        } else {
            this.openNotification('info');
        }
    }

    // 提示用户名和密码
    openNotification = (type) => {
        return notification[type]({
                 message: '用户名&密码',
                 description: '都是：123456',
                 duration: 3,
                 button:50,
                 placement:"topLeft",
                 icon: <Icon type="info-circle" style={{ color: '#108ee9' }} />,
               })
    }

    componentDidMount() {
        this.openNotification('info');
        console.log(this.props);
    }



    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="loginpagewrap">
                <div className="box">
                    <p>个人后台管理系统(推荐chrome)</p>
                    <div className="loginWrap">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit" className="loginBtn">Login</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

let Login = Form.create()(LoginPage);
export default Login;