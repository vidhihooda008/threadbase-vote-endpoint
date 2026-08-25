import prisma from "../src/lib/prisma";

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Test User",
    },
  });

  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "First Post",
      body: "Threadbase test post",
    },
  });

  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Second Post",
      body: "Another Threadbase test post",
    },
  });

  console.log("Seed complete:", user);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
