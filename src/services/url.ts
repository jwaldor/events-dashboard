import { prisma } from "../prismaClient";

export async function createUrl(fullURL: string, userId: string) {
  try {
    // Create new URL entry
    const url = await prisma.url.create({
      data: {
        fullURL,
        userId: parseInt(userId),
      },
    });

    return url;
  } catch (error) {
    console.error("Error creating URL:", error);
    throw error;
  }
}

export async function getUrlsByUserId(userId: string) {
  try {
    const urls = await prisma.url.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return urls;
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw error;
  }
}

export async function deleteUrl(urlId: number, userId: string) {
  try {
    const url = await prisma.url.deleteMany({
      where: {
        id: urlId,
        userId: parseInt(userId),
      },
    });

    return url;
  } catch (error) {
    console.error("Error deleting URL:", error);
    throw error;
  }
}
