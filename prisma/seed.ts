import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  config.defaultAccounts.forEach(async (account) => {
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
  config.defaultData.forEach(async (data, index) => {
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
        registered: data.registered,
      },
    });
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
