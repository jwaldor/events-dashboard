import { NextResponse } from "next/server";
import { createUrls, getUrls, deleteUrl } from "@/services/url";

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "URLs array is required" },
        { status: 400 }
      );
    }

    const result = await createUrls(urls);
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
    const urls = await getUrls();
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

    const result = await deleteUrl(fullURL);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in DELETE /api/urls:", error);
    return NextResponse.json(
      { error: "Failed to delete URL" },
      { status: 500 }
    );
  }
}
