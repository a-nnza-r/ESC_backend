const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Set up a global variable for the Prisma client to use it in your tests
global.prisma = prisma;

// Set up a beforeAll hook to ensure Prisma is connected before running tests
beforeAll(async () => {
  await prisma.$connect();
});

// Set up an afterAll hook to close the Prisma client after all tests are done
afterAll(async () => {
  await prisma.$disconnect();
});