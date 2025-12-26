'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Alert, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Kết nối với backend API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });

      // Giả lập đăng nhập
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Login successful:', values);
      router.push('/dashboard');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
      console.error('Login error:', err);
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
        <Title level={2} style={{ marginBottom: 8 }}>Đăng nhập</Title>
        <Text type="secondary">Nhập thông tin đăng nhập của bạn để tiếp tục</Text>
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
        name="login"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />}
            placeholder="ten@email.com"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </Form.Item>

        <div style={{ marginBottom: 24, textAlign: 'right' }}>
          <Link href="/forgot-password" style={{ color: '#1890ff' }}>
            Quên mật khẩu?
          </Link>
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={isLoading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>hoặc</Divider>

      <div style={{ textAlign: 'center' }}>
        <Text type="secondary">Chưa có tài khoản? </Text>
        <Link href="/register" style={{ color: '#1890ff', fontWeight: 500 }}>
          Đăng ký ngay
        </Link>
      </div>
    </Card>
  );
}
