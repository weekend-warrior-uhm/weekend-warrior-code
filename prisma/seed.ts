import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

type Account = {
  email: string;
  username: string;
  password: string;
  fullName: string;
  phone: string;
  gender: string;
  interests: string[];
  role?: string;
};

async function main() {
  console.log('Seeding the database');
  const tasks = (config.defaultAccounts as Account[]).map(async (account) => {
    const hashedPassword = await hash(account.password, 10);
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        username: account.username,
        password: hashedPassword,
        fullName: account.fullName,
        phone: account.phone,
        gender: account.gender,
        interests: account.interests,
        role,
      },
    });
  });

  await Promise.all(tasks);

  const activityTasks = config.defaultData.map(async (data, index) => {
    console.log(`  Adding activity: ${data.name}`);
    await prisma.activity.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        description: data.description,
        location: data.location,
        date: data.date,
        time: data.time,
        author: data.author,
        author_email: data.author_email,
        duration: data.duration,
        registered: [data.author_email], // Automatically register the activity creator
        message: data.message,
      },
    });
  });

  await Promise.all(activityTasks);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
