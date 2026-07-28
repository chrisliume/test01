'use client';

import { Typography } from 'antd';
import UserForm from '@/components/users/UserForm';

const { Title } = Typography;

export default function CreateUserPage() {
  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Create User
      </Title>
      <UserForm mode="create" />
    </div>
  );
}
