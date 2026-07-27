import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed a single sample lead (matching the design screenshot) so the admin CRM
 * has something to show on a fresh install. Idempotent: only inserts when the
 * leads table is empty. Safe to delete the sample from the dashboard afterward.
 */
async function main() {
  const count = await prisma.lead.count();
  if (count === 0) {
    await prisma.lead.create({
      data: {
        name: "Sample Lead",
        email: "sample@example.com",
        phone: "(540) 555-0100",
        zip: "22401",
        projectType: "Plantation Shutters",
        message: "Interested in shutters for our living room.",
        status: "New",
        notes: "",
      },
    });
    console.log("Seeded 1 sample lead.");
  } else {
    console.log(`Leads table already has ${count} row(s); skipping sample.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
