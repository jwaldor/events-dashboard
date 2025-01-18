// import { User } from "@prisma/client";
// import { prisma } from "../prismaClient";

// export async function createUser(clerkId: string): Promise<User> {
//   try {
//     const user = await prisma.user.create({
//       data: {
//         clerkId: clerkId,
//       },
//     });
//     return user;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// }

// export async function checkUserExists(clerkId: string): Promise<boolean> {
//   console.log(
//     "Checking user exists for clerkId:",
//     clerkId,
//     "type:",
//     typeof clerkId
//   );
//   const user = await prisma.user.findUnique({
//     where: { clerkId },
//   });
//   console.log("User exists:", !!user);
//   return !!user;
// }

// export async function getUserByClerkId(clerkId: string): Promise<User | null> {
//   return await prisma.user.findUnique({ where: { clerkId } });
// }
