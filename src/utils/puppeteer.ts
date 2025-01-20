import puppeteer, { Browser } from "puppeteer";

// Initialize browser instance
let browser: Browser | null = null;

const initBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return browser;
};

export const getUrlImage = async (
  url: string,
  maxHeight: number = 2400
): Promise<string> => {
  try {
    const browser = await initBrowser();
    const page = await browser.newPage();

    // Set viewport size for consistent screenshots
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to URL and wait for network to be idle
    await page.goto(url, { waitUntil: "networkidle0" });

    // Get page dimensions
    const pageHeight = await page.evaluate((maxHeight) => {
      return Math.min(document.documentElement.scrollHeight, maxHeight);
    }, maxHeight);

    // Take screenshot and return as base64
    const screenshot = await page.screenshot({
      type: "png",
      encoding: "base64",
      clip: {
        x: 0,
        y: 0,
        width: 1280,
        height: pageHeight,
      },
    });

    await page.close();
    return screenshot;
  } catch (error) {
    console.error("Error taking screenshot:", error);
    throw error;
  }
};

// Cleanup function to close browser when needed
export const closeBrowser = async () => {
  if (browser) {
    await browser.close();
    browser = null;
  }
};
