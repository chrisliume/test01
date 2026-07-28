'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Typography, Result } from 'antd';
import UserForm from '@/components/users/UserForm';

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE';
}

export default function EditUserPage() {
  const params = useParams();
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
      <Title level={2} style={{ marginBottom: 24 }}>
        Edit User
      </Title>
      <UserForm
        mode="edit"
        userId={user.id}
        initialValues={{
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        }}
      />
    </div>
  );
}
