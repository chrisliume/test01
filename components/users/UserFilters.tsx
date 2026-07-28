'use client';

import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useRef } from 'react';

interface UserFiltersProps {
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string | undefined) => void;
  onStatusChange: (value: string | undefined) => void;
  role: string | undefined;
  status: string | undefined;
}

export default function UserFilters({
  onSearchChange,
  onRoleChange,
  onStatusChange,
  role,
  status,
}: UserFiltersProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        onSearchChange(value);
      }, 300);
    },
    [onSearchChange],
  );

  return (
    <Space wrap style={{ marginBottom: 16, width: '100%' }}>
      <Input
        placeholder="Search by name or email"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
        allowClear
        style={{ width: 250 }}
      />
      <Select
        placeholder="Filter by role"
        allowClear
        value={role}
        onChange={onRoleChange}
        style={{ width: 150 }}
        options={[
          { label: 'Admin', value: 'ADMIN' },
          { label: 'User', value: 'USER' },
          { label: 'Viewer', value: 'VIEWER' },
        ]}
      />
      <Select
        placeholder="Filter by status"
        allowClear
        value={status}
        onChange={onStatusChange}
        style={{ width: 150 }}
        options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
        ]}
      />
    </Space>
  );
}
