import { PrismaClient, Role, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: Role.ADMIN,
      status: Status.ACTIVE,
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: Role.USER,
      status: Status.ACTIVE,
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: Role.USER,
      status: Status.ACTIVE,
    },
    {
      name: 'Diana Prince',
      email: 'diana@example.com',
      role: Role.VIEWER,
      status: Status.INACTIVE,
    },
    {
      name: 'Eve Wilson',
      email: 'eve@example.com',
      role: Role.VIEWER,
      status: Status.ACTIVE,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Seed data inserted: 5 sample users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
