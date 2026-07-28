import { Typography } from 'antd';
import UserTable from '@/components/users/UserTable';

const { Title } = Typography;

export const metadata = {
  title: 'Users - Test01',
  description: 'User management list',
};

export default function UsersPage() {
  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Users
      </Title>
      <UserTable />
    </div>
  );
}
