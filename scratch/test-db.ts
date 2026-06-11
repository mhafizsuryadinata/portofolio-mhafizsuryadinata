import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.findFirst();
  console.log("Profile in DB:", profile);
  
  const projects = await prisma.project.findMany();
  console.log("Projects in DB:", projects);

  const certs = await prisma.certificate.findMany();
  console.log("Certificates in DB:", certs);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
