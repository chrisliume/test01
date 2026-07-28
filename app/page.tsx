'use client';

import { Button, Typography, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <main style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title>
          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 12 }} />
          Welcome to Test01
        </Title>
        <Paragraph>Next.js 14 with App Router, Prisma ORM, and Ant Design 5.x</Paragraph>
        <Button type="primary" size="large">
          Get Started
        </Button>
      </Space>
    </main>
  );
}
