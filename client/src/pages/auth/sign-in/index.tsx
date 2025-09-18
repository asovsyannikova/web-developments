import { Button, Form, Input, message, Typography, type FormProps } from 'antd';
import { Link, useNavigate } from 'react-router';

import Cookies from 'js-cookie';

import { signIn } from '@/api';

import styles from './index.module.scss';

import { errors } from './errors';

type FieldType = Partial<{
  email: string;
  password: string;
}>;

export const SignIn = () => {
  const navigate = useNavigate();

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!values.email || !values.password) {
      return;
    }

    const response = await signIn({
      email: values.email,
      password: values.password,
    });

    if (response.error) {
      message.error(response.error.message);
      return;
    }

    if (response.data?.token) {
      Cookies.set('token', response.data?.token || '', {
        secure: true,
        sameSite: 'strict',
        expires: 7,
      });

      navigate('/events');
    } else {
      message.error('Кажется что-то пошло не так...');
      return;
    }
  };

  return (
    <Form
      className={styles.form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Typography.Title level={2}>Вход</Typography.Title>

      <Form.Item<FieldType>
        label="Почта"
        name="email"
        rules={[
          errors,
          { type: 'email', message: 'Введите корректный email!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType> label="Пароль" name="password" rules={[errors]}>
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>

      <div className={styles.register}>
        <Typography.Text>Нет аккаунта?</Typography.Text>
        <Link to="/auth/up">
          <Button>Зарегистрироваться</Button>
        </Link>
      </div>
    </Form>
  );
};
