'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Descriptions, Result, Spin, Tag, Typography } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

const roleColorMap: Record<string, string> = {
  ADMIN: 'red',
  USER: 'blue',
  VIEWER: 'green',
};

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`/api/users/${id}`);
      const json = await res.json();
      if (json.success) {
        setUser(json.data);
      } else {
        setError(json.error || 'Failed to load user');
      }
    } catch {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <Result status="error" title="Error" subTitle={error || 'User not found'} />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          User Details
        </Title>
        <div>
          <Button
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => router.push('/users')}
          >
            Back
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => router.push(`/users/${user.id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Role">
          <Tag color={roleColorMap[user.role]}>{user.role}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={user.status === 'ACTIVE' ? 'success' : 'default'}>{user.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(user.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {new Date(user.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
