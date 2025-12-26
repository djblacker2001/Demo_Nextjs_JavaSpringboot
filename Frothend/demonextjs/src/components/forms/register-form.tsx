'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Alert, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Kết nối với backend API
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
      // });

      // Giả lập đăng ký
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Register successful:', { name: values.name, email: values.email });
      router.push('/login');
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card 
      style={{ width: '100%', maxWidth: 450 }}
      bordered={false}
      className="shadow-lg"
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 8 }}>Đăng ký</Title>
        <Text type="secondary">Tạo tài khoản mới để bắt đầu</Text>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError('')}
          style={{ marginBottom: 24 }}
        />
      )}

      <Form
        form={form}
        name="register"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="name"
          label="Họ tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input 
            prefix={<UserOutlined />}
            placeholder="Nguyễn Văn A"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />}
            placeholder="ten@email.com"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={isLoading}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>hoặc</Divider>

      <div style={{ textAlign: 'center' }}>
        <Text type="secondary">Đã có tài khoản? </Text>
        <Link href="/login" style={{ color: '#1890ff', fontWeight: 500 }}>
          Đăng nhập
        </Link>
      </div>
    </Card>
  );
}
