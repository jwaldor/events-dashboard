import { prisma } from "../prismaClient";

export async function createUrl(fullURL: string) {
  try {
    // Create new URL entry
    const url = await prisma.url.create({
      data: {
        fullURL,
      },
    });

    return url;
  } catch (error) {
    console.error("Error creating URL:", error);
    throw error;
  }
}

export async function getUrls() {
  try {
    console.log("Fetching URLs");
    const urls = await prisma.url.findMany({
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

export async function deleteUrl(fullURL: string) {
  try {
    console.log("Deleting URL:", fullURL);
    const url = await prisma.url.deleteMany({
      where: {
        fullURL: fullURL,
      },
    });

    return url;
  } catch (error) {
    console.error("Error deleting URL:", error);
    throw error;
  }
}

export async function createUrls(fullURLs: string[]) {
  try {
    const urls = await prisma.$transaction(
      fullURLs.map((fullURL) =>
        prisma.url.create({
          data: { fullURL },
        })
      )
    );

    return urls;
  } catch (error) {
    console.error("Error creating URLs:", error);
    throw error;
  }
}
