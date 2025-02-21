import sharp from "sharp";

if (!process.env.BROWSERLESS_API_KEY) {
  throw new Error("BROWSERLESS_API_KEY is not set");
}

export async function capturePageScreenshot(
  pageUrl: string,
  maxHeight: number
): Promise<string> {
  const TOKEN = process.env.BROWSERLESS_API_KEY;
  const apiUrl = `https://production-sfo.browserless.io/screenshot?token=${TOKEN}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: pageUrl,
      options: {
        fullPage: true,
        type: "png",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to capture screenshot: ${response.statusText}`);
  }

  const imageBuffer = await response.arrayBuffer();

  // Save the original image before any modifications
  await sharp(Buffer.from(imageBuffer)).toFile(
    "browserlessScreenshot-original.png"
  );

  const image = sharp(Buffer.from(imageBuffer));

  // Get and log the image metadata
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error("Failed to get image dimensions");
  }
  console.log("Original image metadata:", metadata);

  // Calculate the height to extract (use the smaller of maxHeight or actual image height)
  const extractHeight = Math.min(maxHeight, metadata.height);

  // Extract the region using the actual image width
  const clippedImage = await image
    .extract({ left: 0, top: 0, width: metadata.width, height: extractHeight })
    .toBuffer();

  // Save the clipped image
  await sharp(clippedImage).toFile("browserlessScreenshot.png");

  // Convert to base64
  return clippedImage.toString("base64");
}
