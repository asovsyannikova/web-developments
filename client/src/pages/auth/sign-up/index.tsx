import { Button, Form, Input, message, Typography, type FormProps } from 'antd';
import { Link, useNavigate } from 'react-router';

import styles from './index.module.scss';

import { errors } from './errors';
import { signUp } from '@/api';

type FieldType = Partial<{
  username: string;
  email: string;
  password: string;
}>;

export const SignUp = () => {
  const navigate = useNavigate();

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!values.username || !values.email || !values.password) {
      return;
    }

    const response = await signUp({
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (response?.error) {
      message.error(response.error.message);
      return;
    }

    message.success('Регистрация прошла успешно');
    navigate('/auth/in');
  };

  return (
    <Form
      className={styles.form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Typography.Title level={2}>Регистрация</Typography.Title>

      <Form.Item<FieldType> label="Имя" name="username" rules={[errors]}>
        <Input />
      </Form.Item>

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
          Зарегистрироваться
        </Button>
      </Form.Item>

      <div className={styles.register}>
        <Typography.Text>Есть аккаунт?</Typography.Text>
        <Link to="/auth/in">
          <Button>Войти</Button>
        </Link>
      </div>
    </Form>
  );
};
