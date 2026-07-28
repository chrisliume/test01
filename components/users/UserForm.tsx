'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Select, Space, message } from 'antd';

interface UserFormValues {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE';
}

interface UserFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<UserFormValues>;
  userId?: string;
}

export default function UserForm({ mode, initialValues, userId }: UserFormProps) {
  const router = useRouter();
  const [form] = Form.useForm<UserFormValues>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (values: UserFormValues) => {
      setSubmitting(true);
      try {
        const url = mode === 'create' ? '/api/users' : `/api/users/${userId}`;
        const method = mode === 'create' ? 'POST' : 'PUT';

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const json = await res.json();

        if (json.success) {
          message.success(
            mode === 'create' ? 'User created successfully' : 'User updated successfully',
          );
          router.push('/users');
        } else {
          message.error(json.error || 'An error occurred');
        }
      } catch {
        message.error('An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
    [mode, userId, router],
  );

  const handleCancel = useCallback(() => {
    router.push('/users');
  }, [router]);

  return (
    <Form<UserFormValues>
      form={form}
      layout="vertical"
      initialValues={{
        role: 'USER',
        status: 'ACTIVE',
        ...initialValues,
      }}
      onFinish={handleSubmit}
      style={{ maxWidth: 480 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Name is required' },
          { min: 2, message: 'Name must be at least 2 characters' },
          { max: 50, message: 'Name must be 50 characters or less' },
        ]}
      >
        <Input placeholder="Enter user name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>

      <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Role is required' }]}>
        <Select
          options={[
            { label: 'Admin', value: 'ADMIN' },
            { label: 'User', value: 'USER' },
            { label: 'Viewer', value: 'VIEWER' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Status is required' }]}
      >
        <Select
          options={[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' },
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
            {mode === 'create' ? 'Create User' : 'Update User'}
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
