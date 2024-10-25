import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create an admin user if it does not exist
  const existingAdmin = await prisma.user.findUnique({
    where: { username: 'admin1' },
  });

  if (!existingAdmin) {
    const adminUser = await prisma.user.create({
      data: {
        username: 'admin1',
        password: await bcrypt.hash('adminpass', 10),
        role: 'ADMIN',
      },
    });
    console.log('Created admin user:', adminUser);
  } else {
    console.log('Admin user already exists:', existingAdmin);
  }

  // Generate large amounts of dummy data
  const userCount = 10; // Number of users
  const reportCount = 5; // Number of reports per user
  const testParameterCount = 3; // Number of test parameters per report
  const testResultCount = 3; // Number of test results per report

  for (let i = 0; i < userCount; i++) {
    const username = `user${i + 1}`;
    
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          username,
          password: await bcrypt.hash(`password${i + 1}`, 10),
          role: 'USER',
          reports: {
            create: Array.from({ length: reportCount }, (_, reportIdx) => ({
              date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
              testParameters: {
                create: Array.from({ length: testParameterCount }, (_, paramIdx) => ({
                  srNo: paramIdx + 1,
                  rotorNo: `R00${paramIdx + 1}`,
                  a: Math.random() * 100,
                  b: Math.random() * 100,
                  c: Math.random() * 100,
                  leftRadius: Math.random() * 10,
                  rightRadius: Math.random() * 10,
                  leftTolerance: Math.random(),
                  rightTolerance: Math.random(),
                  unitRPM: Math.floor(Math.random() * 10000),
                  correctionMode: Math.random() > 0.5 ? 'Single Plane' : 'Double Plane',
                })),
              },
              testResults: {
                create: Array.from({ length: testResultCount }, (_, resultIdx) => ({
                  srNo: resultIdx + 1,
                  rightResults: Math.random() > 0.5 ? 'Pass' : 'Fail',
                  leftMass: Math.random() * 10,
                  leftAngle: Math.floor(Math.random() * 360),
                  rightAngle: Math.floor(Math.random() * 360),
                  leftResults: Math.random() > 0.5 ? 'Pass' : 'Fail',
                  rightMass: Math.random() * 10,
                })),
              },
            })),
          },
        },
      });

      console.log(`Created user: ${user.username}`);
    } else {
      console.log(`User ${username} already exists.`);
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
