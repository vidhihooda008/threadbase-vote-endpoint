import prisma from "./lib/prisma";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Test User",
    },
  });

  const posts = await prisma.post.createMany({
    data: [
      {
        title: "First Threadbase Post",
        body: "This is the first post.",
      },
      {
        title: "Second Threadbase Post",
        body: "This is the second post.",
      },
    ],
  });

  console.log("Created user:", user);
  console.log("Created posts:", posts);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });