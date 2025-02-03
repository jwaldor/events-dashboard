// import { prisma } from "./prismaClient";
// import * as dotenv from "dotenv";

// // Load environment variables from .env file
// dotenv.config();

// async function seedUser() {
//   try {
//     const user = await prisma.user.create({
//       data: {
//         id: 123,
//         clerkId: "test",
//       },
//     });
//     console.log("User created successfully:", user);
//   } catch (error) {
//     console.error("Error seeding user:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seedUser();
