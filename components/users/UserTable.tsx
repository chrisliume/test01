'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Button, Space, Modal, Tag, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { SorterResult } from 'antd/es/table/interface';
import UserFilters from './UserFilters';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

interface UsersResponse {
  success: boolean;
  data: {
    users: User[];
    total: number;
    page: number;
    pageSize: number;
  };
  error?: string;
}

export default function UserTable() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('pageSize', String(pageSize));
      if (search) {
        params.set('search', search);
      }
      if (role) {
        params.set('role', role);
      }
      if (status) {
        params.set('status', status);
      }

      const res = await fetch(`/api/users?${params.toString()}`);
      const json: UsersResponse = await res.json();

      if (json.success) {
        setUsers(json.data.users);
        setTotal(json.data.total);
      } else {
        message.error(json.error || 'Failed to fetch users');
      }
    } catch {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, role, status]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      _filters: Record<string, unknown>,
      sorter: SorterResult<User> | SorterResult<User>[],
    ) => {
      setPage(pagination.current || 1);
      setPageSize(pagination.pageSize || 10);

      if (!Array.isArray(sorter) && sorter.field) {
        setSortField(sorter.field as string);
        setSortOrder(sorter.order || undefined);
      } else {
        setSortField(undefined);
        setSortOrder(undefined);
      }
    },
    [],
  );

  const handleDelete = useCallback(
    (user: User) => {
      Modal.confirm({
        title: 'Delete User',
        content: `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        async onOk() {
          setDeletingId(user.id);
          try {
            const res = await fetch(`/api/users/${user.id}`, {
              method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
              message.success(`User "${user.name}" deleted successfully`);
              fetchUsers();
            } else {
              message.error(json.error || 'Failed to delete user');
            }
          } catch {
            message.error('Failed to delete user');
          } finally {
            setDeletingId(null);
          }
        },
      });
    },
    [fetchUsers],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleRoleChange = useCallback((value: string | undefined) => {
    setRole(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string | undefined) => {
    setStatus(value);
    setPage(1);
  }, []);

  const roleColorMap: Record<string, string> = {
    ADMIN: 'red',
    USER: 'blue',
    VIEWER: 'green',
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortField === 'name' ? (sortOrder as 'ascend' | 'descend') : undefined,
      render: (name: string, record) => (
        <a onClick={() => router.push(`/users/${record.id}`)}>{name}</a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder: sortField === 'email' ? (sortOrder as 'ascend' | 'descend') : undefined,
      responsive: ['md'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: true,
      sortOrder: sortField === 'role' ? (sortOrder as 'ascend' | 'descend') : undefined,
      render: (role: string) => <Tag color={roleColorMap[role]}>{role}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: sortField === 'status' ? (sortOrder as 'ascend' | 'descend') : undefined,
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'success' : 'default'}>{status}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      sortOrder: sortField === 'createdAt' ? (sortOrder as 'ascend' | 'descend') : undefined,
      render: (date: string) => new Date(date).toLocaleDateString(),
      responsive: ['lg'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} href={`/users/${record.id}/edit`}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            loading={deletingId === record.id}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push('/users/new')}>
          Create User
        </Button>
      </div>
      <UserFilters
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        role={role}
        status={status}
      />
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        onChange={handleTableChange}
        locale={{
          emptyText:
            search || role || status ? 'No users match the current filters' : 'No users found',
        }}
        scroll={{ x: 600 }}
      />
    </div>
  );
}
