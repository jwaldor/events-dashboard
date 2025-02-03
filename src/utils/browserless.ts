import sharp from "sharp";

export async function capturePageScreenshot(
  pageUrl: string,
  maxHeight: number
): Promise<string> {
  const TOKEN = process.env.BROWSERLESS_TOKEN || "YOUR_API_TOKEN_HERE";
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

  // Resize the image to clip it to maxHeight
  const clippedImage = await sharp(Buffer.from(imageBuffer))
    .extract({ left: 0, top: 0, width: 1920, height: maxHeight }) // 1920 is a standard width
    .toBuffer();

  // Convert to base64
  return clippedImage.toString("base64");
}
