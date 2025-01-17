import { NextResponse } from "next/server";
import { createUrls, getUrlsByUserId, deleteUrl } from "@/services/url";

// Temporary user ID for testing
const TEST_USER_ID = "123";

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "URLs array is required" },
        { status: 400 }
      );
    }

    const result = await createUrls(urls, TEST_USER_ID);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/urls:", error);
    return NextResponse.json(
      { error: "Failed to create URLs" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const urls = await getUrlsByUserId(TEST_USER_ID);
    return NextResponse.json(urls);
  } catch (error) {
    console.error("Error in GET /api/urls:", error);
    return NextResponse.json(
      { error: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { fullURL } = await request.json();

    if (!fullURL) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const result = await deleteUrl(fullURL, TEST_USER_ID);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in DELETE /api/urls:", error);
    return NextResponse.json(
      { error: "Failed to delete URL" },
      { status: 500 }
    );
  }
}
